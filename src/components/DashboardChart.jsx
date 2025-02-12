import React from 'react';
import dynamic from 'next/dynamic';
import { MdOutlineCalendarMonth, MdSort } from 'react-icons/md';
import { Dropdown } from 'flowbite-react';
import { BiCaretDown } from 'react-icons/bi';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardCharts = () => {
  const rangeOptions = ["All Time", "Date Range"];
  const sortOptions = ["A-Z", "Z-A", "All Workers"];

  const staffScannedOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#4B77BE'],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    tooltip: {
      enabled: true,
    },
    markers: {
      size: 5,
      colors: ['#4B77BE'],
      strokeWidth: 2,
    },
  };

  const staffScannedSeries = [
    {
      name: 'Total Staff Scanned',
      data: [3000, 2000, 4000, 3000, 5000, 4000, 3000, 4500, 2500, 3500, 5000, 4500],
    },
  ];

  const locationViolationsOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#E74C3C'],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    tooltip: {
      enabled: true,
    },
    markers: {
      size: 5,
      colors: ['#E74C3C'],
      strokeWidth: 2,
    },
  };

  const locationViolationsSeries = [
    {
      name: 'Location Violations',
      data: [3500, 1150, 500, 1000, 1500, 3000, 2500],
    },
  ];

  return (
    <div className='flex justify-between'>
        <div className='w-[48%] bg-[#E5EAFC4F] p-4'>
            <div className='mb-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[#7F8286] text-lg font-bold mb-4'>Total Staff Scanned</h2>
                    <div className='flex items-center gap-4'>

                        <Dropdown
                            renderTrigger={() => (
                            <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                                <MdOutlineCalendarMonth size={24} />
                                <p>All time</p>
                            </button>
                            )}
                        >
                            {rangeOptions.map((s) => (
                                <Dropdown.Item
                                    key={s}
                                >
                                    {s}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown
                            renderTrigger={() => (
                            <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                                <MdSort size={24} />
                                <p>All workers</p>
                                <BiCaretDown size={15} />
                            </button>
                            )}
                        >
                            {sortOptions.map((s) => (
                                <Dropdown.Item
                                    key={s}
                                >
                                    {s}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                    </div>

                </div>
                <p className='text-[#1E1B39] text-[28px] font-bold'>1524 <span className='text-[#04CE00] text-sm font-normal'>1.3% </span> <span className='text-[#9291A5] text-sm font-bold'>VS LAST YEAR</span></p>
            </div>
            <Chart options={staffScannedOptions} series={staffScannedSeries} type="line" height={300} />
        </div>
        <div className='w-[48%] bg-[#E5EAFC4F] p-4'>
            <div className='mb-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[#7F8286] text-lg font-bold mb-4'>Location Violations</h2>
                    <div className='flex items-center gap-4'>

                        <Dropdown
                            renderTrigger={() => (
                            <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                                <MdOutlineCalendarMonth size={24} />
                                <p>All time</p>
                            </button>
                            )}
                        >
                            {rangeOptions.map((s) => (
                                <Dropdown.Item
                                    key={s}
                                >
                                    {s}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown
                            renderTrigger={() => (
                            <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                                <MdSort size={24} />
                                <p>All workers</p>
                                <BiCaretDown size={15} />
                            </button>
                            )}
                        >
                            {sortOptions.map((s) => (
                                <Dropdown.Item
                                    key={s}
                                >
                                    {s}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                    </div>
                </div>
                <p className='text-[#1E1B39] text-[28px] font-bold'>124 <span className='text-[#04CE00] text-sm font-normal'>1.3% </span> <span className='text-[#9291A5] text-sm font-bold'>VS LAST YEAR</span></p>
            </div>
            <Chart options={locationViolationsOptions} series={locationViolationsSeries} type="line" height={300} />
        </div>
    </div>
  );
};

export default DashboardCharts;
