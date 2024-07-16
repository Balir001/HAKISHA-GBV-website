import React, { useState } from 'react';
import { usePostData } from '../../../CustomHook/posthooks';
import Button from '@mui/material/Button';

export const AgeGroupEntry = () => {
    const [ageGroup, setAgeGroup] = useState(""); // State to hold the input value

    const { data, loading, error,postData } = usePostData("entry/ageGroup");

    const handleInputChange = (event) => {
        setAgeGroup(event.target.value); // Update the input value as the user types
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Here you can call your API function to submit the input value
        // Example: postData(inputValue);
        postData({ ageGroup });
        console.log("Submitted value:", ageGroup);
    };

    return (
        <div>
            
            <h3>Enter Age Group</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="inputField"
                        name="inputField"
                        value={ageGroup}
                        onChange={handleInputChange} // Call handleInputChange on input change
                    />
                         <Button variant="contained" color="primary" type="submit">
         Submit
      </Button>
                </form>
            </div>
        </div>
    );
};
