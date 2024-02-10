import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "@emotion/react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [state, setState] = useState({
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
    loading: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, loading: true });

    const newUserData = {
      schoolName: state.schoolName,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };

    try {
      const response = await axios.post("/signup", newUserData);
      localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
      setState({ ...state, loading: false });
      navigate("/");
    } catch (error) {
      setState({
        ...state,
        errors: error.response.data,
        loading: false,
      });
    }
  };

  const { errors, loading } = state;

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={theme.components.AuthContainer}
    >
      <div>
        <Avatar variant="rounded">Ontomo</Avatar>
      </div>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form noValidate>
        <div style={theme.components.AuthForm}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="schoolName"
            label="School Name"
            name="schoolName"
            autoComplete="schoolName"
            helperText={errors.schoolName}
            error={errors.schoolName ? true : false}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </form>
    </Container>
  );
};

export default Signup;
