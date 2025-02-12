"use client";

import { Dropdown, Table } from "flowbite-react";
import { BiCaretDown } from "react-icons/bi";
import styles from "./style.module.scss";
import ComponentLevelLoader from "../Loader";
import {
  MdOutlineCalendarMonth,
  MdOutlineQrCode,
  MdSort,
} from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Qrcode from "../../../public/assets/images/qr.png";
import Image from "next/image";
import { revalidatePath } from "next/cache";
const AllCodes = ({ qrCodeData, users }) => {
  console.log(qrCodeData);
  const rangeOptions = ["All Time", "Date Range"];
  const [rangeType, setRangeType] = useState(rangeOptions[0]);
  const userTypeOptions = ["Regular", "Admin", "Temporary", "Frontdesk Admin"];
  const [userType, setUserType] = useState(rangeOptions[0]);
  const sortOptions = ["A-Z", "Z-A", "Access"];
  const [printQrCode, setPrintQrCode] = useState(false);
  const [manageQrCode, setManageQrCode] = useState(false);
  const [generateQrCode, setGenerateQrCode] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentCount, setCurrentCount] = useState(10);
  const [allData, setAllData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [locationAccess, setLocationAccess] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [revokeQr, setrevokeQr] = useState();
  const [qrAssigned, setQrAssigned] = useState();
  const [qrSerialN, setQrSerialN] = useState();

  const itemsPerPage = 5;

  useEffect(() => {
    setAllData(qrCodeData.data);
    setDisplayedData(qrCodeData.data.slice(0, itemsPerPage));
  }, []);

  const handleSeeMore = () => {
    const newCount = currentCount + itemsPerPage;
    setCurrentCount(newCount);
    setDisplayedData(allData.slice(0, newCount));
  };

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      AllowAccess: locationAccess,
    }));
  }, [locationAccess]);

  const handleItemClick = (itemId, user) => {
    setFormValues((prev) => ({
      ...prev,
      userId: itemId,
    }));
    setSelectedUser(user);
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    const formData = new FormData();
    setLoading(true);
    setError("");
    setSuccess("");

    // Append each field to formData

    formData.append("UserId", formValues.userId);
    formData.append("SerialNumber", selectedQrCode);
    console.log(formData);

    try {
      const response = await fetch(
        "https://api-tracker.dev.dangote.islands.digital/QrCode/Assign",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 400 || response.status === 401) {
        const result = await response.json();
        if (result.message) {
          setError(result.message);
          setLoading(false);
          return;
        }
        setError("Something went wrong");
        setLoading(false);
        return;
      }

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        setError("");
        setSuccess("Qr Code Assigned Succesfully");
        // Router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError("Something went wrong");
      console.error("Error:", error);
    }
  };
  const handleRevoke = async (e) => {
    const formData = new FormData();
    setLoading(true);
    setError("");

    // Append each field to formData

    formData.append("SerialNumber", revokeQr);
    console.log(formData);

    try {
      const response = await fetch(
        "https://api-tracker.dev.dangote.islands.digital/QrCode/Revoke",
        {
          method: "POST",
          body: formData,
        }
      );

      if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 404
      ) {
        setLoading(false);
        const result = await response.json();
        if (result.message) {
          setError(result.message);
          setLoading(false);
          return;
        }
        setError("Something went wrong");
        setLoading(false);
        return;
      }

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        // setRevoked(true)
        // Router.push("/login");
        revalidatePath("/qrcode");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full mb-4 max-w-[968px]">
        <div className="text-2xl">Location</div>

        <div className="flex items-center gap-x-10">
          <Dropdown
            label=""
            // dismissOnClick={false}
            renderTrigger={() => (
              <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                <MdOutlineCalendarMonth size={24} />
                <p>{rangeType}</p>
                <BiCaretDown size={15} />
              </button>
            )}
          >
            {rangeOptions.map((r) => (
              <Dropdown.Item
                key={r}
                onClick={() => {
                  setRangeType(r);
                }}
              >
                {r}
              </Dropdown.Item>
            ))}
          </Dropdown>

          {rangeType === "Date Range" && (
            <>
              <div className="relative">
                <input
                  type="date"
                  ref={fromDateRef}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.currentTarget.value)}
                  className="max-h-[0px] max-w-[0px] opacity-0 -z-10 top-0 left-0 absolute"
                />
                <button
                  onClick={() => fromDateRef.current?.showPicker()}
                  className="flex gap-1 px-2 items-center bg-white h-[34px]"
                >
                  <MdOutlineCalendarMonth size={24} />
                  <p>
                    From -{" "}
                    {new Date(
                      fromDate || new Date().getTime()
                    ).toLocaleDateString("en-US")}
                  </p>
                </button>
              </div>

              <div className="relative">
                <input
                  type="date"
                  ref={toDateRef}
                  value={toDate}
                  onChange={(e) => setToDate(e.currentTarget.value)}
                  className="max-h-[0px] max-w-[0px] opacity-0 -z-10 top-0 left-0 absolute"
                />
                <button
                  onClick={() => toDateRef.current?.showPicker()}
                  className="flex gap-1 px-2 items-center bg-white h-[34px]"
                >
                  <MdOutlineCalendarMonth size={24} />
                  <p>
                    To -{" "}
                    {new Date(
                      toDate || new Date().getTime()
                    ).toLocaleDateString("en-US")}
                  </p>
                </button>
              </div>
            </>
          )}

          <Dropdown
            label=""
            // dismissOnClick={false}
            renderTrigger={() => (
              <button className="flex gap-1 px-2 items-center bg-white h-[34px]">
                <MdSort size={24} />
                <p>Sort By</p>
                <BiCaretDown size={15} />
              </button>
            )}
          >
            {sortOptions.map((s) => (
              <Dropdown.Item
                key={s}
                onClick={() => {
                  setSortType(s);
                }}
              >
                {s}
              </Dropdown.Item>
            ))}
          </Dropdown>

          <div className="bg-white px-2 flex items-center gap-x-1 h-[34px]">
            <IoIosSearch size={24} />
            <input placeholder="Search" className="outline-none text-sm" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="bg-white rounded-lg w-full p-7 pb-[3rem] max-w-[968px]">
          <div className="flex items-center justify-between mb-3 pb-4 border-b-[#C4C2C2] border-b-[0.25px]">
            <div className="text-lg">All Codes</div>
            <button
              onClick={() => {
                setGenerateQrCode(true);
                setPrintQrCode(false);
                setManageQrCode(false);
              }}
              className="flex items-center gap-x-3 justify-center text-white bg-primary h-[34px] rounded px-3"
            >
              <MdOutlineQrCode size={24} />
              <p>Generate New Code</p>
            </button>
          </div>

          <div>
            <Table>
              <Table.Head className="capitalize text-base">
                <Table.HeadCell className="text-center">
                  Serial Number
                </Table.HeadCell>
                <Table.HeadCell className="text-center">Type</Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Date Created
                </Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Assigned/Unassigned
                </Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Last Use
                </Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Total Use
                </Table.HeadCell>
                <Table.HeadCell className="text-center">Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body>
                {displayedData.map((c) => (
                  <Table.Row key={c.serialNumber} className="text-black">
                    <Table.Cell className="text-center">
                      {c.serialNumber}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {c.staffType}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {c.dateCreated}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {c.isAssigned ? "Assigned" : "UNassigned"}
                    </Table.Cell>
                    <Table.Cell className="text-center">In use</Table.Cell>
                    <Table.Cell className="text-center">
                      {c.totalUse}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex flex-col items-center">
                        <Dropdown
                          label=""
                          // dismissOnClick={false}
                          renderTrigger={() => (
                            <button className="flex gap-x-1 items-center">
                              <IoIosMenu size={15} />
                            </button>
                          )}
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setPrintQrCode(true);
                              setManageQrCode(false);
                              setGenerateQrCode(false);
                              setrevokeQr(c.serialNumber);
                              setQrAssigned(c.isAssigned);
                              setQrSerialN(c.serialNumber);
                            }}
                          >
                            Print
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setManageQrCode(true);
                              setPrintQrCode(false);
                              setGenerateQrCode(false);
                              setSelectedQrCode(c.serialNumber);
                              setQrAssigned(c.isAssigned);
                              setQrSerialN(c.serialNumber);
                            }}
                          >
                            Manage
                          </Dropdown.Item>
                          {/* <Dropdown.Item onClick={() => {}}>Assign/Revoke Tag</Dropdown.Item> */}
                        </Dropdown>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          <div className="flex justify-center mt-[3rem]">
            {currentCount < allData.length && (
              <button
                className="bg-primary font-bold text-lg px-4 text-white"
                onClick={handleSeeMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>

        {printQrCode && (
          <div className="max-w-[445px] w-full bg-white p-8">
            <div className="flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-4">
              <p className="text-lg">QR Code</p>
              <button className="bg-[#10328C] w-[100px] h-[39px] rounded-[5px] text-lg font-medium text-white">
                PRINT
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-4 gap-1">
              <Image src={Qrcode} alt="qr-code" />
              <p className="text-center text-xs">
                Serial Number <br /> {qrSerialN}
              </p>
              <p className="font-bold text-lg text-[#08BA8F]">{qrAssigned ? 'Used' : 'Not Used'}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-6 mt-6">
              <div>
                <p className="text-lg font-semibold mb-4">User Type</p>
                <p>Regular Staff</p>
              </div>

              <div>
                <p className="text-lg font-semibold mb-4">Assigned To</p>
                <p>Musa Mohammed</p>
              </div>
            </div>

            <button
              disabled={!qrAssigned}
              onClick={handleRevoke}
              className={`${
                qrAssigned ? "bg-[#ED0A0A]" : "bg-slate-500"
              } w-[381px] h-[48px] rounded-[5px] text-lg font-medium text-white mt-10`}
            >
              {loading ? <ComponentLevelLoader color={"#ffffff"} /> : "REVOKE"}
            </button>
          </div>
        )}

        {manageQrCode && (
          <div className="max-w-[445px] w-full bg-white p-8">
            <div className="flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-4">
              <p className="text-lg">QR Code</p>
              <button className="bg-[#10328C] w-[100px] h-[39px] rounded-[5px] text-lg font-medium text-white">
                PRINT
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-4 gap-1">
              <Image src={Qrcode} alt="qr-code" />
              <p className="text-center text-xs">
                Serial Number <br /> {setQrSerialN}
              </p>
              <p className="font-bold text-lg text-[#E60E0E]">{qrAssigned ? 'Used' : 'Not Used'}</p>
            </div>

            <div className="flex flex-col w-full gap-6 mt-6">
              <div className="w-full">
                <p className="text-lg font-semibold mb-2">User Type</p>
                <Dropdown
                  label=""
                  renderTrigger={() => (
                    <button className="flex justify-between p-6 items-center bg-[#F6F6F9] h-[34px] w-full">
                      <p>{userType}</p>
                      <BiCaretDown size={17} />
                    </button>
                  )}
                >
                  {userTypeOptions.map((r) => (
                    <Dropdown.Item
                      key={r}
                      onClick={() => {
                        setUserType(r);
                      }}
                    >
                      {r}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
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
              <div className="w-full">
                <p className="text-lg font-semibold mb-2">Assign to</p>
                <input
                  type="text"
                  placeholder={!selectedUser ? "Search by name" : selectedUser}
                  className="w-full bg-[#F6F6F9] h-[34px] p-6 outline-none border-none placeholder:text-black"
                />
              </div>
            </div>
            <section className={styles.section4}>
              {/* <div className={styles.middle}>
                    <div className={styles.formInput}>
                      <h1>Allow Access to</h1>
                      <input
                        type="search"
                        name="username"
                        placeholder="Search by name"
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
              <div className={styles.bottom}>
                <div className={styles.row}>
                  {/* <h1>ID</h1> */}
                  <h1 className={styles.row2}>Name</h1>
                  {/* <h1 className={styles.row3}>Action</h1> */}
                </div>
                <div className={styles.tableColomn}>
                  {users?.data.map((user) => (
                    <div
                      key={user.userId}
                      className={styles.colomn}
                      onClick={() =>
                        handleItemClick(user.userId, user.staffName)
                      }
                    >
                      {/* <h1>{user.userId}</h1> */}
                      <h1>{user.staffName}</h1>
                      {/* <span style={{
                            backgroundColor: formData.AccessRequestUserIds?.includes(user.userId) ? 'red' : '#08BA8F'
                          }}>{formData.AccessRequestUserIds?.includes(user.userId) ? 'Revoke' : 'Add'}</span> */}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <button
              onClick={handleFormSubmit}
              className={`${
                qrAssigned ? "bg-[#ED0A0A]" : "bg-slate-500"
              } w-[381px] h-[48px] rounded-[5px] text-lg font-medium text-white mt-10`}
              disabled={!qrAssigned}
            >
              {loading ? <ComponentLevelLoader color={"#ffffff"} /> : "Update"}
            </button>
          </div>
        )}

        {generateQrCode && (
          <div className="max-w-[445px] w-full bg-white p-8">
            <div className="flex justify-between items-center border-b-[0.25px] border-[#C4C2C2] pb-4">
              <p className="text-lg">QR Code</p>
              <button className="bg-[#10328C] w-[100px] h-[39px] rounded-[5px] text-lg font-medium text-white">
                PRINT
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-4 gap-1">
              <Image src={Qrcode} alt="qr-code" />
              <p className="text-center text-xs">
                Serial Number <br /> 00-00054
              </p>
              <p className="font-bold text-lg text-[#E60E0E]">Not Used</p>
            </div>

            <div className="flex flex-col w-full gap-6 mt-6">
              <div className="w-full">
                <p className="text-lg font-semibold mb-2">User Type</p>
                <Dropdown
                  label=""
                  renderTrigger={() => (
                    <button className="flex justify-between p-6 items-center bg-[#F6F6F9] h-[34px] w-full">
                      <p>{userType}</p>
                      <BiCaretDown size={17} />
                    </button>
                  )}
                >
                  {userTypeOptions.map((r) => (
                    <Dropdown.Item
                      key={r}
                      onClick={() => {
                        setUserType(r);
                      }}
                    >
                      {r}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>

              <div className="w-full">
                <p className="text-lg font-semibold mb-2">Assign to</p>
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full bg-[#F6F6F9] h-[34px] p-6 outline-none border-none placeholder:text-black"
                />
              </div>
            </div>

            <button className="bg-[#10328C] w-[381px] h-[48px] rounded-[5px] text-lg font-medium text-white mt-10">
              SAVE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCodes;
