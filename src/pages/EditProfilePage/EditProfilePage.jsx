import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent.jsx";
import Grid from "@mui/material/Grid";
import loginContext from "../../store/loginContext.js";
import ROUTES from "../../routes/ROUTES.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import normalizeEditProfile from "../EditProfilePage/normalizeEditProfile.js";
import { validateSchema } from "../../validation/registerValidation.js";

const EditProfilePage = () => {
  const { login } = useContext(loginContext);
  const navigate = useNavigate();

  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});
  const labels = {
    first: "First Name",
    middle: "Middle Name",
    last: "Last Name",
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
  const requiredFields = [
    "first",
    "last",
    "phone",
    "url",
    "alt",
    "country",
    "city",
    "street",
    "houseNumber",
    "zip",
  ];

  useEffect(() => {
    axios
      .get("/users/" + login._id)
      .then(({ data }) => {
        setInputsValue({
          first: data.name.first,
          middle: data.name.middle,
          last: data.name.last,
          phone: data.phone,
          url: data.image.url,
          alt: data.image.alt,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        });
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, [login._id]);

  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    if (["state", "middle"].includes(e.target.id)) return;
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

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "/users/" + login._id,
        normalizeEditProfile(inputsValue),
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Profile Updated Successfully", {
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
    }
  };

  return (
    <Box
      sx={{ textAlign: "center", mb: 8 }}
      component="form"
      onSubmit={handleProfileEdit}
    >
      <h1>Edit Profile</h1>
      <Grid container spacing={2}>
        {Object.keys(inputsValue).map((item) => (
          <TextInputComponent
            key={"inputs" + item}
            id={item}
            label={labels[item]}
            required={requiredFields.includes(item)}
            autoFocus={item === "first"}
            value={inputsValue[item]}
            onChange={handleInputsChange}
            onBlur={handleBlur}
            errors={errors[item]}
          />
        ))}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={Object.keys(errors).length > 0}
      >
        Send
      </Button>
    </Box>
  );
};
export default EditProfilePage;
