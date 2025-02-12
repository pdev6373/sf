import { Dropdown, Table } from 'flowbite-react';
import React, { useState } from 'react'
import { IoIosMenu } from 'react-icons/io';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import Avatar from '../../../public/assets/images/avatar.png'
import Image from 'next/image';
import { LiaEdit } from 'react-icons/lia';
import Greenmark from '../../../public/assets/icons/green-mark';

const SecurityLogs = () => {
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const [isSecurityNoteSelected, setIsSecurityNoteSelected] = useState(false);
    const [isUserEditing, setIsUserEditing] = useState(false);
    const [isFormSubmitted,setIsFormSubmitted] = useState(false)
    const [scanQrCode,setScanQrCode] = useState(false)
    const [isStaffAuthorized,setIsStaffAuthorized] = useState(null)

    const displayedData = [
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: true,

        },
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: false,

        },
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: false,

        },
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: true,

        },
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: false,

        },
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: true,

        },
        {
            id: '001234',
            serialNumber: '00-00054',
            staffName: 'Olakunle Alake',
            location: 'Left wing refinery plant',
            time: '10:00',
            date: '22-10-2024',
            isAssigned: true,

        },
    ]
  return (
    <div className="flex gap-8">
        <div className="bg-white rounded-lg p-7 pb-[3rem] max-w-[860px]">
            <div className="flex items-center justify-between mb-3 pb-4 border-b-[#C4C2C2] border-b-[0.25px]">
                <div className="text-lg">Log</div>
                <button 
                    onClick={()=> {
                        setScanQrCode(true)
                        setIsProfileSelected(false)
                        setIsSecurityNoteSelected(false)
                    }} 
                    className="flex items-center gap-x-3 justify-center text-white bg-primary h-[34px] rounded-[5px] px-3">
                    <MdOutlineQrCodeScanner size={24}/>
                    <p className='text-[14.4px]'>Scan QR Code</p>
                </button>
            </div>

            <div>
                <Table>
                <Table.Head className="capitalize text-[12.8px]">
                    <Table.HeadCell className="text-center text-[12.8px]">
                        ID
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">Serial Number</Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">
                        Staff Name
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">
                        Location
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">
                        Time
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">
                        Date
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">Access</Table.HeadCell>
                    <Table.HeadCell className="text-center text-[12.8px]">Actions</Table.HeadCell>
                </Table.Head>

                <Table.Body>
                    {displayedData.map((c) => (
                    <Table.Row key={c.id} className="text-black">
                        <Table.Cell className="text-center text-[12.8px]">
                        {c.id}
                        </Table.Cell>
                        <Table.Cell className="text-center text-[12.8px]">
                        {c.serialNumber}
                        </Table.Cell>
                        <Table.Cell className="text-center text-[12.8px]">
                        {c.staffName}
                        </Table.Cell>
                        <Table.Cell className="text-center text-[12.8px]">
                        {c.location}
                        </Table.Cell>
                        <Table.Cell className="text-center text-[12.8px]">
                        {c.time}
                        </Table.Cell>
                        <Table.Cell className="text-center text-[12.8px]">
                        {c.date}
                        </Table.Cell>
                        <Table.Cell className={c.isAssigned ? "text-center text-[#08BA8F]":"text-[#E60E0E]"}>
                        {c.isAssigned ? "Assigned" : "Unassigned"}
                        </Table.Cell>
                        
                        <Table.Cell className="text-center">
                        <div className="flex flex-col items-center">
                            <Dropdown
                            label=""
                            // dismissOnClick={false}
                            renderTrigger={() => (
                                <button className="flex gap-x-1 items-center">
                                <IoIosMenu size={15} />
                                </button>
                            )}
                            >
                            <Dropdown.Item
                                onClick={() => {
                                    setIsSecurityNoteSelected(true)
                                    setIsProfileSelected(false)
                                    setScanQrCode(false)
                                }}
                            >
                                Security Note
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setIsSecurityNoteSelected(false)
                                    setIsProfileSelected(true)
                                    setScanQrCode(false)
                                }}
                            >
                                View Profile
                            </Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => {}}>Assign/Revoke Tag</Dropdown.Item> */}
                            </Dropdown>
                        </div>
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
                </Table>
            </div>

            <div className="flex justify-center mt-[3rem]">
                <button
                    className="bg-primary font-bold text-lg px-4 text-white"
                >
                    Load More
                </button>
            </div>
        </div>

        <div className="max-w-[440px] w-full bg-white p-8">
            {isProfileSelected && (
                <>
                    <div className="flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-4">
                        <p className="text-lg">Profile  </p>
                    </div>

                    <div className='flex flex-col gap-10 mt-10'>
                        <div className='flex flex-col gap-7'>
                            <Image src={Avatar} alt='profile pic'/>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-lg font-bold'>Martin Capan</h4>
                                <p className='text-lg font-normal'>Plant Engineer</p>
                                <p className='text-lg font-normal'>Refinery</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-7'>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-lg font-bold'>Email</h4>
                                <p className='text-lg font-normal'>olakunle.alake@dangote.com</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-lg font-bold'>Phone Number</h4>
                                <p className='text-lg font-normal'>+993384558585</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-lg font-bold'>Emergency Contact Name</h4>
                                <p className='text-lg font-normal'>Michael Alake</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {isSecurityNoteSelected && (
                <>
                    <div className="flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-4">
                        <p className="text-lg">Security Note</p>
                    </div>

                    <div className='flex flex-col gap-10 mt-10'>
                        <div className='flex flex-col gap-4'>
                            <Image src={Avatar} alt='profile pic'/>
                            <h4 className='text-lg font-bold'>Martin Capan</h4>
                        </div>

                        <div className='flex flex-col gap-7'>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold'>Staff Note</h4>
                                <p className='text-xs font-normal'>Res ipsa loquitur is a Latin phrase that translates to “the thing speaks for itself” . It is a legal doctrine that refers to situations where the facts of a case are so obvious that they speak for themselves, and no further explanation is needed .</p>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <div className='flex justify-between items-center'>
                                    {isUserEditing ? (
                                        <h4 className='text-lg font-semibold'>Explanatory Note</h4>
                                    ):(
                                        <h4 className='text-lg font-semibold'>Security Personnel Note</h4>
                                    )}
                                    {!isUserEditing && (
                                        <div onClick={()=> setIsUserEditing(true)} className='flex gap-1 cursor-pointer'>
                                            <LiaEdit />
                                                <p className='text-xs'>Edit</p>
                                        </div>
                                    )}
                                </div>
                                {isUserEditing ? (
                                    <>
                                        <textarea className='bg-[#F6F6F9] border-none w-full h-[138px]'></textarea>
                                        <div className='flex flex-col items-center gap-4'>
                                            <button onClick={()=>setIsFormSubmitted(true)} className='bg-[#10328C] w-[381px] h-[48px] rounded-[5px] text-white text-lg font-medium'>SUBMIT</button>
                                            {isFormSubmitted && (
                                                <div className='flex items-center gap-4'>
                                                    <Greenmark />
                                                    <p className='text-[#0B7723] text-lg'>Your response has been submitted</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ):(
                                    <p className='text-xs font-normal'>Res ipsa loquitur is a Latin phrase that translates to “the thing speaks for itself” . It is a legal doctrine that refers to situations where the facts of a case are so obvious that they speak for themselves, and no further explanation is needed . This doctrine is often used in personal injury cases, where</p>
                                )}
                            </div>
                            
                            
                        </div>
                    </div>
                </>
            )}
            {scanQrCode && (
                <>
                    <div className="flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-4">
                        <p className="text-lg">Scan QR Code</p>
                    </div>

                    <div className='flex flex-col gap-10 mt-10'>
                        <p>To scan, use your camera app or a QR code reader on your device.</p>
                        <div className='w-[361px] h-[281px] bg-[#3B3736]'></div>
                    </div>

                    {isStaffAuthorized === true && (
                        <button className='bg-[#08BA8F] m-auto mt-6 w-[271px] h-[34px] text-[#FFFFFF] flex items-center justify-center'>
                            Staff in authorized location
                        </button>
                    )}

                    {isStaffAuthorized === false && (
                        <button className='bg-[#E60E0E] m-auto mt-6 w-[271px] h-[34px] text-[#FFFFFF] flex items-center justify-center'>
                            Staff in authorized location
                        </button>
                    )}
                </> 
            )}
            {!isProfileSelected && !isSecurityNoteSelected && !scanQrCode && (
                <div className='flex flex-col m-auto mt-[7rem] items-center justify-center w-[130.67px] text-2xl'>
                    <p className='text-center'>Select any item on the list to view here</p>
                </div>
            )}

        </div>
    </div>
  )
}

export default SecurityLogs