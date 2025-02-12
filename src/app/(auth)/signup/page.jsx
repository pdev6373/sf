import { notFound } from 'next/navigation';
import Signup from './Signup';

async function getData() {
  try {
    const [departmentRes, staffTypeRes, locationsRes] = await Promise.all([
      fetch(
        'https://api-tracker.dev.dangote.islands.digital/Lists/Department',
        {
          next: { revalidate: 3600 }, // Cache for 1 hour
        },
      ),
      fetch('https://api-tracker.dev.dangote.islands.digital/Lists/StaffType', {
        next: { revalidate: 3600 },
      }),
      fetch(
        'https://api-tracker.dev.dangote.islands.digital/Location/All?page_no=1&page_size=100',
        {
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!departmentRes.ok || !staffTypeRes.ok || !locationsRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const [department, staffType, locations] = await Promise.all([
      departmentRes.json(),
      staffTypeRes.json(),
      locationsRes.json(),
    ]);

    return { department, staffType, locations };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function Page() {
  try {
    const { department, staffType, locations } = await getData();

    return (
      <Signup
        department={department}
        staffType={staffType}
        locations={locations}
      />
    );
  } catch (error) {
    notFound();
  }
}
