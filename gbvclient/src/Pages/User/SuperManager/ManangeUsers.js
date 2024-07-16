import React, { useState } from "react";
import { usePostData } from "../../../CustomHook/posthooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material"; // Import Tooltip for hints
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const ManageUsers = () => {
  const [email, setEmail] = useState("");

  //navigate to assignComponent
  const navigate=useNavigate();   

  const { loading, error, postData, data } = usePostData(
    "/user/searchUserByEmail"
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await postData({ email });
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  const handleEdit = () => {
    //navigate to assignment component
    navigate("/Assign", { state: data })
    
  };

  const handleOnDelete=()=>{

  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="EditUser">
      <TextField
        id="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <TableContainer style={{ maxWidth: "95vw" }}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell>
                  <h3>Email</h3>
                </TableCell>
                <TableCell>
                  <h3>First Name</h3>
                </TableCell>
                <TableCell>
                  <h3>Last Name</h3>
                </TableCell>
                <TableCell>
                  <h3>Gender</h3>
                </TableCell>
                <TableCell>
                  <h3>PhoneNumber</h3>
                </TableCell>
                <TableCell>
                  <h3>Role</h3>
                </TableCell>
                <TableCell>
                  <h3>Specialization</h3>
                </TableCell>
                <TableCell>
                  <h3>Organization</h3>
                </TableCell>
                <TableCell>
                  <h3>Actions</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={data.id}>
                <TableCell>{data.Email}</TableCell>
                <TableCell>{data.Profile.firstName}</TableCell>
                <TableCell>{data.Profile.lastName}</TableCell>
                <TableCell>
                  {data.Profile.Gender ? data.Profile.Gender.Gender : "-"}
                </TableCell>
                <TableCell>{data.Profile.phoneNumber}</TableCell>
                <TableCell>
                  {data.Profile.Role ? data.Profile.Role.Role : "-"}
                </TableCell>
                <TableCell>
                  {data.Profile.Specialization
                    ? data.Profile.Specialization.type
                    : "-"}
                </TableCell>
                <TableCell>
                  {data.Profile.Organization
                    ? data.Profile.Organization.Name
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="editUserFunctions">
                    <Tooltip title="Edit">
                      <IconButton onClick={handleEdit}  >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="delete">
                      <IconButton>
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageUsers;
