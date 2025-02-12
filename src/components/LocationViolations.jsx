'use client';

import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { MdSort } from 'react-icons/md';
import { Dropdown, Table } from 'flowbite-react';
import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';

const LocationViolations = ({ data }) => {
  const [selected, setSelected] = useState(false);
  console.log('location violations')
  console.log(data)
  const unauthorizedData = data?.filter(item => item.authorized === false);
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
              <div className="text-lg">Location Violations</div>
            </div>
            <div>
              <Table>
                <Table.Head className="bg-white">
                  <Table.HeadCell className="bg-white">ID</Table.HeadCell>
                  <Table.HeadCell className="bg-white">Location Title</Table.HeadCell>
                  <Table.HeadCell className="bg-white">Violation Date</Table.HeadCell>
                  <Table.HeadCell className="bg-white">Note</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {unauthorizedData?.map((c) => (
                    <Table.Row key={c} className="bg-white text-black">
                      <Table.Cell>{c.serialNumber}</Table.Cell>
                      <Table.Cell>{c.location}</Table.Cell>
                      <Table.Cell>{c.date}</Table.Cell>
                      <Table.Cell className="flex items-center gap-x-1">
                        <p>I did not...</p>
                        <button
                          onClick={() => setSelected(true)}
                          className="bg-[#F7FBFF] h-[21px] px-1 flex gap-x-1 items-center"
                        >
                          <BsPencilSquare size={15} /> <p>Edit</p>
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="flex justify-center">
              <button className="bg-primary font-bold text-lg px-4 text-white">Load More</button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white h-full rounded-lg px-5 py-7 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
              <div className="text-lg">Respond to a Violation</div>
              {selected && (
                <button
                  onClick={() => setSelected(false)}
                  className="w-10 h-7 bg-danger text-white rounded flex items-center justify-center"
                >
                  <IoMdClose size={18} />
                </button>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {!selected ? (
                <p className="text-2xl text-center">Select any item on the list to edit here</p>
              ) : (
                <div className="flex-1 flex flex-col w-full px-2 py-2 gap-y-4">
                  <div className="">
                    <p className="text-lg font-semibold">ID</p>
                    <p className="text-lg">001234</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">Location Title</p>
                    <p className="text-lg">Head Office</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Violation Date</p>
                    <p className="text-lg">22-10-2021</p>
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <p className="text-lg font-semibold">Explanatory Note</p>
                    <div className="bg-[#F6F6F9] flex-1">
                      <textarea className="w-full h-full bg-transparent border-none border-transparent focus:border-transparent focus:ring-0 !outline-0 !outline-none focus:outline-transparent text-sm"></textarea>
                    </div>
                  </div>
                  <div>
                    <button className="h-12 bg-primary text-white w-full rounded">SUBMIT</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationViolations;
