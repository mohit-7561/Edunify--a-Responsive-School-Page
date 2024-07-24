// pages/addSchool.jsx
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../styles/addSchool.module.css";

const addSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all form data to FormData object
    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image[0]); // Append the image file
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post("/api/schools", formData);
      alert(response.data.message);
      reset();
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the school. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className={styles.textDanger}>{errors.name.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            className={styles.input}
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <div className={styles.textDanger}>{errors.address.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            className={styles.input}
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <div className={styles.textDanger}>{errors.city.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="state">
            State
          </label>
          <input
            id="state"
            type="text"
            className={styles.input}
            {...register("state", { required: "State is required" })}
          />
          {errors.state && (
            <div className={styles.textDanger}>{errors.state.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="zip">
            ZIP
          </label>
          <input
            id="zip"
            type="text"
            className={styles.input}
            {...register("zip")}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact">
            Contact
          </label>
          <input
            id="contact"
            type="number"
            className={styles.input}
            {...register("contact", { required: "Contact is required" })}
          />
          {errors.contact && (
            <div className={styles.textDanger}>{errors.contact.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email_id">
            Email
          </label>
          <input
            id="email_id"
            type="email"
            className={styles.input}
            {...register("email_id", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email_id && (
            <div className={styles.textDanger}>{errors.email_id.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="image">
            Image
          </label>
          <input
            id="image"
            type="file"
            className={styles.input}
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <div className={styles.textDanger}>{errors.image.message}</div>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Add School
        </button>
      </form>
    </div>
  );
};

export default addSchool;
