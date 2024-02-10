import { CloudUploadIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authMiddleWare } from "../util/auth";

// const useStyles = makeStyles((theme) => ({
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   toolbar: theme.mixins.toolbar,
//   root: {},
//   details: {
//     display: 'flex',
//   },
//   avatar: {
//     height: 110,
//     width: 100,
//     flexShrink: 0,
//     flexGrow: 0,
//   },
//   locationText: {
//     paddingLeft: '15px',
//   },
//   buttonProperty: {
//     position: 'absolute',
//     top: '50%',
//   },
//   uiProgess: {
//     position: 'fixed',
//     zIndex: '1000',
//     height: '31px',
//     width: '31px',
//     left: '50%',
//     top: '35%',
//   },
//   progess: {
//     position: 'absolute',
//   },
//   uploadButton: {
//     marginLeft: '8px',
//     margin: theme.spacing(1),
//   },
//   customError: {
//     color: 'red',
//     fontSize: '0.8rem',
//     marginTop: 10,
//   },
//   submitButton: {
//     marginTop: '10px',
//   },
// }));

const Account = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    schoolName: "",
    email: "",
    partnerSchools: [],
    profilePicture: "",
  });
  const [uiLoading, setUiLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    authMiddleWare(navigate);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          schoolName: response.data.userCredentials.schoolName,
          email: response.data.userCredentials.email,
          partnerSchools: response.data.userCredentials.partnerSchools,
        }));

        setUiLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate("/login");
        } else {
          console.log(error);
          setUiLoading(false);
        }
      });
  }, [navigate]);

  const handleChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      image: event.target.files[0],
    }));
  };

  const profilePictureHandler = (event) => {
    event.preventDefault();
    setUiLoading(true);
    authMiddleWare(navigate);
    const authToken = localStorage.getItem("AuthToken");
    let form_data = new FormData();
    form_data.append("image", user.image);
    form_data.append("content", user.content);
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .post("/user/image", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate("/login");
        } else {
          console.log(error);
          setUiLoading(false);
          setImageError("Error in posting the data");
        }
      });
  };

  const updateFormValues = (event) => {
    event.preventDefault();
    setButtonLoading(true);
    authMiddleWare(navigate);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const formRequest = {
      schoolName: user.schoolName,
    };
    axios
      .post("/user", formRequest)
      .then(() => {
        setButtonLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate("/login");
        } else {
          console.log(error);
          setButtonLoading(false);
        }
      });
  };

  if (uiLoading) {
    return (
      <main>
        <div />
        {uiLoading && <CircularProgress size={150} />}
      </main>
    );
  }

  return (
    <main>
      <div />
      <Card>
        <CardContent>
          <div>
            <div>
              <Typography gutterBottom variant="h4">
                {user.schoolName} {user.lastName}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                size="small"
                startIcon={<CloudUploadIcon />}
                onClick={profilePictureHandler}
              >
                Upload Photo
              </Button>
              <input type="file" onChange={handleImageChange} />

              {imageError ? (
                <div>
                  Wrong Image Format || Supported Format are PNG and JPG
                </div>
              ) : null}
            </div>
          </div>
          <div />
        </CardContent>
        <Divider />
      </Card>

      <br />
      <Card>
        <form autoComplete="off" noValidate>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="School name"
                  margin="dense"
                  name="schoolName"
                  variant="outlined"
                  value={user.schoolName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="dense"
                  name="email"
                  variant="outlined"
                  disabled
                  value={user.email}
                />
              </Grid>
              {user.partnerSchools ? (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Partner Schools"
                    margin="dense"
                    name="partnerSchools"
                    variant="outlined"
                    disabled
                    value={user.partnerSchools.join(", ")}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={buttonLoading}
              onClick={updateFormValues}
            >
              Save details
            </Button>
            {buttonLoading && <CircularProgress size={24} />}
          </CardActions>
        </form>
      </Card>
    </main>
  );
};

export default Account;
