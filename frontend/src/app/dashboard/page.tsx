'use client'
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') // クエリパラメータから名前を取得

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      {name ? <p>{name} さん、ログインに成功しました。</p> : <p>名前が見つかりません。</p>}
    </div>
  )
}
