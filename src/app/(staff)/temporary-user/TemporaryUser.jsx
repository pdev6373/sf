
'use client'
import { useEffect, useMemo, useState } from 'react';
import AccessLocations from '@/components/AccessLocations';
import LocationViolations from '@/components/LocationViolations';
import Profile from '@/components/Profile';
import Settings from '@/components/Settings';
import AccessRequests from '@/components/AccessRequests';
import WorkingTime from '@/components/WorkingTime';
import { useParams } from 'next/navigation';
import qr from '../../../../public/assets/images/qr.png'
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';


const TemporaryUser = ({ userId }) => {

  const fetchQuery = async (url) => {
    const response = await fetch(url);
    return response.json();
  };
  
  const { data: accessLocations, error: accessLocationsError, isLoading: isAccessLocationsLoading, isFetched: isAccessLocationsFetched } = useQuery({
    queryKey: ['accessLocations'],
    queryFn: () => fetchQuery('https://api-tracker.dev.dangote.islands.digital/Movement/Alerts'),
  });
  
  const { data: accessRequests, error: accessRequestsError, isLoading: isAccessRequestsLoading, isFetched: isAccessRequestsFetched } = useQuery({
    queryKey: ['accessRequests'],
    queryFn: () => fetchQuery('https://api-tracker.dev.dangote.islands.digital/Location/AccessRequests'),
  });


  const { data: profile, error: profileError, isLoading: isprofileLoading, isFetched: isprofileFetched } = useQuery({
    queryKey: ['profileData'],
    queryFn: () => fetchQuery(`https://api-tracker.dev.dangote.islands.digital/Users/${userId}`),
  });

  const params = useParams();
  



  // console.log(data?.data)
  const tabComponents = useMemo(
    () => [
      {
        tab: 'Access Locations',
        component: <AccessLocations data={accessLocations?.data} />,
      },
      {
        tab: 'Access Requests',
        component: <AccessRequests  data={accessRequests?.data} />,
      },
      {
        tab: 'Location Violations',
        component: <LocationViolations data={accessLocations?.data}/>,
      },
      {
        tab: 'Profile',
        component: <Profile userId={userId} />,
      },
      {
        tab: 'Settings',
        component: <Settings />,
      },
    ],
    []
  );
  const [tab, setTab] = useState(tabComponents[0].tab || '');

  useEffect(() => {
    if (params?.tab) {
      const getTab = tabComponents.find(
        (t) => t.tab.toLowerCase().replace(/ /g, '-') === params?.tab
      );
      if (getTab) {
        setTab(getTab.tab);
      }
    }
  }, [params, tabComponents]);



  return (
    <div className='flex-1 h-screen overflow-y-auto bg-[#F1F8FF]bg-[#F1F8FF] ml-[12rem] pl-[2rem]'>
      <div className="px-10 py-5">
        <div className="bg-white px-10 rounded flex justify-between items-center" style={{
          paddingBottom: '1rem'
        }}>
          <div className="flex items-center gap-x-7">
            <div className="h-[85px] w-[85px] rounded-full overflow-hidden">
              <div
                className="h-full w-full bg-cover bg-primary bg-no-repeat bg-center backG"
              ></div>
            </div>
            <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{profile?.data.firstName}</p>
              <p className="text-sm">{profile?.data.role}</p>
              <p className="text-sm italic font-normal">Refinery</p>
            </div>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex flex-col gap-1 items-center">
              <div className="h-[40px] flex flex-col justify-center px-4 text-white bg-[#08BA8F] font-bold">
                TEMPORARY STAFF
              </div>
              <p className="text-xs font-bold">GENERAL ACCESS ENDS</p>
              <p className="text-lg font-bold">24/10/2022</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={qr} alt="qr" />
              <p className="text-center">Serial Number</p>
              <p className="text-center">00-00054</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-primary w-full pt-5 px-10 flex items-center gap-x-10">
            {tabComponents.map((t) => (
              <button
                onClick={() => setTab(t.tab)}
                key={t.tab}
                className={`pb-1 border-b-[7px] text-white ${
                  tab === t.tab ? 'border-white' : 'border-primary'
                }`}
              >
                {t.tab}
              </button>
            ))}
          </div>
          <div className="pt-10">{tabComponents.find((t) => t.tab === tab)?.component}</div>
        </div>
      </div>
    </div>
  );
};

export default TemporaryUser;
