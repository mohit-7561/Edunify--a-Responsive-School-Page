import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ShowSchools.module.css";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);

  // useEffect hook to fetch school data when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/schools");
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>School Records</h1>
      {schools.map((school) => (
        <div key={school.id} className={styles.schoolCard}>
          {school.image && (
            <img
              src={`/schoolImages/${school.image}`}
              alt={school.name}
              className={styles.schoolImage}
            />
          )}
          <div className={styles.schoolDetails}>
            <div className={styles.schoolName}>{school.name}</div>
            <div className={styles.schoolDetail}>
              <strong>Address:</strong> {school.address}
            </div>
            <div className={styles.schoolDetail}>
              <strong>City:</strong> {school.city}
            </div>
            <div className={styles.schoolDetail}>
              <strong>State:</strong> {school.state}
            </div>
            <div className={styles.schoolDetail}>
              <strong>ZIP:</strong> {school.zip}
            </div>
            <div className={styles.schoolDetail}>
              <strong>Contact:</strong> {school.contact}
            </div>
            <div className={styles.schoolDetail}>
              <strong>Email:</strong> {school.email_id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowSchools;
