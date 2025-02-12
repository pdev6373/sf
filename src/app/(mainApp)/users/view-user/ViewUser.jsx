'use client';

import { useState } from 'react';
import styles from '../../../styles/add-user.module.scss'
import CancelButton from '@/components/CancelButton'
import ProfilePic from '../../../../../public/assets/images/avatar.png'
import Image from 'next/image'
import { Datepicker, Dropdown } from 'flowbite-react'
import { BiCaretDown } from 'react-icons/bi'
import { IoMdSearch } from 'react-icons/io';
import Qrcode from '../../../../../public/assets/images/qr-lg.png'
import { LiaEdit } from "react-icons/lia";
import ComponentLevelLoader from '@/components/Loader';
import { revalidatePath } from 'next/cache';

const ViewUser = ({ user }) => {

    console.log(user)

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(false);

    const handleRevoke = async (barCodeId) => {
        const formData = new FormData();
        setLoading(true);
        setError("");
    
        // Append each field to formData
    
        
        formData.append("SerialNumber", barCodeId);

        console.log(formData);
    
        try {
          const response = await fetch(
            "https://api-tracker.dev.dangote.islands.digital/QrCode/Revoke",
            {
              method: "POST",
              body: formData,
            }
          );
    
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            setLoading(false);
            const result = await response.json();
            if (result.message) {
              setError(result.message);
              setLoading(false);
              return;
            }
            setError("Something went wrong");
            setLoading(false);
            return;
          }
    
          if (response.status === 201 || response.status === 200) {
            const result = await response.json();
            console.log(result);
            setLoading(false);
            revalidatePath('/users/view-user/[id]', 'page')
            // Router.push("/login");
          }
        } catch (error) {
          setLoading(false);
          setError("Something went wrong");
          console.error("Error:", error);
        }
      };

  return (
    <div className={styles.container}>
        <div className='flex justify-between items-center mb-6'>
            <h1 className=''>Profile</h1>
            <button className='bg-[#10328C] text-white w-[225px] h-[44px] px-4 rounded-[5px]'>Manage Locations</button>
        </div>
        <div className='flex flex-wrap gap-6'>
            <div className='bg-white max-w-[440px] max-h-[627px] w-full rouded-[10px] p-6 '>
                <div className='flex justify-between pb-3 items-center border-b border-[#C4C2C2]'>
                    <p>Basic Information</p>
                    <div className='flex gap-1 cursor-pointer'>
                        <LiaEdit />
                        <p className='text-xs'>Edit</p>
                    </div>
                </div>

                <div className='mt-4'>
                    <h4 className='text-lg mb-4 font-semibold text-[#13111F]'>Picture</h4>
                    
                    <div className='mb-9'>
                        <Image src={ProfilePic} alt='profile pic'/>
                    </div>

                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">First Name (s)</label>
                        <p>{user?.data.firstName}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Last Name</label>
                        <p>{user?.data.lastName}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Nationality</label>
                        <p className='text-lg'>{user?.data.nationality}</p>
                    </div>
                </div>
            </div>

            <div className='bg-white max-w-[440px] max-h-[627px] w-full rouded-[10px] p-6 '>
                <div className='flex justify-between pb-3 items-center border-b border-[#C4C2C2]'>
                    <p>Work Information</p>
                    <div className='flex gap-1 cursor-pointer'>
                        <LiaEdit />
                        <p className='text-xs'>Edit</p>
                    </div>
                </div>

                <div className='mt-[3rem]'>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Department</label>
                        <p>{user?.data.department}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Role</label>
                        <p>{user?.data.role}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Primary Location</label>
                        <p className='text-lg'>Lagos</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Staff Type</label>
                        <p className='text-lg'>{user?.data.staffType}</p>
                    </div>
                </div>
            </div>

            <div className='bg-white max-w-[440px] max-h-[627px] w-full rouded-[10px] p-6 '>
                <div className='flex justify-between pb-3 items-center border-b border-[#C4C2C2]'>
                    <p>Contact Information</p>
                    <div className='flex gap-1 cursor-pointer'>
                        <LiaEdit />
                        <p className='text-xs'>Edit</p>
                    </div>
                </div>

                <div className='mt-[3rem]'>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Email</label>
                        <p>{user?.data.email}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Phone Number</label>
                        <p>{user?.data.phoneNumber}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Emergency Contact Name</label>
                        <p className='text-lg'>{user?.data.emergencyContactName}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Emergency Contact Number</label>
                        <p className='text-lg'>{user?.data.emergencyContactNumber}</p>
                    </div>
                </div>
            </div>

            <div className='bg-white max-w-[440px] h-fit w-full rouded-[10px] p-6 '>
                <div className='flex justify-between pb-3 items-center border-b border-[#C4C2C2]'>
                    <p>QR Code</p>
                    <div className='flex gap-1 cursor-pointer'>
                        <LiaEdit />
                        <p className='text-xs'>Edit</p>
                    </div>
                </div>

                <div className='mt-[1rem]'>
                    <div className='flex flex-col py-[2rem] justify-center items-center'>
                        <Image src={Qrcode}/>
                        <p className='text-xs'>Serial Number</p>
                        <p className='text-xs'>{user?.data.barCodeId ? user.data.barCodeId : 'No assigned Qr-code'}</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Start Date</label>
                        <p>24-04-2024</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">End Date</label>
                        <p>28-04-2024</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">Start Time</label>
                        <p className='text-lg'>11:45</p>
                    </div>
                    <div className='mb-4 flex flex-col gap-6'>
                        <label className='text-lg font-semibold text-[#13111F]' htmlFor="">End Time</label>
                        <p className='text-lg'>18:45</p>
                    </div>
                </div>



                <button disabled={!user.data.barCodeId} onClick={() => handleRevoke(user.data.barCodeId)} className={`${user.data.barCodeId ? 'bg-[#E60E0E]' : 'bg-slate-500'} w-[381px] h-[48px] rounded-[5px] text-lg font-medium text-white mt-10`}> {loading ? (
                        <ComponentLevelLoader color={"#ffffff"} />
                      ) : (
                        "REVOKE"
                      )}</button>
            </div>
        </div>
    </div>
  )
}

export default ViewUser