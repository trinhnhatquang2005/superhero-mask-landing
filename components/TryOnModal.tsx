'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Camera, CameraOff } from 'lucide-react'
import type { Mask } from '@/data/masks'

interface Props {
  mask: Mask
  onClose: () => void
}

// Face landmark indices for mask region
const FOREHEAD_TOP = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]
const LEFT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
const RIGHT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]

function drawMask(
  ctx: CanvasRenderingContext2D,
  landmarks: Array<{ x: number; y: number; z: number }>,
  color: string,
  glowRgb: string,
  w: number,
  h: number
) {
  const pt = (i: number) => ({ x: landmarks[i].x * w, y: landmarks[i].y * h })

  // Glow effect
  ctx.shadowColor = color
  ctx.shadowBlur = 18

  // Main face mask shape
  ctx.beginPath()
  const faceContour = FOREHEAD_TOP
  ctx.moveTo(pt(faceContour[0]).x, pt(faceContour[0]).y)
  for (let i = 1; i < faceContour.length; i++) {
    ctx.lineTo(pt(faceContour[i]).x, pt(faceContour[i]).y)
  }
  ctx.closePath()
  ctx.fillStyle = `rgba(${glowRgb}, 0.25)`
  ctx.fill()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()

  // Left eye cutout
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.moveTo(pt(LEFT_EYE[0]).x, pt(LEFT_EYE[0]).y)
  for (let i = 1; i < LEFT_EYE.length; i++) {
    ctx.lineTo(pt(LEFT_EYE[i]).x, pt(LEFT_EYE[i]).y)
  }
  ctx.closePath()
  ctx.fillStyle = 'rgba(0,0,0,0.8)'
  ctx.fill()

  // Right eye cutout
  ctx.beginPath()
  ctx.moveTo(pt(RIGHT_EYE[0]).x, pt(RIGHT_EYE[0]).y)
  for (let i = 1; i < RIGHT_EYE.length; i++) {
    ctx.lineTo(pt(RIGHT_EYE[i]).x, pt(RIGHT_EYE[i]).y)
  }
  ctx.closePath()
  ctx.fill()

  ctx.globalCompositeOperation = 'source-over'
  ctx.shadowBlur = 0

  // Eye glow outline
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.shadowColor = color
  ctx.shadowBlur = 12

  ctx.beginPath()
  ctx.moveTo(pt(LEFT_EYE[0]).x, pt(LEFT_EYE[0]).y)
  for (let i = 1; i < LEFT_EYE.length; i++) ctx.lineTo(pt(LEFT_EYE[i]).x, pt(LEFT_EYE[i]).y)
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(pt(RIGHT_EYE[0]).x, pt(RIGHT_EYE[0]).y)
  for (let i = 1; i < RIGHT_EYE.length; i++) ctx.lineTo(pt(RIGHT_EYE[i]).x, pt(RIGHT_EYE[i]).y)
  ctx.closePath()
  ctx.stroke()

  ctx.shadowBlur = 0

  // HUD readout
  const noseTip = pt(1)
  ctx.font = `bold 10px "Space Mono", monospace`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.fillText(`${mask.name.toUpperCase()} · ACTIVE`, noseTip.x, noseTip.y + 20)
}

// Stub mask type for the draw function reference
let mask: Mask

export default function TryOnModal({ mask: maskProp, onClose }: Props) {
  mask = maskProp
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const faceMeshRef = useRef<any>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'no-camera'>('loading')
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(animRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
  }, [])

  useEffect(() => {
    let active = true

    async function init() {
      try {
        // Dynamic import to avoid SSR
        const vision = await import('@mediapipe/tasks-vision')
        const { FaceLandmarker, FilesetResolver } = vision

        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        )
        const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1,
        })

        if (!active) { faceLandmarker.close(); return }
        faceMeshRef.current = faceLandmarker

        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
        if (!active) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream

        const video = videoRef.current!
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
          setStatus('ready')
          detectLoop()
        }
      } catch (e: any) {
        if (!active) return
        if (e?.name === 'NotAllowedError' || e?.name === 'NotFoundError') {
          setStatus('no-camera')
        } else {
          setStatus('error')
        }
      }
    }

    function detectLoop() {
      if (!active) return
      const video = videoRef.current
      const canvas = canvasRef.current
      const fl = faceMeshRef.current
      if (!video || !canvas || !fl || video.readyState < 2) {
        animRef.current = requestAnimationFrame(detectLoop)
        return
      }

      const w = video.videoWidth
      const h = video.videoHeight
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')!
      // Mirror video
      ctx.save()
      ctx.translate(w, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0, w, h)
      ctx.restore()

      const result = fl.detectForVideo(video, performance.now())
      if (result.faceLandmarks && result.faceLandmarks.length > 0) {
        // Mirror landmarks: flip x
        const mirrored = result.faceLandmarks[0].map((lm: any) => ({ ...lm, x: 1 - lm.x }))
        drawMask(ctx, mirrored, maskProp.color, maskProp.glowRgb, w, h)
      }

      animRef.current = requestAnimationFrame(detectLoop)
    }

    init()
    return () => {
      active = false
      stopCamera()
      faceMeshRef.current?.close()
    }
  }, [maskProp, stopCamera])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(6,7,10,.92)', backdropFilter: 'blur(12px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-5)',
    }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: maskProp.color, marginBottom: 4 }}>
            // THỬ MẶT NẠ REALTIME
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'var(--t-h3)', color: 'var(--ink-hi)', margin: 0 }}>
            {maskProp.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', padding: 10, cursor: 'pointer', color: 'var(--ink-mid)', display: 'flex' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Camera view */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: 700,
        aspectRatio: '4/3', background: 'var(--surface-1)',
        border: `1px solid rgba(${maskProp.glowRgb},.35)`,
        boxShadow: `0 0 32px rgba(${maskProp.glowRgb},.25)`,
        overflow: 'hidden',
      }}
        className="bevel"
      >
        <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

        {status === 'loading' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <Camera size={32} color={maskProp.color} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-mid)' }}>
              Đang khởi động camera...
            </span>
          </div>
        )}

        {status === 'no-camera' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <CameraOff size={32} color="var(--plasma)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-mid)', textAlign: 'center', maxWidth: 300 }}>
              Cần quyền truy cập camera. Vui lòng cho phép trong trình duyệt.
            </span>
          </div>
        )}

        {status === 'error' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <CameraOff size={32} color="var(--plasma)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--plasma)', textAlign: 'center' }}>
              Không thể khởi động. Thử lại hoặc dùng trình duyệt khác.
            </span>
          </div>
        )}

        {/* HUD corner ticks */}
        {['top:8px;left:8px;border-top:2px;border-left:2px', 'top:8px;right:8px;border-top:2px;border-right:2px', 'bottom:8px;left:8px;border-bottom:2px;border-left:2px', 'bottom:8px;right:8px;border-bottom:2px;border-right:2px'].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...(i === 0 ? { top: 8, left: 8, borderTop: `2px solid ${maskProp.color}`, borderLeft: `2px solid ${maskProp.color}` } : {}),
            ...(i === 1 ? { top: 8, right: 8, borderTop: `2px solid ${maskProp.color}`, borderRight: `2px solid ${maskProp.color}` } : {}),
            ...(i === 2 ? { bottom: 8, left: 8, borderBottom: `2px solid ${maskProp.color}`, borderLeft: `2px solid ${maskProp.color}` } : {}),
            ...(i === 3 ? { bottom: 8, right: 8, borderBottom: `2px solid ${maskProp.color}`, borderRight: `2px solid ${maskProp.color}` } : {}),
            width: 12, height: 12, opacity: 0.8,
          }} />
        ))}
      </div>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-dim)', marginTop: 14, textTransform: 'uppercase' }}>
        Nhìn thẳng vào camera · Đảm bảo đủ ánh sáng
      </p>
    </div>
  )
}
