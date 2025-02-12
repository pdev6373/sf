"use client";
import EditInput from "./EditInput";

const Settings = () => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="mb-5">
        <div className="text-2xl">Settings</div>
      </div>
      <div className="w-full grid grid-cols-3 gap-x-8">
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Change Password</div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="">
              <p className="text-lg font-semibold">Current Password</p>
              <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue="Olakunle"
                  name="FirstName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">New Password</p>
              <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue="Olakunle"
                  name="FirstName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">Confirm New Password</p>
              <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue="Olakunle"
                  name="FirstName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button className="h-12 bg-primary text-white w-full rounded">
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
