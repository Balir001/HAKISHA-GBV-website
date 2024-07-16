
// import {useState,useEffect} from "react"
import { ClusterMap } from "./ClusterMAp"
import GenderPieChart from "./Piecharts/GenderPieChart"
import ModeOfViolencePieChart from "./Piecharts/ModeOfViolencePieChart"
import AgeGroupPieChart from "./Piecharts/AgeGroupPie.Chart"
// import AgeGroupModeOfViolencePieChart from "../piecharts/advancedanalysis"
// import GenderAgeGroupPieChart from "../piecharts/advancedanalysis1"
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import the main object
import "./Page.css"

export const Dashboard=()=>{

    useEffect(() => {
        // This code will run when the component mounts (page change)
        const toastId = toast('Welcome to the Dashboard!', { autoClose: true, toastId: 'success1' });
    
        // Clean up function to dismiss 'success1' toast when the component unmounts (page change)
        return () => {
          toast.dismiss("sucess1"); // Dismisses the toast with the given toastId
        };
      }, []);
    
    return(
        <div className="Dashboard">
          <div className="dashboard-grid-container">
            <ToastContainer />

           <div className="grid-item item-head"><h1 className="Dashboard">Dashboard</h1></div> 

           
        
        <div className="grid-item item-map">
            
            <div ><h2>Distribution of  GBV Cases Across Kilifi County</h2></div>
         <ClusterMap/>
       
        </div>
        
        <div className="grid-item item-gender">
        <GenderPieChart/>
        </div>
        <div className="grid-item item-ageGroup">
        <AgeGroupPieChart/>
        </div>
        <div className="grid-item item-modeOfViolence">
        <ModeOfViolencePieChart/>
        </div>
        <div className="grid-item item-empty">
        
        </div>

       
        
        </div>
        </div>
    )

}