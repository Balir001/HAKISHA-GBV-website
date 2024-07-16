import React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
const useStyles = makeStyles({
  root: {
    '& .MuiTableRow-root:nth-child(even)': {
      backgroundColor: '#f5f5f5', // Adjust the background color as needed
    },
  },
});

export const CasesTable = ({ data, handleClose, handleChat }) => {
  const classes = useStyles();

  return (
    <TableContainer style={{maxWidth:"calc(100vw - 32px)"}}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell><h3>Avatar</h3></TableCell>
            <TableCell><h3>First Name</h3></TableCell>
            <TableCell><h3>Last Name</h3></TableCell>
            <TableCell><h3>Gender</h3></TableCell>
            <TableCell><h3>Description</h3></TableCell>
            <TableCell><h3>Email</h3></TableCell>
            <TableCell><h3>PhoneNumber</h3></TableCell>
            <TableCell><h3>Actions</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell>
                <Avatar src={profile.avator} alt={profile.firstName} />
              </TableCell>
              <TableCell>{profile.firstName}</TableCell>
              <TableCell>{profile.lastName}</TableCell>
              <TableCell>{profile.Gender.Gender}</TableCell>
              <TableCell>
                {profile.User.Incidents.map((incident) => (
                  <p key={incident.id}>{incident.description}</p>
                ))}
              </TableCell>
              <TableCell>{profile.User.Email}</TableCell>
              <TableCell>{profile.phoneNumber}</TableCell>
              <TableCell>
              <Button onClick={() => handleChat(profile)} style={{ marginBottom: '4px' }} variant="contained" color="primary">
        Chat
      </Button>
      {/* <Button onClick={() => handleClose(profile)} variant="contained" color="secondary">
        Close
      </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};