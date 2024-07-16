import React, { useState } from "react";
import { usePostData } from "../../../CustomHook/posthooks";
import Button from "@mui/material/Button";

export const SpecializationEntry = () => {
  const [specialization, setSpecialization] = useState(""); // State to hold the input value

  const { data, loading, error, postData } = usePostData(
    "/entry/Specialization"
  );

  const handleInputChange = (event) => {
    setSpecialization(event.target.value); // Update the input value as the user types
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Here you can call your API function to submit the input value
    // Example: postData(inputValue);
    postData({ specialization });
    console.log("Submitted value:", specialization);
  };

  return (
    <div>
      <h3>Enter Specialization</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="inputField"
            name="inputField"
            value={specialization}
            onChange={handleInputChange} // Call handleInputChange on input change
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>

          {loading && <p>Loading...</p>}
          {data && (
            <div className="">
              {" "}
              <b>Message:</b>{" "}
              <p style={{ color: "green", display: "inline" }}>{data}</p>
            </div>
          )}
          {error && <p>Error: {error}</p>}
        </form>
      </div>
    </div>
  );
};
