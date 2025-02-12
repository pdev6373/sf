import AllLocations from '@/components/AllLocations';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';

const Locations = async () => {
  const res = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/Location/Statistics',
  );
  const locationStats = await res.json();

  const queryClient = new QueryClient();
  const locations = await queryClient.prefetchQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await fetch(
        'https://api-tracker.dev.dangote.islands.digital/Location/All?page_no=1&page_size=100',
      );
      return response.json();
    },
  });

  const cardData = [
    {
      title: 'Total Locations',
      count: locationStats.data.totalLocations,
      link: '#',
    },
    {
      title: 'Total Locations Requests',
      count: locationStats.data.totalLocationsRequest,
    },
  ];

  return (
    <div className="px-10 py-14 flex flex-col gap-16">
      <div className="flex gap-4 ml-[14rem]">
        {cardData.map((data, u) => (
          <div
            key={u}
            className="rounded-[20px] bg-white shadow-md min-h-[129px] min-w-[260px] flex flex-col ju p-4 pb-2"
          >
            <p className="font-bold text-lg text-[#1E1B39] mb-3">
              {data.title}
            </p>
            <p className="font-bold text-[44px] text-[#1E1B39] ">
              {data.count}
            </p>
            {data.link && (
              <Link
                href={data.link}
                className="text-xs text-primary underline text-left"
              >
                View Locations
              </Link>
            )}
          </div>
        ))}
      </div>
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllLocations />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Locations;
