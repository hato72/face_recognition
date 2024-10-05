'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'  // useRouterをインポート
import axios from 'axios'

export default function Home() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const router = useRouter()  // useRouterフックを初期化

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = videoRef.current
        if (video) {
          video.srcObject = stream
          video.play()
        }
      })
      .catch(err => {
        console.error("エラー:", err)
      })
  }, [])

  const capture = (): string | undefined => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0)
        return canvas.toDataURL('image/jpeg')
      }
    }
    console.error('ビデオまたはキャンバスが利用できません。')
    return undefined
  }

  const login = async () => {
    const image = capture()
    if (image) { // imageがundefinedでないかを確認
      const blob = await fetch(image).then(res => res.blob())
      const formData = new FormData()
      formData.append('file', blob, 'image.jpg')

      try {
        const response = await axios.post('http://localhost:8000/login', formData)
        setName(response.data.name)
        //router.push('/dashboard')  // ログイン成功後にリダイレクト
        router.push(`/dashboard?name=${name}`)
      } catch (error) {
        console.error('エラー:', error)
      }
    } else {
      console.error('キャプチャに失敗しました。')
    }
  }

  const register = async () => {
    const image = capture()
    if (image) { // imageがundefinedでないかを確認
      const blob = await fetch(image).then(res => res.blob())
      const formData = new FormData()
      formData.append('file', blob, 'image.jpg')
      formData.append('name', name)

      try {
        const response = await axios.post('http://localhost:8000/register', formData)
        setMessage(response.data.message)
      } catch (error) {
        console.error('エラー:', error)
      }
    } else {
      console.error('キャプチャに失敗しました。')
    }
  }

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={login}>ログイン</button> <br></br>
      <button onClick={register}>新規ユーザー登録</button>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="ユーザー名"
      />
      <p>{message}</p>
    </div>
  )
}
