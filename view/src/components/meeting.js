import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Slide,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@emotion/react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { authMiddleWare } from "../util/auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Meeting = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [_, setUser] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [uiLoading, setUiLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        const responseMeetings = await axios.get("/meetings");
        const responseUser = await axios.get("/user");

        setMeetings(responseMeetings.data);
        setUser(responseUser.data.userCredentials);

        setUiLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    authMiddleWare(navigate);
    event.preventDefault();
    const link = (await axios.post("create-room")).data.roomUrl;

    const userMeeting = {
      title: title,
      link: link,
    };
    let options = { url: "/meeting", method: "post", data: userMeeting };
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    try {
      await axios(options);
      setOpen(false);
      // Fetch the updated data and update the state
      const response = await axios.get("/meetings");
      setMeetings(response.data);
    } catch (error) {
      setOpen(true);
      setErrors(error.response.data);
      console.log(error);
    }
  };

  if (uiLoading) {
    return <CircularProgress size={theme.spacing(4)} />;
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="Add Meeting"
        onClick={() => setOpen(true)}
        size="medium"
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <AddIcon />
      </Fab>

      <Grid container spacing={2}>
        {meetings.map((meeting) => (
          <Grid item xs={12} key={meeting.meetingId}>
            <Card variant="outlined">
              <CardContent>
                <div style={{}}>{meeting.title}</div>
              </CardContent>
              <CardActions>
                <Button
                  href={meeting.link}
                  size="large"
                  color="primary"
                  target="_blank"
                >
                  Join
                  <OpenInNewIcon sx={{ height: "18px", width: "18px" }} />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>New meeting</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="groupTitle"
            label="Title"
            name="title"
            autoComplete="title"
            helperText={errors.title}
            value={title}
            error={errors.title ? true : false}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit} variant="contained">
            Create
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Meeting;
