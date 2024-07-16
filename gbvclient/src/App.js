import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidenav from './Components/Sidenav';
import Home from './Pages/Home';
import Report from './Pages/Report'
import "./App.css"
import { Dashboard } from './Pages/Dashboard';

import {User}  from "./Pages/User/User"
import { EditProfileDetails } from './Pages/User/EditUserProfile';
import { CreateProfileComponent } from './Pages/User/CreateUserProfile';
import { SelectCases} from './Pages/Chat/SelectCases';
import { MyChats} from './Pages/Chat/Mychats';
import {Login} from './Pages/User/LogIn'
import { LogOut } from './Pages/User/LogOut';

import { CreateUser } from './Pages/User/CreateUser';


import { MetaDataEntry } from './Pages/User/SuperManager/MetaDataEntry';
import { CreateSuperProfile } from './Pages/User/SuperManager/CreateSuperProfile';
import OTPInput from './Pages/User/ActivateUser';
import PasswordReset from './Pages/PasswordReset';
import PasswordResetEmail from './Pages/PasswordResetEmail';
import ManageUsers from './Pages/User/SuperManager/ManangeUsers';
import AssignComponent from './Pages/User/SuperManager/Assignment';
import { Feedbackchat } from './Pages/Chat/FeedbackChat';


function App() {
  return (
    <div className="grid-container">
    <Router>
      
        {/* <Nav/> */}
        <div className='item1'>
        <Header />
        </div>
        
       
        <div className='item2'><Sidenav /></div>
        <div className="item3">
          
          
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/Report" element={< Report/>} />
            <Route path="/Dashboard" element={< Dashboard/>} />
            <Route path="/User" element={< User/>} />
            <Route path="/CreateUser" element={< CreateUser/>} />
            <Route path="/CreateProfile" element={< CreateProfileComponent/>} />
            <Route path="/ActivateUser" element={< OTPInput/>} />
            <Route path="/EditProfile" element={< EditProfileDetails/>} />
            <Route path="/FilterCases" element={< SelectCases/>} />
            <Route path="/MyChats" element={< MyChats/>} />
            <Route path="/Feedbackchats" element={< Feedbackchat/>} />
            <Route path="/createSuperProfile" element={< CreateSuperProfile/>} />
            <Route path="/MetaDataEntry" element={< MetaDataEntry/>} />
            <Route path="/ManageUsers" element={< ManageUsers/>} /> 
            <Route path="/Assign" element={< AssignComponent/>} />                   
            <Route path="/Login" element={< Login/>} />
            <Route path="/SubmitPasswordResetEmail" element={< PasswordResetEmail/>} />
            <Route path="/ResetPassword" element={< PasswordReset/>} />
            <Route path="/LogOut" element={< LogOut/>} />
            
            {/* Add other routes here */}
          </Routes>
          
        </div>
        <div className='item4'></div>
        <div className='item5'>
        <Footer />
        </div>
        
        
      
    </Router>
    </div>
  );
  // return (
  //   <div className="App">
  //     <Header />
  //     <Sidenav />
  //     <Switch>
  //     <Route path="/" element={<Home />} />
  //           <Route path="/Report" element={< Report/>} />
  //           <Route path="/Dashboard" element={< Dashboard/>} />
  //           <Route path="/User" element={< User/>} />
  //           <Route path="/CreateUser" element={< CreateUser/>} />
  //           <Route path="/ActivateUser" element={< OTPInput/>} />
  //           <Route path="/EditProfile" element={< EditProfileDetails/>} />
  //           <Route path="/CouncelorChat" element={< CouncelorChatComponent/>} />
  //           <Route path="/SupportSeekerChat" element={< SupportSeekerChatScreen/>} />
  //           <Route path="/createSuperProfile" element={< CreateSuperProfile/>} />
  //           <Route path="/MetaDataEntry" element={< MetaDataEntry/>} />
  //           <Route path="/Login" element={< Login/>} />
  //           <Route path="/LogOut" element={< LogOut/>} />
  //     </Switch>
  //     <Footer />
  //   </div>
  // );

}

export default App;