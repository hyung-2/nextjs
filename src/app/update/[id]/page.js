'use client'

import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Update(props){
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const id = props.params.id

  async function refresh(){
    const resp = await fetch(`http://localhost:9999/topics/${id}`)
    const topic = await resp.json()
    setTitle(topic.title)
    setBody(topic.body)
  }

  useEffect(() => {
    refresh()
  },[])

  return(
    <form onSubmit={async evt => {
      evt.preventDefault()
      const title = evt.target.title.value
      const body = evt.target.body.value
      const resp = await fetch(`${process.env.NEXT_PUBLIC_ULR}/topics/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
      })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        router.push(`/read/${result.id}`)
        router.refresh
      })
    }}>
      <h2>Update</h2>
      <p><input type='text' name='title' placeholder="title" onChange={e => setTitle(e.target.value)} value={title}/></p>
      <p><textarea name='body' placeholder="body" onChange={e => setBody(e.target.value)} value={body}/></p>
      <p><input type='submit' value='update' /></p>
    </form>
  )
}