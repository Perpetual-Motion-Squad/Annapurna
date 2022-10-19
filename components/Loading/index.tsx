import Image from 'next/image'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center bg-black h-screen w-screen text-white font-lora text-3xl'>
        <div className='loading-spinner'></div>
        <p className='font-sora'>Loading</p>
    </div>
  )
}

export default Loading