import React from 'react'

type Props = {
    setShowModel: (value: boolean) => void
}

const EventModel = (props: Props) => {
    return (
        <div onClick={() => props.setShowModel(false)} className='fixed h-screen w-screen bg-[#000000a2] grid place-items-center z-50'>
            <div onClick={(e) => { e.stopPropagation() }} className=' bg-white'>
                content
                <div className='flex gap-5 p-5'>
                    <button className='py-2 px-4 rounded-xl bg-orange-500 text-white' onClick={() => props.setShowModel(false)}>Close</button>
                    <button className='py-2 px-4 rounded-xl bg-orange-500 text-white'>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default EventModel