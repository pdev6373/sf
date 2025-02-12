import React from 'react';
import style from '../styles/qrcode.module.scss';
import AllCodes from '@/components/AllCodes/AllCodes';

const page = async () => {
  const res = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/QrCode/Statistics',
    { cache: 'no-store' },
  );
  const qrCodeStats = await res.json();
  const res2 = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/QrCode/All?page_no=1&page_size=100',
    { cache: 'no-store' },
  );
  const allQrCodes = await res2.json();
  const res3 = await fetch(
    'https://api-tracker.dev.dangote.islands.digital/Users/All?page_no=1&page_size=50',
    { cache: 'no-store' },
  );
  const users = await res3.json();

  const cardData = [
    {
      title: 'Total QR Codes',
      count: qrCodeStats.data.totalQrCodes,
    },
    {
      title: 'Assigned QR Codes',
      count: qrCodeStats.data.assignedQrCodes,
    },
    {
      title: 'Unassigned QR Codes',
      count: qrCodeStats.data.unAssignedQrCodes,
    },
  ];
  return (
    <div className={style.qrcode_container}>
      <div className={style.qrcode_card_container}>
        {cardData.map((data, u) => (
          <div key={u} className={style.qrcode_card}>
            <p className={style.qrcode_card_title}>{data.title}</p>
            <p className={style.qrcode_card_count}>{data.count}</p>
          </div>
        ))}
      </div>

      <AllCodes qrCodeData={allQrCodes} users={users} />
    </div>
  );
};

export default page;
