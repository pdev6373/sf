"use client";
import { useEffect, useState } from "react";
import styles from "../../../styles/add-location.module.scss";
import "../../styles/locationDrop.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineDown } from "react-icons/ai";
import ComponentLevelLoader from "@/components/Loader";

function AddLocation({ users, accessAllowedTo }) {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);
  const [disableForm1, setDisableForm1] = useState(false);
  const [disableForm2, setDisableForm2] = useState(false);
  const [disableForm3, setDisableForm3] = useState(false);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      AllowAccess: locationAccess,
    }));
  }, [locationAccess]);

  const handleItemClick = (itemId) => {
    setFormValues((prev) => {
      const AccessRequestUserIds = prev.AccessRequestUserIds || [];
      const updatedItems = AccessRequestUserIds.includes(itemId)
        ? AccessRequestUserIds.filter((id) => id !== itemId)
        : [...AccessRequestUserIds, itemId];

      return {
        ...prev,
        AccessRequestUserIds: updatedItems,
      };
    });
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggle = () => {
    setLocationAccess(!locationAccess);
  };

  const handleFormSubmit = async (e) => {
    const formData = new FormData();
    setLoading(true);
    setError(false);

    // Append each field to formData
    formData.append("AllowAccess", locationAccess);
    formData.append("Name", formValues.Name);
    formData.append("Department", formValues.Department);
    formData.append("Office", formValues.Office);
    formData.append("AccessAllowedTo", formValues.AccessAllowedTo);
    formData.append("OfficeLocation", formValues.OfficeLocation);
    formData.append("P1x", formValues.P1x);
    formData.append("P1y", formValues.P1y);
    formData.append("P2x", formValues.P2x);
    formData.append("P2y", formValues.P2y);
    formData.append("P3x", formValues.P3x);
    formData.append("P3y", formValues.P3y);
    formData.append("P4x", formValues.P4x);
    formData.append("P4y", formValues.P4y);
    formValues.AccessRequestUserIds.forEach((userId) => {
      formData.append("AccessRequestUserIds[]", userId.toString());
    });

    console.log(formData);

    try {
      const response = await fetch(
        "https://api-tracker.dev.dangote.islands.digital/Location/Create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 400 || response.status === 401 || response.status === 400) {
        setError("Something went wrong");
        setLoading(false);
        return;
      }

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        setSuccess("Location Created successfully");
        Router.push("/location");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.error("Error:", error);
    }
  };

  const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const options = accessAllowedTo?.data;

    const handleDropdownToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
      console.log(`Selected option: ${option}`);
      setSelectedOption(option);
      setFormValues((prev) => {
        return {
          ...prev,
          AccessAllowedTo: option,
        };
      });
      setIsOpen(false);
    };

    return (
      <div className="dropdown-container">
        <div
          className={`dropdown-header ${isOpen ? "open" : ""}`}
          onClick={handleDropdownToggle}
        >
          {!formValues?.AccessAllowedTo
            ? "All assigned staff"
            : formValues.AccessAllowedTo}
          <AiOutlineDown
            className="dropdown-icon"
            style={{
              color: "#98A2B3",
              height: "20px",
              width: "25px",
            }}
          />
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options?.map((option, index) => (
              <div
                key={option}
                className="dropdown-option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainTop}>
        <h1>Add New Location</h1>
        <button onClick={handleFormSubmit}>
          {loading ? (
            <ComponentLevelLoader color={"#ffffff"} />
          ) : (
            "Create Location"
          )}
        </button>
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
      <main className={styles.main}>
        <div className={styles.addLocation}>
          <form action="">
            <section className={styles.section1}>
              <div className={styles.top}>
                <h1>Location Information</h1>
                <div className={styles.icon}>
                  <IoMdClose />
                </div>
              </div>
              <div className={styles.middle}>
                <div className={styles.formInput}>
                  <h1>Name of Location</h1>
                  <input type="text" name="Name" onChange={handleChange} />
                </div>
                <div className={styles.formInput}>
                  <h1>Department</h1>
                  <input
                    type="text"
                    name="Department"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Office</h1>
                  <input
                    type="text"
                    name="Office"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Office Location</h1>
                  <input
                    type="text"
                    name="OfficeLocation"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.bottom}>
                <button
                  disabled={disableForm1}
                  onClick={() => setDisableForm1(!disableForm1)}
                  className={`saveBtn ${disableForm1 ? "bg-slate-500" : "bg-[#10328C]"}`}
                >
                  Save
                </button>
              </div>
            </section>

            {/* section two */}
            <section className={styles.section2}>
              <div className={styles.top}>
                <h1>Geolocation Information</h1>
                <div className={styles.icon}>
                  <IoMdClose size={20} />
                </div>
              </div>
              <div className={styles.middle}>
                <div className={styles.formInput}>
                  <h1>Point 1 - Latitude / X</h1>
                  <input
                    type="number"
                    name="P1x"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 1 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P1y"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 2 - Latitude / X</h1>
                  <input
                    type="number"
                    name="P2x"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 2 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P2y"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 3 - Latitude / X</h1>
                  <input
                    type="number"
                    name="P3x"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 3 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P3y"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 4 - Latitude / X</h1>
                  <input
                    type="number"
                    name="P4x"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 4 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P4y"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.bottom}>
                <button
                  disabled={disableForm2}
                  onClick={() => setDisableForm2(!disableForm2)}
                  className={`saveBtn ${disableForm2 ? "bg-slate-500" : "bg-[#10328C]"}`}
                >
                  Save
                </button>
              </div>
            </section>

            {/* section three */}
            <section className={styles.section3wrapper}>
              <section className={styles.section3}>
                <div className={styles.top}>
                  <h1>Access</h1>
                  <div
                    className={styles.icon}
                    style={{
                      display: "none",
                    }}
                  >
                    <IoMdClose size={20} />
                  </div>
                </div>
                <div className={styles.middle}>
                  <h2>Choose if you want location to be accessible</h2>
                  <div className={styles.toggler}>
                    <h1>Allow Access</h1>
                    <label className={styles.toggle}>
                      <input
                        className={styles.toggle__input}
                        name=""
                        type="checkbox"
                        id="myToggle"
                        onClick={handleToggle}
                      />
                      <div className={styles.toggle__fill}></div>
                    </label>
                  </div>
                  <div className={styles.drop}>
                    <h1>Allow Access To</h1>
                    <Dropdown />
                  </div>
                </div>
                <div className={styles.bottom}>
                  <button
                    disabled={disableForm3}
                    onClick={() => setDisableForm3(!disableForm3)}
                    className={`saveBtn ${disableForm3 ? "bg-slate-500" : "bg-[#10328C]"}`}
                  >
                    Save
                  </button>
                </div>
              </section>

              {locationAccess && (
                <section className={styles.section4}>
                  <div className={styles.top}>
                    <h1>Who can access this location?</h1>
                    <p>28</p>
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.formInput}>
                      <h1>Allow Access to</h1>
                      <input
                        type="search"
                        name="username"
                        placeholder="Search by name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.row}>
                      <h1>ID</h1>
                      <h1 className={styles.row2}>Name</h1>
                      <h1 className={styles.row3}>Action</h1>
                    </div>
                    <div className={styles.tableColomn}>
                      {users?.data.map((user) => (
                        <div
                          key={user.userId}
                          className={styles.colomn}
                          onClick={() => handleItemClick(user.userId)}
                        >
                          <h1>{user.userId}</h1>
                          <h1>{user.staffName}</h1>
                          <span
                            style={{
                              backgroundColor:
                                formValues.AccessRequestUserIds?.includes(
                                  user.userId
                                )
                                  ? "red"
                                  : "#08BA8F",
                            }}
                          >
                            {formValues.AccessRequestUserIds?.includes(
                              user.userId
                            )
                              ? "Revoke"
                              : "Add"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </section>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddLocation;
