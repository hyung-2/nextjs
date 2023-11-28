//layout.js에서 서버 컴포넌트의 이점을 포기하지 않기 위해 client 컴포넌트의 기능이 필요한 부분만 별도의 컴포넌트로 분리
'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'


export function Control(){
  const router = useRouter()
  const params = useParams()
  const id = params.id
  
  return(
    <ul>
      <li><Link href='/create'>Create</Link></li>
      {id ? 
      <>
        <li><Link href={`/update/${id}`}>update</Link></li>
        <li>
          <button onClick={async () => {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_ULR}/topics/${id}`, {
              method: 'DELETE',
            })
            .then(res => res.json())
            .then(result => {
              console.log('삭제', result)
              router.push('/')
              router.refresh()
            })
          }}>
            delete
          </button>
        </li>
      </>
      :
      null
      }
    </ul>
  )
}