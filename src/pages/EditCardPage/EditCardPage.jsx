import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import Grid from "@mui/material/Grid";
import loginContext from "../../store/loginContext";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { validateEditCardSchema } from "../../validation/editCardValidation";
import Button from "@mui/material/Button";
import normalizeEdit from "./normalizeEdit";
import { toast } from "react-toastify";

const EditCardPage = () => {
  let { id } = useParams();
  const { login } = useContext(loginContext);
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

  const [errors, setErrors] = useState({});
  const requiredFields = [
    "title",
    "subtitle",
    "description",
    "phone",
    "email",
    "url",
    "country",
    "city",
    "street",
    "houseNumber",
    "zip",
  ];

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

  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setInputsValue({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          phone: data.phone,
          email: data.email,
          web: data.web,
          url: data.image.url,
          alt: data.image.alt,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        });
        if (
          !login.isAdmin &&
          (login._id !== data.user_id || !login.isBusiness)
        ) {
          navigate(ROUTES.HOME);
        }
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, [id, login._id, login.isAdmin, login.isBusiness, navigate]);

  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    if (["web", "alt", "state"].includes(e.target.id)) return;
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

  const handleCardEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/cards/" + id, normalizeEdit(inputsValue), {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      toast.success("Card Updated Successfully", {
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
        `Mongoose Error: Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: business_card_app.cards index: email_1 dup key: { email: "${inputsValue.email}" }`
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
      sx={{ textAlign: "center", mb: 8 }}
      component="form"
      onSubmit={handleCardEdit}
    >
      <h1>Edit Business Card</h1>
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
export default EditCardPage;
