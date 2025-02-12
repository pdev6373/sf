import AllLocationRequest from '@/components/AllLocationRequest';

const LocationRequest = async () => {
  const res = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/Location/Statistics',
  );
  const stats = await res.json();

  const cardData = [
    {
      title: 'Total Locations',
      count: stats.data.totalLocations,
      link: '#',
    },
    {
      title: 'Total Locations Requests',
      count: stats.data.totalLocationsRequest,
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
              <a
                href={data.link}
                className="text-xs text-primary underline text-left"
              >
                View Locations
              </a>
            )}
          </div>
        ))}
      </div>
      <div>
        <AllLocationRequest />
      </div>
    </div>
  );
};

export default LocationRequest;
