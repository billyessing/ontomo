import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  CircularProgress,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Meeting from "../components/meeting";
import { authMiddleWare } from "../util/auth";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [uiLoading, setUiLoading] = useState(true);

  const logoutHandler = () => {
    localStorage.removeItem("AuthToken");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        const response = await axios.get("/user");
        const userCredentials = response.data.userCredentials;

        authMiddleWare(navigate);
        setSchoolName(userCredentials.schoolName);
        setProfilePicture(userCredentials.imageUrl);
        setUiLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/login");
        } else {
          console.log(error);
          // handle other errors
        }
      }
    };

    fetchData();
  }, [navigate]);

  if (uiLoading) {
    return (
      <CircularProgress
        size={theme.spacing(4)}
        sx={{
          position: "fixed",
          zIndex: "1000",
          left: "50%",
          top: "35%",
        }}
      />
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" anchor="left">
        <Toolbar disableGutters>
          <Avatar src={profilePicture} variant="rounded" />
          <Typography>{schoolName}</Typography>
        </Toolbar>
        <List>
          <ListItemButton key="Logout" onClick={logoutHandler}>
            <ListItemIcon sx={{ minWidth: 0, paddingRight: "16px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Meeting />
      </Box>
    </Box>
  );
};

export default Home;
