import AddUser from './AddUsers';

async function page() {
  const res = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/QrCode/All?page_no=1&page_size=100',
  );
  const qrCodes = await res.json();
  const unAssignedQrcodes = qrCodes.data.filter(
    (qrCode) => qrCode.isAssigned !== true,
  );

  return (
    <div>
      <AddUser unAssignedQrcodes={unAssignedQrcodes} />
    </div>
  );
}

export default page;
