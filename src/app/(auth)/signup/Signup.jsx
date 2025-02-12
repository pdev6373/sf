"use client";
import cid from "../../../../public/assets/images/cib-logo.png";
import EditInput from "@/components/EditInput";
import Image from "next/image";
import Select from "@/components/Select";
import { FaRegImage } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import ComponentLevelLoader from "@/components/Loader";
import { useRouter } from "next/navigation";

const Signup = ({ department, staffType, locations }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

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
    formData.append("PrimaryLocationId", formValues.PrimaryLocationId); // Note: sending as a number, not a string
    formData.append("StaffType", formValues.StaffType);

    console.log(formData);

    try {
      const response = await fetch(
        "https://api-tracker.dev.dangote.islands.digital/Users/Create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 400 || response.status === 401) {
        setError("Something went wrong");
        setLoading(false);
        return;
      }

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        setSuccess("Sign up Successful");
        Router.push("/users");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {currentStep === 1 && (
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
                  <h3 className="text-2xl font-semibold">1 of 2</h3>
                </div>
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold">
                    Set up your Account
                  </h3>
                  <p>Please enter your correct information</p>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">First Name (s)</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Enter your First Name..."
                        name="FirstName"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Last Name </p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Enter your Last Name..."
                        name="LastName"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Email Address</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Enter Email Address..."
                        name="Email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Password</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Choose  a password"
                        name="Password"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Confirm Password</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Confirm your password"
                        name="ConfirmPassword"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-14">
                    <input
                      type="checkbox"
                      name=""
                      className="outline-none  focus:ring-0 "
                      onChange={handleChange}
                    />
                    <p>
                      By Creating an account, you agree to our Terms and
                      Condition
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className={`h-[50px] border-2 px-10 border-primary mb-4 duration-300 transition-all hover:shadow-md font-bold text-white bg-primary w-full`}
                    >
                      SAVE AND CONTINUE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 2 && (
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
                  <h3 className="text-2xl font-semibold">2 of 2</h3>
                </div>
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold">Finish the process</h3>
                  <p>Please enter your correct information</p>
                </div>
                <div>
                  <div className="mb-10">
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold">Picture</h3>
                      <p>Upload a professional headshot</p>
                    </div>
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
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Department</p>
                    </div>

                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <select
                        className={`h-full flex-1 bg-transparent focus:outline-0 outline-transparent border-transparent focus:border-transparent focus:ring-0 px-0 outline-0 border-none`}
                        name="Department"
                        onChange={handleChange}
                        // value={value}
                      >
                        <option>Select Department</option>
                        {department?.data.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Staff Type</p>
                    </div>

                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <select
                        className={`h-full flex-1 bg-transparent focus:outline-0 outline-transparent border-transparent focus:border-transparent focus:ring-0 px-0 outline-0 border-none`}
                        name="StaffType"
                        onChange={handleChange}
                        // value={value}
                      >
                        <option>Select Staff Type</option>
                        {staffType?.data.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Primary Location</p>
                    </div>

                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <select
                        className={`h-full flex-1 bg-transparent focus:outline-0 outline-transparent border-transparent focus:border-transparent focus:ring-0 px-0 outline-0 border-none`}
                        name="PrimaryLocationId"
                        onChange={handleChange}
                        value={formValues.PrimaryLocationId}
                      >
                        <option value={""}>Select Primary Location</option>
                        {locations?.data.map((d) => (
                          <option key={d.locationId} value={d.locationId}>
                            {d.locationName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Role</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Please enter your designation at the company"
                        name="Role"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Phone Number</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Please insert your phone number"
                        onChange={handleChange}
                        name="PhoneNumber"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Nationality</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Enter Nationality"
                        onChange={handleChange}
                        name="Nationality"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Emergency Contact</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Please enter an emergy contact"
                        name="EmergencyContactName"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1">
                      <p className="text-sm">Emergency Contact Number</p>
                    </div>
                    <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
                      <input
                        className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0`}
                        placeholder="Please enter an emergy contact"
                        name="EmergencyContactNumber"
                        onChange={handleChange}
                      />
                    </div>
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
                  <div>
                    <button
                      onClick={handleFormSubmit}
                      className={`h-[50px] border-2 px-10 border-primary mb-4 duration-300 transition-all hover:shadow-md font-bold text-white bg-primary w-full`}
                    >
                      {loading ? (
                        <ComponentLevelLoader color={"#ffffff"} />
                      ) : (
                        "SAVE"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
