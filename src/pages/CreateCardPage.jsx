import Typography from "@mui/material/Typography";
import { Box, Grid, Button } from "@mui/material/";
import { useState } from "react";
import { validateEditCardSchema } from "../validation/editCardValidation";
import TextInputComponent from "../components/TextInputComponent";
import axios from "axios";
import { toast } from "react-toastify";
import normalizeEdit from "./EditCardPage/normalizeEdit";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CreateCardPage = () => {
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    url: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });
  const requiredFields = Object.keys(errors);

  const labels = {
    title: "Title",
    subtitle: "Subtitle",
    description: "Description",
    phone: "Phone",
    email: "Email",
    web: "Web",
    url: "Image URL",
    alt: "Image ALT",
    state: "State",
    country: "Country",
    city: "City",
    street: "Street",
    houseNumber: "House Number",
    zip: "ZIP",
  };
  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    if (["web", "alt", "state", "zip"].includes(e.target.id)) return;
    let dataFromJoi = validateEditCardSchema[e.target.id]({
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

  const handleNewCard = async () => {
    try {
      await axios.post("/cards/", normalizeEdit(inputsValue), {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      toast.success("Card Uploaded Successfully", {
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
      if (
        err.response.data ===
        `Mongoose Error: E11000 duplicate key error collection: business_card_app.cards index: email_1 dup key: { email: "${inputsValue.email}" }`
      ) {
        toast.error(
          "Email address already exists, please use a different one!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        my: 10,
      }}
    >
      <Typography
        variant="h2"
        color="primary"
        textAlign={"center"}
        sx={{ mb: "20px" }}
      >
        Create a New Business Card!
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(inputsValue).map((item) => (
          <TextInputComponent
            key={"inputs" + item}
            id={item}
            label={labels[item]}
            required={requiredFields.includes(item)}
            autoFocus={item === "title"}
            value={inputsValue[item]}
            onChange={handleInputsChange}
            onBlur={handleBlur}
            errors={errors[item]}
          />
        ))}
      </Grid>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={Object.keys(errors).length > 0}
        onClick={handleNewCard}
      >
        Upload a new Business Card
      </Button>
    </Box>
  );
};

export default CreateCardPage;
