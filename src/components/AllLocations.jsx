'use client';

import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import { MdOutlineCalendarMonth, MdSort } from 'react-icons/md';
import { Table, Dropdown } from 'flowbite-react';
import { useRef, useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { redirect } from 'next/navigation';
import { IoLocationOutline } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const AllLocations = () => {
  const rangeOptions = ['All Time', 'Date Range'];
  const [rangeType, setRangeType] = useState(rangeOptions[0]);
  const sortOptions = ['A-Z', 'Z-A', 'Access'];
  const [sortType, setSortType] = useState(sortOptions[0]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);


const fetchQuery = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const { data: locations, error: locationError, isLoading: isLocationsLoading, isFetched: isLocationsFetched } = useQuery({
  queryKey: ['locations'],
  queryFn: () => fetchQuery('https://api-tracker.dev.dangote.islands.digital/Location/All?page_no=1&page_size=100'),
});

console.log(locations)


  return (
    <div className='ml-[14rem]'>
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl">Locations</div>
        <div className="flex items-center gap-x-10">
          <Dropdown
            label=""
            // dismissOnClick={false}
            renderTrigger={() => (
              <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                <MdOutlineCalendarMonth size={24} />
                <p>{rangeType}</p>
                <BiCaretDown size={15} />
              </button>
            )}
          >
            {rangeOptions.map((r) => (
              <Dropdown.Item
                key={r}
                onClick={() => {
                  setRangeType(r);
                }}
              >
                {r}
              </Dropdown.Item>
            ))}
          </Dropdown>
          {rangeType === 'Date Range' && (
            <>
              <div className="relative">
                <input
                  type="date"
                  ref={fromDateRef}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.currentTarget.value)}
                  className="max-h-[0px] max-w-[0px] opacity-0 -z-10 top-0 left-0 absolute"
                />
                <button
                  onClick={() => fromDateRef.current?.showPicker()}
                  className="flex gap-1 px-2 items-center bg-white h-[34px]"
                >
                  <MdOutlineCalendarMonth size={24} />
                  <p>
                    From - {new Date(fromDate || new Date().getTime()).toLocaleDateString('en-US')}
                  </p>
                </button>
              </div>
              <div className="relative">
                <input
                  type="date"
                  ref={toDateRef}
                  value={toDate}
                  onChange={(e) => setToDate(e.currentTarget.value)}
                  className="max-h-[0px] max-w-[0px] opacity-0 -z-10 top-0 left-0 absolute"
                />
                <button
                  onClick={() => toDateRef.current?.showPicker()}
                  className="flex gap-1 px-2 items-center bg-white h-[34px]"
                >
                  <MdOutlineCalendarMonth size={24} />
                  <p>To - {new Date(toDate || new Date().getTime()).toLocaleDateString('en-US')}</p>
                </button>
              </div>
            </>
          )}
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

      
      <div className="bg-white rounded-lg w-full p-7 pb-[3rem]">
        <div className="flex items-center justify-between mb-3 pb-4 border-b-[#C4C2C2] border-b-[0.25px]">
          <div className="text-lg"><Link href="/location/add-location"></Link></div>
          <button
            onClick={() => {
              navigate('/add-location');
            }}
            className="flex items-center gap-x-1 justify-center text-white bg-primary h-[34px] rounded px-2"
          >
            <IoLocationOutline size={15} />
            <p><a href="/location/add-location">Add Location</a></p>
          </button>
        </div>
        <div>
          <Table>
            <Table.Head className="capitalize text-base">
              <Table.HeadCell className="text-center">Location ID</Table.HeadCell>
              <Table.HeadCell className="text-center">Location Name</Table.HeadCell>
              <Table.HeadCell className="text-center">Latitude / Y</Table.HeadCell>
              <Table.HeadCell className="text-center">Longitude / X</Table.HeadCell>
              <Table.HeadCell className="text-center">Department</Table.HeadCell>
              <Table.HeadCell className="text-center">Office</Table.HeadCell>
              <Table.HeadCell className="text-center">Total Access</Table.HeadCell>
              <Table.HeadCell className="text-center">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {locations.data.map((c) => (
                <Table.Row key={c.locationId} className="text-black">
                  <Table.Cell className="text-center">{c.locationId}</Table.Cell>
                  <Table.Cell className="text-center">{c.locationName}</Table.Cell>
                  <Table.Cell className="text-center">{c.longitudeX}</Table.Cell>
                  <Table.Cell className="text-center">{c.latitudeY}</Table.Cell>
                  <Table.Cell className="text-center">{c.department}</Table.Cell>
                  <Table.Cell className="text-center">{c.office}</Table.Cell>
                  <Table.Cell className="text-center">{c.totalAccess}</Table.Cell>
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
                        >
                          <a href={`/location/manage-location/${c.locationId}`}>Manage</a>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            // navigate('/view-user');
                          }}
                        >
                          Delete
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
          <button className="bg-primary font-bold text-lg px-4 text-white">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default AllLocations;
