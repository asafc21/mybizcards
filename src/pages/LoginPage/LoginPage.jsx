import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Button, CssBaseline, TextField } from "@mui/material";
import { FormControlLabel, Checkbox, Paper, Box } from "@mui/material";
import { Grid, Typography, Alert } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import loginContext from "../../store/loginContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  validateEmailLogin,
  validatePasswordLogin,
} from "../../validation/loginValidation";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const { login, setLogin } = useContext(loginContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let stayLoggedIn = false;
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataFromJoi = validateEmailLogin({ email: emailValue });
      console.log("dataFromJoi", dataFromJoi);
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      console.log(data);
      localStorage.setItem("token", data);
      if (stayLoggedIn) localStorage.setItem("remember_me", true);
      const decoded = jwtDecode(data);
      console.log("decoded", decoded);
      setLogin(decoded);
      toast.success("🦄 Logged in Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err);
      setLogin(null);
      toast.error("🦄 Login Failed, try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.clear();
    }
  };
  const handleEmailBlur = () => {
    let dataFromJoi = validateEmailLogin({ email: emailValue });
    console.log("dataFromJoi", dataFromJoi);
    if (dataFromJoi.error) {
      setEmailError(dataFromJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };
  const handlePasswordBlur = () => {
    let dataFromJoi = validatePasswordLogin({ password: passwordValue });
    console.log("dataFromJoi", dataFromJoi);
    if (dataFromJoi.error) {
      setPasswordError(dataFromJoi.error.details[0].message);
    } else {
      setPasswordError("");
    }
  };
  const handleSaveLogin = (e) => {
    stayLoggedIn = e.target.checked;
  };
  if (login) {
    navigate(ROUTES.HOME);
  }
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            {emailError && <Alert severity="error">{emailError}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleSaveLogin}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={emailError || passwordError}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link style={{ textDecoration: "none" }} to={ROUTES.REGISTER}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
