import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, useMediaQuery } from "@mui/material/";
import { useContext } from "react";
import { SearchContext } from "../store/searchContext.js";

const CRMPage = () => {
  const [users, setUsers] = useState([]);
  const isMobile = useMediaQuery("(max-width:800px)");
  const { search } = useContext(SearchContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      await axios.patch("/users/" + id, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const response = await axios.get("/users", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setUsers(response.data);
    } catch (error) {
      console.log("error from axios", error);
    }
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 8 }}>
      <Typography textAlign={"center"} variant="h1" color="primary">
        CRM
      </Typography>
      <Typography textAlign={"center"} my={2} variant="h4" color="primary">
        change user's business status
      </Typography>
      <TableContainer
        sx={{
          maxWidth: isMobile ? "550px" : "700px",
          mx: "auto",
          overflow: isMobile ? "hidden" : "unset",
        }}
        component={Paper}
      >
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ display: isMobile ? "none" : "table-cell" }}
                align="center"
              >
                User
              </TableCell>
              <TableCell align="center">Email </TableCell>
              <TableCell align="center">Business?</TableCell>
              <TableCell align="center">Change Users Business Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((item) => item.email.includes(search))
              .map((user, index) => (
                <TableRow
                  key={"user" + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ display: isMobile ? "none" : "table-cell" }}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {`${user.name.first} ${user.name.middle} ${user.name.last}`}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.isBusiness ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handleChangeStatus(user._id);
                      }}
                      variant="contained"
                    >
                      Change
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CRMPage;
