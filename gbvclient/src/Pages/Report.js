import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast, ToastContainer}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';




import "./Page.css";






const Report = () => {
  const [selectedModeId, setSelectedModeId] = useState(""); // State variable to store the selected Mode of Violence ID
  const [modeOptions, setModeOptions] = useState([]); // State variable to store the options for Mode of Violence

  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState(""); // State variable to store the selected Age Group ID
  const [ageGroupOptions, setAgeGroupOptions] = useState([]); // State variable to store the options for Age Group

  const [selectedGenderId, setSelectedGenderId] = useState(""); // State variable to store the selected Mode of Violence ID
  const [genderOptions, setGenderOptions] = useState([]); // State variable to store the options for Mode of Violence



  

  const [description, setDescription] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null); // State variable to store the selected coordinates
 
  const [isLocationCaptured, setIsLocationCaptured] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);




  const [toastShown, setToastShown] = useState(false);

  

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const [followError, setFollowError] = useState(null);

 


  const [showAnonymousSnackbar, setShowAnonymousSnackbar] = useState(true);

//Render the Toastify component once during the initial mount
useEffect(()=>{
  const handleYes = () => {
    toast.dismiss(toastId);
  };
  
  const handleNo = () => {
    toast.dismiss();
  };
  
  const toastId = toast(
    <div>
      <p>Would you like the reported incident to be followed up?...Click No if you already submitted details</p>
      <Link to="/CreateUser" onClick={handleYes}>
          <Button variant="contained" color="primary" style={{ marginRight: '4px' }}>
            Yes
          </Button>
        </Link>
        <Button variant="contained" color="secondary" onClick={handleNo}>
          No
        </Button>
    </div>,
    {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      toastId: 'Report1'
    }
  );

    // Cleanup function to dismiss the Toastify component when the component is unmounted
    // return () => toast.dismiss("Report1");
},[])




  useEffect(() => {
    // Fetch Metadata: Mode of Violence
    axios
      .get("http://localhost:3001/hakisha/entry/getModeOfViolence")
      .then((response) => {
        setModeOptions(response.data); // Assuming response.data contains the mode of violence data

        // Do something with modeOfViolence
      })
      .catch((error) => {
        console.error("Error fetching Mode of Violence:", error);
      });

    // Fetch Metadata: Age Group
    axios
      .get("http://localhost:3001/hakisha/entry/getAgeGroup")
      .then((response) => {
        setAgeGroupOptions(response.data); // Assuming response.data contains the age group data
        
        // Do something with ageGroup
      })
      .catch((error) => {
        console.error("Error fetching Age Group:", error);
      });
       // Fetch Metadata: Mode of Violence
    axios
    .get("http://localhost:3001/hakisha/entry/getGender")
    .then((response) => {
      setGenderOptions(response.data); // Assuming response.data contains the mode of violence data

      // Do something with modeOfViolence
    })
    .catch((error) => {
      console.error("Error fetching Mode of Violence:", error);
    });

    
    
  },[]);



  






  //A map refrence
  const mapRef = useRef(null);

 

 

  useEffect(() => {
    mapboxgl.accessToken =process.env.REACT_APP_API_MAPACESSTOKEN
      // "pk.eyJ1IjoiYmxhaXIzIiwiYSI6ImNscXF1MXViMTFncGUyanNiemw5dG4yYnEifQ.47Ev66QoNJcPyn0Xqaz_Vw";
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [39.86535, -3.51064], // Initial map center coordinates
      zoom: 9, // Initial zoom level
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());
    mapRef.current.scrollZoom.enable();

    mapRef.current.on("click", function (e) {
      const coordinates = e.lngLat;
      setSelectedCoordinates([coordinates.lng, coordinates.lat]);
      setIsLocationCaptured(true);

      setSelectedCoordinates([coordinates.lng, coordinates.lat])
      setIsLocationCaptured(true);
    });

    return () => mapRef.current.remove();
  }, []); // Empty dependency array ensures this runs only once during mount


    // Add a marker to the map based on the selectedCoordinates state
    useEffect(() => {
      if (selectedCoordinates) {
        const marker = new mapboxgl.Marker()
          .setLngLat(selectedCoordinates)
          .addTo(mapRef.current);
  
        return () => {
          marker.remove();
        };
      }
    }, [selectedCoordinates]);


    const handleFormSubmit = () => {
      if (isLocationCaptured) {
        const incidentdata = {
          latitude: selectedCoordinates[1],
          longitude: selectedCoordinates[0],
          description: description,
          violenceMode: selectedModeId,
          gender: selectedGenderId,
          ageGroup: selectedAgeGroupId,
         
        };
    
        // Check if a token exists in the local storage
        const token = localStorage.getItem('token');
    
        // Set the Authorization header if a token exists
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
        axios
          .post("http://localhost:3001/hakisha/incident/", incidentdata, { headers })
          .then(() => {
            // setSelectedModeId("");
            // setSelectedAgeGroupId("");
            setDescription("");
            setSelectedCoordinates(null);
            setIsLocationCaptured(false);
            setFormSubmitted(true);
            setError(null);
            console.log("incident submitted successfully!");
          })
          .catch((error) => {
            setError(error.message);
            console.error("Error submitting report:", error);
          });
      } else {
        setError("Location data not available. Cannot submit the form.");
        console.error("Location data not available. Cannot submit the form.");
      }
    };


  useEffect(() => {
  
  }, [])

  return (
       
    <div className="report-div">
            
      <div>
      <ToastContainer />
      </div>
      <form className="form-report">

        <h3>Report!</h3>
        <div className="reportmetadatatop">
        <label  className="reportLabel">
          Mode of violence:
          <select
            value={selectedModeId}
            onChange={(e) => setSelectedModeId(e.target.value)}
          >
            <option value="">Select...</option>
            {modeOptions.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.Mode}
              </option>
            ))}
          </select>
        </label>
        <label className="reportLabel" >
          Victims Age group:
          <select
            value={selectedAgeGroupId}
            onChange={(e) => setSelectedAgeGroupId(e.target.value)}
          >
            <option value="">Select...</option>
            {ageGroupOptions.map((group) => (
              <option key={group.id} value={group.id}>
                {group.AgeGroup}
              </option>
            ))}
          </select>
          
        </label>
        <label className="reportLabel" >
          Gender
          <select
            value={selectedGenderId}
            onChange={(e) => setSelectedGenderId(e.target.value)}
          >
            <option value="">Select...</option>
            {genderOptions.map((group) => (
              <option key={group.id} value={group.id}>
                {group.Gender}
              </option>
            ))}
          </select>
          
        </label>
        </div>
        <h3>Select location</h3>
        <div
          id="map"
          style={{
            width: "80vw",
            height: "70vh",
            cursor: "pointer",
            marginBottom: "5px",
          }}
        ></div>
        {!isLocationCaptured && !formSubmitted && (
          <p style={{ color: "Orange" }}>
            Location data not available. Please click on where<br></br> the
            incident occurred on the map first.
          </p>
        )}
        <label>Description of the incident:</label>
        <textarea
          
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        {formSubmitted &&(
          <div>
            {/* Displayed after form submission */}
            <p style={{ color: "green" }}>Report submitted successfully!</p>
           
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Main form submission button */}
        {!formSubmitted && (
          <div className="button-container">
            <button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              disabled={!isLocationCaptured}
            >
              Submit Report
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Report;
