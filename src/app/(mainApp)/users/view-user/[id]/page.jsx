import ViewUser from '../ViewUser';
async function page({ params }) {
  const id = params.id;

  const res = await fetch(
    `https://api-tracker.dev.dangote.islands.digital/Users/${id}`,
    { cache: 'no-store' },
  );
  const user = await res.json();

  return (
    <div>
      <ViewUser user={user} />
    </div>
  );
}

export default page;
