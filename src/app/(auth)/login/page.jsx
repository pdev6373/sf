'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('azure-ad-b2c', {
        callbackUrl: '/',
        redirect: 'https://sf-navy.vercel.app',
      });
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-y-auto flex-col">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/images/sf-landing-bg.png')`,
        }}
      >
        <div className="px-20 bg-primary bg-opacity-70 pt-10 pb-48">
          <div className="flex gap-x-10 items-center mb-36">
            <Image
              src="/assets/images/dangote-logo.png"
              alt="Dangote Logo"
              width={150}
              height={50}
            />
            <Image
              src="/assets/images/sf-logo.png"
              alt="SF Logo"
              width={150}
              height={50}
            />
          </div>
          <div className="flex items-center gap-x-52">
            <div className="max-w-2xl">
              <h4 className="font-bold text-6xl text-white">
                Manage security access across onsite facilities
              </h4>
            </div>
            <div className="min-w-[305px]">
              <div className="bg-white py-7 px-4 rounded-lg shadow-md">
                <div className="mb-6">
                  <p className="text-2xl font-bold">Sign In With Microsoft</p>
                </div>
                <div>
                  <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Signing in...' : 'SIGN IN'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
