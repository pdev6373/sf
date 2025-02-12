"use client";

import { useState } from "react";
import styles from "../../../styles/add-user.module.scss";
import CancelButton from "@/components/CancelButton";
import ProfilePic from "../../../../../public/assets/images/rounded-profile-pic.png";
import Image from "next/image";
import { Datepicker, Dropdown } from "flowbite-react";
import { BiCaretDown } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import Qrcode from "../../../../../public/assets/images/qr-lg.png";
import { FaRegImage } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader";

const AddUser = ({ unAssignedQrcodes }) => {
    console.log(unAssignedQrcodes)
  const staffTypeOptions = ["Regular", "Admin", "Non-staff", "Temporary"];
  const [staffType, setStaffType] = useState(staffTypeOptions[0]);
//   const unAssignedCodeOptions =UnAssignedQrcodes
  const [unAssignedCode, setUnAssignedCode] = useState("");
  const [isCodeAssigned, setIsCodeAssigned] = useState(false);

  const startTimeHoursOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const startTimeMinutesOptions = ["00", "15", "30", "45"];
  const [startTimeHours, setStartTimeHours] = useState(
    startTimeHoursOptions[0]
  );
  const [startTimeMinutes, setStartTimeMinutes] = useState(
    startTimeMinutesOptions[0]
  );

  const endTimeHoursOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const endTimeMinutesOptions = ["00", "15", "30", "45"];
  const [endTimeHours, setEndTimeHours] = useState(endTimeHoursOptions[0]);
  const [endTimeMinutes, setEndTimeMinutes] = useState(
    endTimeMinutesOptions[0]
  );


  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      ProfilePicture: selectedFile,
    }));
  }, [selectedFile]);

  const handleFormSubmit = async (e) => {
    const formData = new FormData();
    setLoading(true);
    setError(false);

    // Append each field to formData
    if (selectedFile) {
      formData.append("ProfilePicture", selectedFile);
    }
    formData.append("Department", formValues.Department);
    formData.append("FirstName", formValues.FirstName);
    formData.append("LastName", formValues.LastName);
    formData.append("PhoneNumber", formValues.PhoneNumber);
    formData.append("Email", formValues.Email);
    formData.append("Nationality", formValues.Nationality);
    formData.append("EmergencyContactName", formValues.EmergencyContactName);
    formData.append(
      "EmergencyContactNumber",
      formValues.EmergencyContactNumber
    );
    formData.append("Role", formValues.Role);
    formData.append("PrimaryLocationId", 4); // Note: sending as a number, not a string
    formData.append("StaffType", staffType);

    console.log(formData);

    try {
      const response = await fetch(
        "https://api-tracker.dev.dangote.islands.digital/Users/Create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 400 || response.status === 401 || response.status === 404) {
        setError("Something went wrong");
        setLoading(false);
        return;
      }

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        setSuccess("User Created Succesfully");
        Router.push("/users");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.error("Error:", error);
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.mainTop}>Add New User</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-4 max-w-[440px]">
          <div className="bg-white h-fit w-full rouded-[10px] p-6 ">
            <div className="flex justify-between pb-3 items-center border-b border-[#C4C2C2]">
              <p>Basic Information</p>
              <CancelButton />
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold text-[#13111F]">Picture</h4>
              <p className="text-sm mb-4 text-[#7F8286]">Update your photo</p>

              <div className="mb-10">
                {/* <div className="mb-5">
                      <h3 className="text-lg font-semibold">Picture</h3>
                      <p>Upload a professional headshot</p>
                    </div> */}
                <div>
                  <button
                    onClick={() => {
                      fileRef.current?.click();
                    }}
                  >
                    <div className="h-[144px] w-[144px] rounded-full bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                      {selectedFile ? (
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="selected"
                        />
                      ) : (
                        <FaRegImage size={83} color="#000" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="opacity-0 h-0 w-0"
                      ref={fileRef}
                      onChange={(e) => {
                        if (e.currentTarget.files?.length) {
                          setSelectedFile(e.currentTarget.files[0]);
                        } else {
                          setSelectedFile(undefined);
                        }
                      }}
                    />
                  </button>
                </div>
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  First Name (s)
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="text"
                 name="FirstName"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  Last Name
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="text"
                  name="LastName"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  Nationality
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="text"
                  name="Nationality"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="bg-[#10328C] text-white text-lg font-semibold w-full h-[48px] rounded-[5px] mt-4">
              SAVE
            </button>
          </div>

          <div className="bg-white max-w-[440px] w-full rouded-[10px] p-6 ">
            <div className="flex justify-between pb-3 items-center border-b border-[#C4C2C2]">
              <p>Contact Information</p>
              <CancelButton />
            </div>

            <div className="mt-10">
              <div className="mb-7 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  Email
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="email"
                  name="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-7 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  Phone Number
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="text"
                  name="PhoneNumber"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-7 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  Emergency Contact Name
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="text"
                  name="EmergencyContactName"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-7 flex flex-col gap-2">
                <label
                  className="text-lg font-semibold text-[#13111F]"
                  htmlFor=""
                >
                  Emergency Contact Number
                </label>
                <input
                  className="w-full h-[50px] bg-[#F6F6F9] border-0"
                  type="text"
                  name="EmergencyContactNumber"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="bg-[#10328C] text-white text-lg font-semibold w-full h-[48px] rounded-[5px] mt-4">
              SAVE
            </button>
          </div>
        </div>

        <div className="bg-white h-fit max-w-[440px] w-full rouded-[10px] p-6 ">
          <div className="flex justify-between pb-3 items-center border-b border-[#C4C2C2]">
            <p>Work Information</p>
            <CancelButton />
          </div>

          <div className="mt-10">
            <div className="mb-7 flex flex-col gap-2">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                Department
              </label>
              <input
                className="w-full h-[50px] bg-[#F6F6F9] border-0"
                type="text"
                name="Department"
                onChange={handleChange}
              />
            </div>
            <div className="mb-7 flex flex-col gap-2">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                Role
              </label>
              <input
                className="w-full h-[50px] bg-[#F6F6F9] border-0"
                type="text"
                name="Role"
                  onChange={handleChange}
              />
            </div>
            <div className="mb-7 flex flex-col gap-2">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                Primary Location
              </label>
              <input
                className="w-full h-[50px] bg-[#F6F6F9] border-0"
                type="text"
                name="PrimaryLocation"
                  onChange={handleChange}
              />
            </div>
            <div className="mb-7 flex flex-col gap-2">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                Staff Type
              </label>
              <Dropdown
                renderTrigger={() => (
                  <button className="w-full p-4 h-[50px] bg-[#F6F6F9] border-0 flex justify-between items-center">
                    <p>{staffType}</p>
                    <BiCaretDown size={15} />
                  </button>
                )}
              >
                {staffTypeOptions.map((s) => (
                  <Dropdown.Item
                    key={s}
                    onClick={() => {
                      setStaffType(s);
                    }}
                  >
                    {s}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </div>

          <button className="bg-[#10328C] text-white text-lg font-semibold w-full h-[48px] rounded-[5px] mt-4">
            SAVE
          </button>
        </div>

        <div className="bg-white h-fit max-w-[440px] w-full rouded-[10px] p-6 ">
          <div className="pb-3 border-b border-[#C4C2C2]">
            <p>Assign QR Code</p>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <p className="text-base font-normal text-black">
              Choose from a list of unassigned QR codes{" "}
            </p>
            <Dropdown
              renderTrigger={() => (
                <div className="w-full p-4 h-[50px] bg-[#F6F6F9] border-0 flex justify-between items-center">
                  <IoMdSearch size={24} />
                  <input
                    name="PrimaryLocationId"
                    onChange={handleChange}
                    placeholder="Search or select from list"
                    className="flex gap-1 px-2 items-center bg-transparent w-full outline-none h-[34px]"
                  />
                  <BiCaretDown size={24} />
                </div>
              )}
            >
              {unAssignedQrcodes.map((s) => (
                <Dropdown.Item
                  key={s.serialNumber}
                  onClick={() => {
                    setUnAssignedCode(s.serialNumber);
                    setIsCodeAssigned(true);
                  }}
                >
                  {s.serialNumber}
                </Dropdown.Item>
              ))}
            </Dropdown>

            <div className="m-auto">
              {isCodeAssigned ? (
                <div className="flex flex-col py-[2rem] justify-center items-center">
                  <Image src={Qrcode} />
                  <p className="text-xs">Serial Number</p>
                  <p className="text-xs">{unAssignedCode}</p>
                </div>
              ) : (
                <p className="text-2xl text-center py-[5rem] w-[188px]">
                  No QR code has been assigned. Search or select from the
                  dropdown to assign.{" "}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-[#000] py-6 mt-4">
            <p className="text-lg text-black">
              Select the period during which the tag should be enabled.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                Start Date
              </label>
              <input
                className="w-full h-[50px] bg-[#F6F6F9] border-0"
                type="date"
                name="Department"
                  onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                End Date
              </label>
              <input
                className="w-full h-[50px] bg-[#F6F6F9] border-0"
                type="date"
                name="Department"
                  onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                Start Time
              </label>
              <div className="flex gap-4">
                <Dropdown
                  renderTrigger={() => (
                    <button className="flex gap-1 px-2 items-center justify-between bg-[#F6F6F9] w-[90px] h-[50px]">
                      <p>{startTimeHours}</p>
                      <BiCaretDown size={15} />
                    </button>
                  )}
                >
                  {startTimeHoursOptions.map((s) => (
                    <Dropdown.Item
                      key={s}
                      onClick={() => {
                        setStartTimeHours(s);
                      }}
                    >
                      {s}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <Dropdown
                  renderTrigger={() => (
                    <button className="flex gap-1 px-2 items-center justify-between bg-[#F6F6F9] w-[90px] h-[50px]">
                      <p>{startTimeMinutes}</p>
                      <BiCaretDown size={15} />
                    </button>
                  )}
                >
                  {startTimeMinutesOptions.map((s) => (
                    <Dropdown.Item
                      key={s}
                      onClick={() => {
                        setStartTimeMinutes(s);
                      }}
                    >
                      {s}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-[#13111F]"
                htmlFor=""
              >
                End Time
              </label>
              <div className="flex gap-4">
                <Dropdown
                  renderTrigger={() => (
                    <button className="flex gap-1 px-2 items-center justify-between bg-[#F6F6F9] w-[90px] h-[50px]">
                      <p>{endTimeHours}</p>
                      <BiCaretDown size={15} />
                    </button>
                  )}
                >
                  {endTimeHoursOptions.map((s) => (
                    <Dropdown.Item
                      key={s}
                      onClick={() => {
                        setEndTimeHours(s);
                      }}
                    >
                      {s}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <Dropdown
                  renderTrigger={() => (
                    <button className="flex gap-1 px-2 items-center justify-between bg-[#F6F6F9] w-[90px] h-[50px]">
                      <p>{endTimeMinutes}</p>
                      <BiCaretDown size={15} />
                    </button>
                  )}
                >
                  {endTimeMinutesOptions.map((s) => (
                    <Dropdown.Item
                      key={s}
                      onClick={() => {
                        setEndTimeMinutes(s);
                      }}
                    >
                      {s}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>
          </div>

          <button onClick={handleFormSubmit} className="bg-[#10328C] w-[381px] h-[48px] rounded-[5px] text-lg font-medium text-white mt-10">
          {loading ? (
                        <ComponentLevelLoader color={"#ffffff"} />
                      ) : (
                        "Assign"
                      )}
          </button>
          <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  >
                    {error && (
                      <p style={{ color: "red" }}>
                        <span>{error}</span>
                      </p>
                    )}
                    {success && (
                      <p style={{ color: "green" }}>
                        <span>{success}</span>
                      </p>
                    )}
                  </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
