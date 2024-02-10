import { useTheme } from "@emotion/react";

import {
  Avatar,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/login", userData);
      localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={theme.components.AuthContainer}
    >
      <Avatar variant="rounded">Ontomo</Avatar>
      <Typography variant="h1">Log in</Typography>
      <form noValidate style={{ width: "100%" }} onSubmit={handleSubmit}>
        <div style={theme.components.AuthForm}>
          {errors.general && <Typography>{errors.general}</Typography>}
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            placeholder="Enter your email address"
            autoFocus
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Log in
          </Button>
          <Link href="signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
