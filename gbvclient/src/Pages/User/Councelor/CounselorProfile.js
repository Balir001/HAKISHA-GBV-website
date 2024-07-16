import React from "react";
import { useNavigate } from 'react-router-dom';
import { Avatar } from "@mui/material";
import { useGetData } from "../../../CustomHook/GetHook";
import { useDeleteData } from "../../../CustomHook/DeleteHook";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material'; // Import Tooltip for hints


export const CounselorProfile = () => {

  const { data:deleteProfile,loading:loadingDeletion, error:erroDeleting, deleteData } = useDeleteData('/user/deleteProfile');
  const navigate = useNavigate();

  // Use your custom hook instead of useState and useEffect
  const { data: profile, loading, error } = useGetData('user/getProfile');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEditProfile=()=>{
    navigate("/EditProfile")
  }

  const handleDelete = async () => {
    // Implement delete functionality here
    // Call the deleteData function to initiate the deletion
    deleteData();
  };

  // Function to format date and time
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} date:${time} time`;
  };

  console.log(profile)

  return (
    <div className="Profile-viewing">
      
        <h5>Profile</h5>
        <h2>
          {/* Render the Avatar with the uploaded image or a default avatar */}
          <Avatar src={profile.avatar || '/default-avatar.png'} alt={`${profile.firstName} ${profile.lastName}`} style={{ width: 150, height: 150 }} />
          {profile.firstName} {profile.lastName}
          <br></br>
        </h2>
        <p>Created profile on: {formatDate(profile.createdAt)}</p>
        {profile.Role && (
          <div>
            <p>Role: {profile.Role.Role}</p>
            {/* Render other properties of the Role object if needed */}
          </div>
        )}
        {profile.Gender && (
          <div>
            <p>Gender: {profile.Gender.Gender}</p>
          </div>
        )}
        {profile.Specializations && (
          <div>
            <p>Specializations:</p>
            <ul>
              {profile.Specializations.map((specialization) => (
                <li key={specialization.id}>{specialization.type}</li>
              ))}
            </ul>
          </div>
        )}
        {profile.Organization && (
          <div>
            <p>Organization: {profile.Organization.Name}</p>
          </div>
        )}

<div>
      <Tooltip title="Edit">
      <IconButton sx={{ color: 'orange' }}  onclick={handleEditProfile} >
            <EditIcon />
          </IconButton>
          </Tooltip>

          <Tooltip title="delete" onclick={handleDelete}  >
          <IconButton >
            <DeleteIcon  sx={{ color: 'red' }} />
          </IconButton>
          </Tooltip>
    </div>
      
    </div>
  );
};