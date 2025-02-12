import React from 'react';
import style from '../styles/users.module.scss';
import AllUsers from '@/components/AllUsers';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const Users = async () => {
  const res = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/Users/Statistics',
  );
  const stats = await res.json();

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
      title: 'Total Staff',
      count: stats.data.totalStaff,
    },
    {
      title: 'Total Regular Staff',
      count: stats.data.totalRegularStaff,
    },
    {
      title: 'Total Temporary Staff',
      count: stats.data.totalTemporaryStaff,
    },
    {
      title: 'Total Security Staff',
      count: stats.data.totalSecurityStaff,
    },
  ];
  return (
    <div className={style.users_container}>
      <div className={style.users_card_container}>
        {cardData.map((data, u) => (
          <div key={u} className={style.users_card}>
            <p className={style.users_card_title}>{data.title}</p>
            <p className={style.users_card_count}>{data.count}</p>
          </div>
        ))}
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllUsers />
      </HydrationBoundary>
    </div>
  );
};

export default Users;
