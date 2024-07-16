import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Avatar } from "@mui/material";
import { useGetData } from "../../CustomHook/GetHook";
import { usePostData } from "../../CustomHook/posthooks";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';


export const CreateProfileComponent = () => {
  const navigate = useNavigate();
  const [genderOptions, setGenderOptions] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  
  const { data: options, loading: optionsLoading, error: optionsError } = useGetData('/entry/getGender');
  const { data:userProfileData, loading, error, postData } = usePostData('user/createProfile');

  useEffect(() => {
    if (userProfileData) {

       // Display a toast
       toast.success("Profile Creation Success!");


       // Navigate after a delay to give time for the user to see the toast
       setTimeout(() => {
        navigate("/User");
      }, 3000); // 2000 milliseconds = 2 seconds
    }
  }, [userProfileData, navigate]);
 
  

  useEffect(() => {
    if (options) {
      setGenderOptions(options);
    }
  }, [options]);
 
  // console.log(userProfileData)
  // console.log(error)
  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append all form fields to the FormData object
    for (const [key, value] of Object.entries(values)) {
      if (key === "avatar" && value) {
        // Append the file to the FormData object only if it exists
        formData.append(key, value, value.name);
      } else {
        // Append other fields as strings
        formData.append(key, value);
      }
    }

    try {
      await postData(formData);
      // Set the success message and successfulCreation to true after successful profile creation
      

      
     
     
    } catch (error) {
      // Handle error
      console.error("Error creating profile:", error);
      
    }
  };

 

  // Authorization form schema
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    middleName: yup.string().nullable(),
    dateOfBirth: yup.date().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    phoneNumber: yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits"),
    avatar: yup.mixed().nullable()
      .test(
        "fileType",
        "Unsupported File Format",
        value => !value || /\.(jpg|jpeg|png)$/i.test(value?.name || "")
      )
      .test(
        "fileSize",
        "File too large",
        value => !value || (value.size && value.size <= 2000000) // 2MB max
      ),
  });

  // Initialize form values
  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    avatar: "", // Initialize avatar field
  };

  if (optionsLoading) {
    return <div>Loading ...</div>;
  }

  if (optionsError) {
    return <div>Error fetching gender options: {optionsError}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error ) {
    return <div>Error: {error}</div>;
  }
 
  
 
 

  return (
    <div className="Create-Profile">
      <ToastContainer />
      <h2>Create Profile</h2>
     
      
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div style={{ position: "relative" }}>
              {/* Avatar Image */}
              <Avatar
                src={selectedAvatar || "/default-avatar.png"}
                alt={`${values.firstName} ${values.lastName}`}
                style={{ width: 150, height: 150 }}
                variant="circular"
              />
              {/* Clickable Image (Overlay) */}
              <label htmlFor="avatar" style={{ position: "absolute", top: 0, left: 0 }}>
                <img
                  src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"
                  alt="Upload Avatar"
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
              </label>
              {/* Actual File Input (Hidden) */}
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("avatar", file);
                  setSelectedAvatar(URL.createObjectURL(file));
                }}
              />
            </div>
            {/* Other Form Fields */}
            <div>
              {/* First Name */}
              <label htmlFor="firstName">First Name</label>
              <ErrorMessage name="firstName" component="span" className="error" />
              <Field type="text" id="firstName" name="firstName" />
            </div>
            <div>
              {/* Last Name */}
              <label htmlFor="lastName">Last Name</label>
              <ErrorMessage name="lastName" component="span" className="error" />
              <Field type="text" id="lastName" name="lastName" />
            </div>
            <div>
              {/* Middle Name */}
              <label htmlFor="middleName">Middle Name</label>
              <Field type="text" id="middleName" name="middleName" />
            </div>
            <div>
              {/* Date of Birth */}
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <ErrorMessage name="dateOfBirth" component="span" className="error" />
              <Field type="date" id="dateOfBirth" name="dateOfBirth" />
            </div>
            <div>
              {/* Gender */}
              <label htmlFor="gender">Gender</label>
              <ErrorMessage name="gender" component="span" className="error" />
              <Field as="select" id="gender" name="gender">
                <option value="">Select Gender</option>
                {genderOptions.map(gender => (
                  <option key={gender.id} value={gender.id}>
                    {gender.Gender}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              {/* Phone Number */}
              <label htmlFor="phoneNumber">Phone Number</label>
              <ErrorMessage name="phoneNumber" component="span" className="error" />
              <Field type="text" id="phoneNumber" name="phoneNumber" />
            </div>
            {/* Submit Button */}
            <Button className="submit-button" type="submit" disabled={isSubmitting} variant="contained" color="primary">
      Create
    </Button>
            <div>{userProfileData}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};