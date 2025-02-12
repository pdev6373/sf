'use client';

import { IoIosMenu, IoIosSearch, IoMdClose } from 'react-icons/io';
import styles from "../app/styles/table.module.scss";
import { RiDeleteBin6Line, RiExpandUpDownLine } from "react-icons/ri";
import { MdOutlineEdit, MdSort } from 'react-icons/md';
import { Dropdown, Table } from 'flowbite-react';
import EditInput from './EditInput';
import Select from './Select';
import { BiCaretDown } from 'react-icons/bi';
import { FaRegSquare } from "react-icons/fa";
import { FiUnlock } from 'react-icons/fi';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const AccessLocations = ({ data }) => {
  const [request, setRequest] = useState(false);
  const [manage, setManage] = useState(false);

  return (
    <>
      <div className="w-full grid md:grid-cols-[2fr_1fr] max-xl:grid-cols-2 gap-x-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl">Locations</div>
          <div className="flex items-center gap-x-10">
            <Dropdown
              label=""
              // dismissOnClick={false}
              renderTrigger={() => (
                <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                  <MdSort size={24} />
                  <p>Sort by</p>
                  <BiCaretDown size={15} />
                </button>
              )}
            >
              <Dropdown.Item onClick={() => {}}>A-Z</Dropdown.Item>
              <Dropdown.Item onClick={() => {}}>Z-A</Dropdown.Item>
              <Dropdown.Item onClick={() => {}}>Access</Dropdown.Item>
            </Dropdown>
            <div className="bg-white px-2 flex items-center gap-x-1 h-[34px]">
              <IoIosSearch size={24} />
              <input placeholder="Search" className="outline-none text-base" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-[2fr_1fr] max-xl:grid-cols-2 gap-x-10">
        <div>
          <div className="bg-white rounded-lg px-5 py-7">
            <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
              <div className="text-lg">Access Requests</div>
              <button
                onClick={() => {
                  setManage(false);
                  setRequest(true);
                }}
                className="flex items-center gap-1 text-white px-2 h-[34px] rounded bg-[#D27C2C]"
              >
                <FiUnlock />
                <p>Request Location Access</p>
              </button>
            </div>
            <div className='w-[45vw]'>
            <div className={styles.bottom}>
              <div className={styles.header}>
              <div className={styles.first}>
                  
                    <h1>ID</h1>
                  
                </div>
                <div className={styles.second}>
                  <h1>Location Title</h1>
                </div>
                <div className={styles.third}>
                  <h1>Date</h1>
                </div>
                <div className={styles.fourth}>
                  <h1>Time</h1>
                </div>
                {/* <div className={styles.sixth}>
                  <FaRegSquare />
                  <FaRegSquare />
                </div> */}
              </div>
              {
                data?.map((dat, index) => (
                  <div className={styles.list} key={index}>
                <div className={styles.first}>
                  <div className={styles.text}>
                    <h1>{dat.serialNumber}</h1>
                    {/* <p>Joined 24th May,2024</p> */}
                  </div>
                </div>
                <div className={styles.second}>
                  <h1>{dat.location}</h1>
                  {/* <p>Amen Estate</p> */}
                </div>
                <div className={styles.third}>
                  <h1>{dat.date}</h1>
                  {/* <p>10 units</p> */}
                </div>
                <div className={styles.fourth}>
                  <h1>{dat.time}</h1>
                  {/* <p>070845689023</p> */}
                  
                </div>
              </div>
                ))
              }
              
            </div>
            </div>
            {/* <div className="flex justify-center">
              <button className="bg-primary font-bold text-lg px-4 text-white">Load More</button>
            </div> */}
          </div>
        </div>
        <div className="">
          {request && (
            <div className="bg-white h-full rounded-lg px-5 py-7 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
                <div className="text-lg">Request Access to a Location Here</div>
                <button
                  onClick={() => setRequest(false)}
                  className="w-10 h-7 bg-danger text-white rounded flex items-center justify-center"
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="flex-1 flex flex-col w-full px-2 py-2 gap-y-4">
                  <div className="">
                    <p className="text-lg font-semibold">Location Title</p>
                    <Select
                      title="Insert location you wish to access"
                      data={[{ title: 'Option One', value: 'Option One' }]}
                    />
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">Access Start Date</p>
                    <EditInput type="date" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Access End Date</p>
                    <EditInput type="date" />
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <p className="text-lg font-semibold">Reason</p>
                    <div className="bg-[#F6F6F9] flex-1">
                      <textarea className="w-full h-full bg-transparent border-none outline-none! text-sm border-transparent focus:border-transparent focus:ring-0"></textarea>
                    </div>
                  </div>
                  <div>
                    <button className="h-12 bg-primary text-white w-full rounded">SUBMIT</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {manage && (
            <div className="bg-white h-full rounded-lg px-5 py-7 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
                <div className="text-lg">Manage Access</div>
                <button
                  onClick={() => setManage(false)}
                  className="w-[100px] h-[39px] bg-danger text-white rounded flex items-center justify-center"
                >
                  REJECT
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="flex-1 flex flex-col w-full px-2 py-2 gap-y-4">
                  <div className="">
                    <p className="text-lg font-semibold">Location Title</p>
                    <p>Head Office</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">Access Start Date</p>
                    <p>{new Date().toLocaleDateString('en-US')}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Access End Date</p>
                    <p>{new Date().toLocaleDateString('en-US')}</p>
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <p className="text-lg font-semibold">Reason</p>
                    <div className="text-xs">
                      Res ipsa loquitur is a Latin phrase that translates to “the thing speaks for
                      itself” . It is a legal doctrine that refers to situations where the facts of
                      a case are so obvious that they speak for themselves, and no further
                      explanation is needed . This doctrine is often used in personal injury cases,
                      where
                    </div>
                  </div>
                  <div>
                    <button className="h-12 bg-primary text-white w-full rounded">
                      GRANT ACCESS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccessLocations;
