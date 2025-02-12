"use client";

import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import avatar from "../../public/assets/images/avatar.png";
import EditInput from "./EditInput";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
// import '../app/styles/'

const Profile = ({ userId }) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchQuery = async (url) => {
    const response = await fetch(url);
    return response.json();
  };
  
  const { data: profileData, error: profileDataError, isLoading: isprofileDataLoading, isFetched: isprofileDataFetched } = useQuery({
    queryKey: ['profileData'],
    queryFn: () => fetchQuery(`https://api-tracker.dev.dangote.islands.digital/Users/${userId}`),
  });

  console.log(profileData)

  return (
    <>
      <div className="mb-5">
        <div className="text-2xl">Profile</div>
      </div>
      <div className="w-full grid grid-cols-3 gap-x-8">
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Basic Information</div>
            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="bg-[#F7FBFF] h-[21px] px-1 flex gap-x-1 items-center"
              >
                <BsPencilSquare size={15} /> <p>Edit</p>
              </button>
            ) : (
              <button
                onClick={() => setEdit(false)}
                className="w-10 h-7 bg-danger text-white rounded flex items-center justify-center"
              >
                <IoMdClose size={18} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="">
              <p className="text-lg font-semibold">Picture</p>
              <div className="h-[85px] w-[85px] rounded-full overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-primary bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${avatar})`,
                  }}
                ></div>
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">First Name (s)</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.firstName}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                  <input
                    className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                    defaultValue={profileData.data.firstName}
                    name="FirstName"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Last Name</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.lastName}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                  <input
                    className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                    defaultValue={profileData.data.lastName}
                    name="LastName"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Nationality</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.nationality}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                  <input
                    className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                    defaultValue={profileData.data.nationality}
                    name="Nationality"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            {edit && (
              <div>
                <button className="h-12 bg-primary text-white w-full rounded">
                  SAVE
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Contact Information</div>
            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="bg-[#F7FBFF] h-[21px] px-1 flex gap-x-1 items-center"
              >
                <BsPencilSquare size={15} /> <p>Edit</p>
              </button>
            ) : (
              <button
                onClick={() => setEdit(false)}
                className="w-10 h-7 bg-danger text-white rounded flex items-center justify-center"
              >
                <IoMdClose size={18} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="">
              <p className="text-lg font-semibold">Email</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.email}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                  <input
                    className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                    defaultValue={profileData.data.email}
                    name="Email"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Phone Number</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.phoneNumber}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue="Olakunle"
                  name={profileData.data.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Emergency Contact Name</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.emergencyContactName}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue={profileData.data.emergencyContactName}
                  name="EmergencyContactName"
                  onChange={handleChange}
                />
              </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Emergency Contact Number</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.emergencyContactNumber}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue={profileData?.data.emergencyContactNumber}
                  name="EmergencyContactNumber"
                  onChange={handleChange}
                />
              </div>
              )}
            </div>
            {edit && (
              <div>
                <button className="h-12 bg-primary text-white w-full rounded">
                  SAVE
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Work Information</div>
            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="bg-[#F7FBFF] h-[21px] px-1 flex gap-x-1 items-center"
              >
                <BsPencilSquare size={15} /> <p>Edit</p>
              </button>
            ) : (
              <button
                onClick={() => setEdit(false)}
                className="w-10 h-7 bg-danger text-white rounded flex items-center justify-center"
              >
                <IoMdClose size={18} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="">
              <p className="text-lg font-semibold">Department</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.department}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue={profileData?.data.department}
                  name="Department"
                  onChange={handleChange}
                />
              </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Role</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.role}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                <input
                  className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                  defaultValue={profileData?.data.role}
                  name="Role"
                  onChange={handleChange}
                />
              </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">Primary Location Id</p>
              {!edit ? (
                <p className="text-lg">{profileData?.data.primaryLocationId}</p>
              ) : (
                <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                  <input
                    className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                    defaultValue={profileData?.data.primaryLocationId}
                    name="PrimaryLocation"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            {edit && (
              <div>
                <button className="h-12 bg-primary text-white w-full rounded">
                  SAVE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
