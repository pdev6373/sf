import React from 'react'
import { IoClose } from 'react-icons/io5'

const CancelButton = () => {
  return (
    <div className='flex justify-center items-center bg-[#E60E0E] w-[36.67px] h-[29.33px] rounded-sm text-white'>
        <IoClose size={24}/>
    </div>
  )
}

export default CancelButton