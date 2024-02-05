import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import normalizeRegister from "./normalizeRegister";
import { toast } from "react-toastify";
import { validateSchema } from "../../validation/registerValidation";
import TextInputComponent from "../../components/TextInputComponent";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: false,
  });
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const labels = {
    first: "First Name",
    middle: "Middle Name",
    last: "Last Name",
    email: "Email",
    password: "Password",
    phone: "Phone",
    url: "URL",
    alt: "Alt",
    state: "State",
    country: "Country",
    city: "City",
    street: "Street",
    houseNumber: "House Number",
    zip: "ZIP",
  };

  let keysArray = Object.keys(inputsValue).filter(
    (key) => key !== "isBusiness"
  );
  let keysArrayErrors = Object.keys(errors);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("/users", normalizeRegister(inputsValue));
      toast.success("🦄 Registered Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err);
      toast.error("🦄 Registration Failed, try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    if (["middle", "alt", "state", "url"].includes(e.target.id)) return;
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (dataFromJoi.error) {
      setErrors((copyOfErrors) => ({
        ...copyOfErrors,
        [e.target.id]: dataFromJoi.error.details[0].message,
      }));
    } else {
      setErrors((copyOfErrors) => {
        delete copyOfErrors[e.target.id];
        return { ...copyOfErrors };
      });
    }
  };
  const handleBusinessAccountChange = (e) => {
    setInputsValue((prevState) => ({
      ...prevState,
      isBusiness: e.target.checked,
    }));
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 10,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((item) => (
            <TextInputComponent
              key={"inputs" + item}
              id={item}
              label={labels[item]}
              type={item === "password" ? "password" : "text"}
              required={keysArrayErrors.includes(item)}
              autoFocus={item === "first"}
              value={inputsValue[item]}
              onChange={handleInputsChange}
              onBlur={handleBlur}
              errors={errors[item]}
            />
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  onChange={handleBusinessAccountChange}
                />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link style={{ textDecoration: "none" }} to={ROUTES.LOGIN}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
