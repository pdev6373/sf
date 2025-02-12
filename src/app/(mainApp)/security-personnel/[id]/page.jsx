'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Avatar from '../../../../../public/assets/images/avatar.png';
import QrCode from '../../../../../public/assets/images/qr.png';
import { Dropdown } from 'flowbite-react';
import { MdOutlineCalendarMonth, MdSort } from 'react-icons/md';
import { BiCaretDown } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import SecurityLogs from '@/components/securityPersonnel/security-logs';
import Alert from '@/components/securityPersonnel/alert/alert';
import Report from '@/components/securityPersonnel/report';
import AccessLocations from '@/components/AccessLocations';
import AccessRequests from '@/components/AccessRequests';
import LocationViolations from '@/components/LocationViolations';
import Profile from '@/components/Profile';
import WorkingTime from '@/components/WorkingTime';
import Settings from '@/components/Settings';
import { useQuery } from '@tanstack/react-query';
const SecurityPersonnel = ({ params }) => {
  const id = params.id;
  const [activetab, setActiveTab] = useState('Security Log');
  const rangeOptions = ['All Time', 'Date Range'];
  const [rangeType, setRangeType] = useState(rangeOptions[0]);
  const sortOptions = ['A-Z', 'Z-A', 'Access'];
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchQuery = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const {
    data: accessLocations,
    error: accessLocationsError,
    isLoading: isAccessLocationsLoading,
    isFetched: isAccessLocationsFetched,
  } = useQuery({
    queryKey: ['accessLocations'],
    queryFn: () =>
      fetchQuery(
        'https://api-tracker.dev.dangote.islands.digital/Movement/Alerts',
      ),
  });

  const {
    data: accessRequests,
    error: accessRequestsError,
    isLoading: isAccessRequestsLoading,
    isFetched: isAccessRequestsFetched,
  } = useQuery({
    queryKey: ['accessRequests'],
    queryFn: () =>
      fetchQuery(
        'https://api-tracker.dev.dangote.islands.digital/Location/AccessRequests',
      ),
  });

  const {
    data: profile,
    error: profileError,
    isLoading: isprofileLoading,
    isFetched: isprofileFetched,
  } = useQuery({
    queryKey: ['profileData'],
    queryFn: () =>
      fetchQuery(`https://api-tracker.dev.dangote.islands.digital/Users/${id}`),
  });

  const tabLinks = [
    {
      title: 'Access Locations',
      component: <AccessLocations data={accessLocations?.data} />,
    },
    {
      title: 'Access Requests',
      component: <AccessRequests data={accessRequests?.data} />,
    },
    {
      title: 'Location Violation',
      component: <LocationViolations data={accessLocations?.data} />,
    },
    {
      title: 'Profile',
      component: <Profile userId={id} />,
    },
    {
      title: 'Working Time',
      component: <WorkingTime />,
    },
    {
      title: 'Settings',
      component: <Settings />,
    },
    {
      title: 'Security Log',
      component: <SecurityLogs />,
    },
    {
      title: 'Alerts',
      component: <Alert />,
    },
    {
      title: 'Reports',
      component: <Report />,
    },
  ];
  return (
    <div className="ml-[18rem] mr-10 flex flex-col gap-6 py-10">
      <div className="flex flex-col gap-4 bg-white">
        <div className="flex justify-between items-center px-4 pt-6">
          <div className="flex items-center gap-6">
            <Image src={Avatar} />
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-bold">Olakunle Alake</h4>
              <p className="text-sm">Security Personnel</p>
              <p className="text-sm italic">Refinery</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#E60E0E] w-[134px] h-[40px] flex justify-center items-center text-[#FFFBFB] text-xs font-bold">
                SECURITY STAFF
              </div>
              <p className="text-center flex flex-col font-bold text-xs">
                GENERAL ACCESS ENDS <span className="text-lg"> 24/10/2022</span>
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Image src={QrCode} />
              <p>Serial Number</p>
              <p>00-00054</p>
            </div>
          </div>
        </div>

        <div className="bg-[#10328C] w-full pt-5 px-10 flex items-center gap-x-10">
          {tabLinks.map((t) => (
            <button
              onClick={() => setActiveTab(t.title)}
              key={t.tab}
              className={`pb-1 border-b-[7px] text-[12.8px] text-white ${
                activetab === t.title ? 'border-white' : 'border-primary'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full mb-4 max-w-[968px]">
          <div className="text-[19.2px]">Security Log</div>

          {activetab === 'Reports' ? (
            <></>
          ) : (
            <div className="flex items-center gap-x-10">
              <div className="relative">
                <Dropdown
                  label=""
                  renderTrigger={() => (
                    <button className="flex gap-1 px-2 items-center relative bg-white h-[34px] text-[12.8px]">
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
                  <div className="bg-white w-[330px] h-[294px] p-4 absolute right-1">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="date"
                          value={fromDate}
                          className="max-h-[0px] max-w-[0px] opacity-0 -z-10 top-0 left-0 absolute"
                        />
                        <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                          <MdOutlineCalendarMonth size={24} />
                          <p>
                            From -{' '}
                            {new Date(
                              fromDate || new Date().getTime(),
                            ).toLocaleDateString('en-US')}
                          </p>
                        </button>
                      </div>

                      <div className="w-[25px] border-[3px] border-black"></div>

                      <div className="relative">
                        <input
                          type="date"
                          value={toDate}
                          className="max-h-[0px] max-w-[0px] opacity-0 -z-10 top-0 left-0 absolute"
                        />
                        <button
                          onClick={() => toDateRef.current?.showPicker()}
                          className="flex gap-1 px-2 items-center bg-white h-[34px]"
                        >
                          <MdOutlineCalendarMonth size={24} />
                          <p>
                            To -{' '}
                            {new Date(
                              toDate || new Date().getTime(),
                            ).toLocaleDateString('en-US')}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Dropdown
                label=""
                renderTrigger={() => (
                  <button className="flex gap-1 px-2 items-center bg-white h-[34px] text-[12.8px]">
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
          )}
        </div>

        {tabLinks.map((tab) => (
          <>{tab.title === activetab && tab.component}</>
        ))}
      </div>
    </div>
  );
};

export default SecurityPersonnel;
