'use client';

import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import { MdOutlineCalendarMonth, MdSort } from 'react-icons/md';
import { Table, Dropdown } from 'flowbite-react';
import { useRef, useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { redirect } from 'next/navigation';
import { IoLocationOutline } from 'react-icons/io5';

const AllLocationRequest = () => {
  const sortOptions = ['A-Z', 'Z-A', 'Access'];
  const [sortType, setSortType] = useState(sortOptions[0]);
  const [manageAccess, setManageAccess] = useState(false)

  return (
    <div className='ml-[14rem] flex flex-col gap-4 w-full'>
        <div className="flex items-center justify-between mb-4 max-w-[968px]">
            <div className="text-2xl">Locations</div>
            <div className="flex items-center gap-x-10">
            
                <Dropdown
                    label=""
                    // dismissOnClick={false}
                    renderTrigger={() => (
                    <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                        <MdSort size={24} />
                        <p>Sort By</p>
                        <BiCaretDown size={15} />
                    </button>
                    )}
                >
                    {sortOptions.map((s) => (
                    <Dropdown.Item
                        key={s}
                        onClick={() => {
                        setSortType(s);
                        }}
                    >
                        {s}
                    </Dropdown.Item>
                    ))}
                </Dropdown>

                <div className="bg-white px-2 flex items-center gap-x-1 h-[34px]">
                    <IoIosSearch size={24} />
                    <input placeholder="Search" className="outline-none text-sm" />
                </div>
            </div>
        </div>

        <div className='flex gap-8'>
            <div className="bg-white rounded-lg w-full p-7 pb-[3rem] max-w-[968px]">
                <div className="flex items-center justify-between mb-3 pb-4 border-b-[#C4C2C2] border-b-[0.25px]">
                    <div className="text-lg">Access Requests</div>
                </div>
            
                <div>
                    <Table>
                        <Table.Head className="capitalize text-base">
                            <Table.HeadCell className="text-center">ID</Table.HeadCell>
                            <Table.HeadCell className="text-center">Location Title</Table.HeadCell>
                            <Table.HeadCell className="text-center">Serial Number</Table.HeadCell>
                            <Table.HeadCell className="text-center">Name</Table.HeadCell>
                            <Table.HeadCell className="text-center">Access Start Date</Table.HeadCell>
                            <Table.HeadCell className="text-center">Access End Date</Table.HeadCell>
                            <Table.HeadCell className="text-center">Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                        {[0, 1, 2, 3, 4, 5].map((c) => (
                            <Table.Row key={c} className="text-black">
                                <Table.Cell className="text-center">001234</Table.Cell>
                                <Table.Cell className="text-center">Office Complex</Table.Cell>
                                <Table.Cell className="text-center">00- 01234</Table.Cell>
                                <Table.Cell className="text-center">Adeola Odeku</Table.Cell>
                                <Table.Cell className="text-center">22-10-2021</Table.Cell>
                                <Table.Cell className="text-center">22-10-2024</Table.Cell>
                                <Table.Cell className="text-center">
                                    <div className="flex flex-col items-center">
                                        <Dropdown
                                            label=""
                                            renderTrigger={() => (
                                            <button className="flex gap-x-1 items-center">
                                                <IoIosMenu size={15} />
                                            </button>
                                            )}
                                        >
                                            <Dropdown.Item onClick={()=>setManageAccess(true)}>
                                                Manage
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                            Reject
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </div>

                <div className="flex justify-center mt-[3rem]">
                    <button className="bg-primary font-bold text-lg px-4 text-white">Load More</button>
                </div>
            </div>

            {manageAccess && (
                <div className='max-w-[445px] w-full bg-white p-7 pb-[3rem]'>
                    <div className='flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-1'>
                        <p className='text-lg'>Manage Access</p>
                        <button className='bg-[#E60E0E] w-[100px] h-[39px] rounded-[5px] text-lg font-medium text-white'>REJECT</button>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col mt-4 gap-1'>
                            <p className='text-lg font-semibold text-[#13111F]'>Name</p>
                            <p className='font-normal text-lg'>Adeola Odeku</p>
                        </div>

                        <div className='flex flex-col mt-4 gap-1'>
                            <p className='text-lg font-semibold text-[#13111F]'>Serial Number</p>
                            <p className='font-normal text-lg'>00- 01234</p>
                        </div>

                        <div className='flex flex-col mt-4 gap-1'>
                            <p className='text-lg font-semibold text-[#13111F]'>Location Title</p>
                            <p className='font-normal text-lg'>Head Office</p>
                        </div>

                        <div className='flex flex-col mt-4 gap-1'>
                            <p className='text-lg font-semibold text-[#13111F]'>Access Start Date</p>
                            <p className='font-normal text-lg'>22-10-2021</p>
                        </div>

                        <div className='flex flex-col mt-4 gap-1'>
                            <p className='text-lg font-semibold text-[#13111F]'>Access End Date</p>
                            <p className='font-normal text-lg'>22-10-2021</p>
                        </div>

                        <div className='flex flex-col mt-4 gap-1'>
                            <p className='text-lg font-semibold text-[#13111F]'>Reason</p>
                            <p className='font-normal text-xs'>Res ipsa loquitur is a Latin phrase that translates to “the thing speaks for itself” . It is a legal doctrine that refers to situations where the facts of a case are so obvious that they speak for themselves, and no further explanation is needed . This doctrine is often used in personal injury cases, where</p>
                        </div>
                        
                    </div>        
            
                    <button className='bg-[#10328C] w-[381px] h-[48px] rounded-[5px] text-lg font-medium text-white mt-10'>GRANT</button>
                </div>
            )}
        </div>
    </div>
  );
};

export default AllLocationRequest;
