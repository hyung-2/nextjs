'use client' //client 컴포넌트로 전환 (useEffect, useState, onSubmit같은 코드 사용 가능)

import { useRouter } from 'next/navigation' 


export default async function Create(){
  
  const router = useRouter() //라우터 객체 생성(client컴포넌트에서만 사용 가능)

  return (
  <form onSubmit={async evt => {
    evt.preventDefault();
    const title = evt.target.title.value
    const body = evt.target.body.value
    const resp = await fetch(`${process.env.NEXT_PUBLIC_ULR}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, body})
    })

    const topic = await resp.json()
    console.log('file: page.js:19 ~ create ~ topic:', topic)
    router.push(`/read/${topic.id}`) //router.push를 사용하면 페이지 리로드 없이 해당 페이지로 이동
    router.refresh //서버 컴포넌트를 서버 쪽에서 다시 랜더링해서 새로 고침 할수 있음 (app/layout.js를 새로고침 하기 위해 사용)
  }}>
    <h2>Create</h2>
    <p><input type='text' name='title' placeholder='title'/></p>
    <p><textarea name='body' placeholder='body'></textarea></p>
    <p><input type='submit' value='create'/></p>
  </form>
  )
}