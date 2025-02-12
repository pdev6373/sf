"use client";

import { Dropdown, Table } from "flowbite-react";
import { useRef, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import { MdSort } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";

const AllUsers = () => {
  const sortOptions = ["A-Z", "Z-A", "Access"];
  const [sortType, setSortType] = useState(sortOptions[0]);

  const fetchQuery = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const {
    data: locations,
    error: locationError,
    isLoading: isLocationsLoading,
    isFetched: isLocationsFetched,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: () =>
      fetchQuery(
        "https://api-tracker.dev.dangote.islands.digital/Users/All?page_no=1&page_size=100"
      ),
  });

  console.log(locations);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="text-2xl">All Users</div>

        <div className="flex items-center gap-x-10">
          <Dropdown
            label=""
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
            <IoIosSearch size={15} />
            <input placeholder="Search" className="outline-none text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full p-7 pb-[3rem]">
        <div className="flex items-center justify-between mb-3 pb-4 border-b-[#C4C2C2] border-b-[0.25px]">
          <div className="text-lg">All Codes</div>
          <button className="flex items-center gap-x-3 justify-center text-white bg-primary h-[34px] rounded px-3">
            <FaRegUser size={19} />
            <a href="/users/add-users">Add New User</a>
          </button>
        </div>

        <div>
          <Table>
            <Table.Head className="capitalize text-base">
              <Table.HeadCell className="text-center">User ID</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Serial Number
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Primary Location
              </Table.HeadCell>
              <Table.HeadCell className="text-center">Type</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Department
              </Table.HeadCell>
              <Table.HeadCell className="text-center">Access</Table.HeadCell>
              <Table.HeadCell className="text-center">Actions</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {locations.data.map((c) => (
                <Table.Row key={c.userId} className="text-black">
                  <Table.Cell className="text-center">{c.userId}</Table.Cell>
                  <Table.Cell className="text-center">{c.serialNumber}</Table.Cell>
                  <Table.Cell className="text-center">
                    {c.primaryLocation}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {c.type}
                  </Table.Cell>
                  <Table.Cell className="text-center"> {c.department}</Table.Cell>
                  <Table.Cell className={`text-center ${c.access === true ? 'text-[#08BA8F]' : 'text-red-600'}`}>
                    {c.access ? 'Assigned' : 'Unassigned'}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <div className="flex flex-col items-center">
                      <Dropdown
                        renderTrigger={() => (
                          <button className="flex gap-x-1 items-center">
                            <IoIosMenu size={15} />
                          </button>
                        )}
                      >
                        <Dropdown.Item>
                          <Link href={`/users/view-user/${c.userId}`}>View Profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>Assign/Revoke Tag</Dropdown.Item>
                      </Dropdown>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex justify-center mt-[3rem]">
          <button className="bg-primary font-bold text-lg px-4 text-white">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
