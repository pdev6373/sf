import React from 'react'
import DashboardCharts from '../DashboardChart'

const Report = () => {
  return (
    <div className='max-w-[1440px] w-full h-[604px] p-10 rounded-[10px] flex flex-col gap-4 bg-white'>
        <div className='border-b-[0.25px] border-[#C4C2C2] pb-4'>
            <h5 className='text-lg'>Reports</h5>
        </div>

        <DashboardCharts />
    </div>
  )
}

export default Report