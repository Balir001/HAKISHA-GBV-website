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

export const Feedbacktable = ({ data, handleClose, handleChat }) => {
  const classes = useStyles();

  return (
    <TableContainer style={{ maxWidth: "calc(100vw - 32px)" }}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className="table-header">
            <TableCell>
              <h3>Avatar</h3>
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
              <h3>Email</h3>
            </TableCell>
            <TableCell>
              <h3>PhoneNumber</h3>
            </TableCell>
            <TableCell>
              <h3>Actions</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar src={user.Profile.avatar} alt={user.Profile.firstName} />
              </TableCell>
              <TableCell>{user.Profile.firstName}</TableCell>
              <TableCell>{user.Profile.lastName}</TableCell>
              <TableCell>{user.Profile.Gender.Gender}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Profile.phoneNumber}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleChat(user)}
                  style={{ marginBottom: '4px' }}
                  variant="contained"
                  color="primary"
                >
                  Chat
                </Button>
                {/* <Button onClick={() => handleClose(user)} variant="contained" color="secondary">
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