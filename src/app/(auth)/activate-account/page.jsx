'use client'
import cid from '../../../../public/assets/images/cib-logo.png';
import EditInput from '@/components/EditInput';
import { Button } from 'flowbite-react';
import Image from 'next/image';

const ActivateAccount = () => {
  // const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-row">
        <div className="w-1/4 bg-primary self-stretch flex flex-col justify-center items-center">
          <div className="flex items-center gap-2">
            <Image src={cid} alt="logo" />
            <p className="text-white text-2xl font-bold">SF Secure</p>
          </div>
        </div>
        <div className="py-20 px-40 flex-1 overflow-y-auto">
          <div className="pr-40">
            <div className="mb-10">
              <h3 className="text-2xl font-semibold">Set a New Password</h3>
              <p>Your account is almost ready. Activate it with a new password.</p>
            </div>
            <div>
              <EditInput label="New Password" type="password" placeholder="" />
              <EditInput label="Confirm Password" placeholder="" type="password" />
              <div>
                <Button
                  // onClick={() => {
                  //   navigate('/users');
                  // }}
                  className="w-full"
                  fill
                >
                  SAVE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
