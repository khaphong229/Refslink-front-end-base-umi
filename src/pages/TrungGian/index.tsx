import React from 'react'
import Header from '@/components/Header'
import top from '@/assets/top.png'
import { Button } from 'antd'
export default function index() {
  return (
    <>
        <Header/>
        <div>
          <Button type="primary">Nhấn để vượt link</Button>
          <img src={top} alt="" style={{width:"400px", textAlign:"center"}} />
        </div>
      
    </>
  )
}
