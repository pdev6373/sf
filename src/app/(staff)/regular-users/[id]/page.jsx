import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import RegularUser from '../RegularUser';

async function page({ params }) {
  const id = params.id;

  const queryClient = new QueryClient();
  const accessLocationsData = await queryClient.prefetchQuery({
    queryKey: ['accessLocations'],
    queryFn: async () => {
      const response = await fetch(
        'https://api-tracker.dev.dangote.islands.digital/Movement/Alerts',
      );
      return response.json();
    },
  });

  const accessRequestsData = await queryClient.prefetchQuery({
    queryKey: ['accessRequests'],
    queryFn: async () => {
      const response = await fetch(
        'https://api-tracker.dev.dangote.islands.digital/Location/AccessRequests',
      );
      return response.json();
    },
  });

  const profileData = await queryClient.prefetchQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await fetch(
        `https://api-tracker.dev.dangote.islands.digital/Users/${id}`,
      );
      return response.json();
    },
  });

  // console.log(data)
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RegularUser userId={id} />
      </HydrationBoundary>
    </>
  );
}

export default page;
