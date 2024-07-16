import React, { useState } from 'react';
import { usePostData } from '../../../CustomHook/posthooks';
import Button from '@mui/material/Button';

export const ModeOfViolenceEntry = () => {
    const [mode, setMode] = useState(""); // State to hold the input value

    const { data, loading, error ,postData} = usePostData("/entry/ModeOfViolence");

    const handleInputChange = (event) => {
        setMode(event.target.value); // Update the input value as the user types
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Here you can call your API function to submit the input value
        // Example: postData(inputValue);
        postData({ mode });
        console.log("Submitted value:", mode);
    };

    return (
        <div>
            
            <h3>Enter Mode Of Violence</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="inputField"
                        name="inputField"
                        value={mode}
                        onChange={handleInputChange} // Call handleInputChange on input change
                    />
               {loading && <p>Loading...</p>}
      {data && (
       <div className=''> <b>Message:</b> <p style={{color:"green", display:"inline"}}>{data}</p></div> 
      )}
      {error && (
        <p>Error: {error}</p>
      )}


                                <Button variant="contained" color="primary" type="submit">
         Submit
      </Button>
                </form>
            </div>
        </div>
    );
};
