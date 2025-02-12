"use client";
import { useState } from "react";
import styles from "../../../styles/add-location.module.scss";
import "../../styles/locationDrop.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineDown } from "react-icons/ai";

function EditLocation({ users }) {
    const [formData, setFormData] = useState({});
    
    const [locationAccess, setLocationAccess] = useState(true);

  const handleItemClick = (itemId) => {
    setFormData((prev) => {
      const AccessRequestUserIds = prev.AccessRequestUserIds || [];
      const updatedItems = AccessRequestUserIds.includes(itemId)
        ? AccessRequestUserIds.filter(id => id !== itemId)
        : [...AccessRequestUserIds, itemId];
      
      return {
        ...prev,
        AccessRequestUserIds: updatedItems,
      };
    });
  };
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleToggle = () => {
    setLocationAccess(!locationAccess);
    console.log(locationAccess);
  };

  const handleFormSubmit = async (e) => {
    console.log(formData);
    // const { email, username, password, confirmPassword } = formData || {};
    const body = {
        ...formData,
      };

    try {
        const res = await fetch(
          "https://api-tracker.dev.dangote.islands.digital/Location/Create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
  
        const data = await res.json();
  
        if (res.status === 400) {
        //   setError(data.error)
        //   setLoading(false)
        //   return { error: data.error };
        console.log(data.error)
        }
  
        if (res.status === 201) {
            console.log('successfully!!!!')
        }
  
        // Handle other status codes
        return { error: "An unexpected error occurred" };
      } catch (err) {
        console.error(err);
        return { error: "An error occurred while processing your request" };
      }
  
  };

  const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const options = ["All assigned staff", "Only Admin", "Only Assigned Security Staff", "Only Assigned Regular Staff", 'Only Temporary Staff'];

    const handleDropdownToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
      console.log(`Selected option: ${option}`);
      setSelectedOption(option);
      setFormData((prev) => {
        return {
          ...prev,
          country: option,
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
          {!formData?.country ? "All assigned staff" : formData.country}
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
            {options.map((option, index) => (
              <div
                key={index}
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
        <h1>Head Office - 001123</h1>
        <button style={{backgroundColor: '#10328C'}} onClick={handleFormSubmit}>Update Location</button>
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
                  <input type="text" name="Name" onChange={handleChange} defaultValue={'Ikeja Plant'} />
                </div>
                <div className={styles.formInput}>
                  <h1>Department</h1>
                  <input
                    type="text"
                    name="Department"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'Security'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Office</h1>
                  <input
                    type="text"
                    name="Office"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'Ikeja office'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Office Location</h1>
                  <input
                    type="text"
                    name="OfficeLocation"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'Ikeja '}
                  />
                </div>
              </div>
              <div className={styles.bottom}>
                <button className="saveBtn">Save</button>
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
                    defaultValue={'-90'}
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
                    defaultValue={'-183'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 2 - Latitude / X</h1>
                  <input
                    type="number"
                    name="P2x"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'-95'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 2 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P2y"
                    defaultValue={'-183'}
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
                    defaultValue={'-91'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 3 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P3y"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'-186'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 4 - Latitude / X</h1>
                  <input
                    type="number"
                    name="P4x"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'-98'}
                  />
                </div>
                <div className={styles.formInput}>
                  <h1>Point 4 - Longitude / Y</h1>
                  <input
                    type="number"
                    name="P4y"
                    //   placeholder="Enter your username"
                    onChange={handleChange}
                    defaultValue={'-188'}
                  />
                </div>
              </div>
              <div className={styles.bottom}>
                <button className="saveBtn">Save</button>
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
                  <button className="saveBtn">Save</button>
                </div>
              </section>

              {!locationAccess && (
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
                        <div className={styles.colomn} onClick={() => handleItemClick(user.userId)}>
                          <h1>{user.userId}</h1>
                          <h1>{user.staffName}</h1>
                          <span style={{
                            backgroundColor: formData.AccessRequestUserIds?.includes(user.userId) ? 'red' : '#08BA8F'
                          }}>{formData.AccessRequestUserIds?.includes(user.userId) ? 'Revoke' : 'Add'}</span>
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

export default EditLocation;
