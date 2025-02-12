import { notFound } from 'next/navigation';
import AddLocation from './AddLocation';

async function getData() {
  try {
    const [usersRes, accessAllowedToRes] = await Promise.all([
      fetch(
        'https://api-tracker.dev.dangote.islands.digital/Users/All?page_no=1&page_size=50',
        {
          next: { revalidate: 3600 }, // Cache for 1 hour
        },
      ),
      fetch(
        'https://api-tracker.dev.dangote.islands.digital/Lists/AccessAllowedTo',
        {
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!usersRes.ok || !accessAllowedToRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const [users, accessAllowedTo] = await Promise.all([
      usersRes.json(),
      accessAllowedToRes.json(),
    ]);

    return { users, accessAllowedTo };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function Page() {
  try {
    const { users, accessAllowedTo } = await getData();

    return <AddLocation users={users} accessAllowedTo={accessAllowedTo} />;
  } catch (error) {
    notFound();
  }
}
