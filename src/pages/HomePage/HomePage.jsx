import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../store/searchContext";
import deleteCard from "../../services/deleteCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const HomePage = () => {
  const navigate = useNavigate();
  const [dataFromServer, setDataFromServer] = useState([]);
  const { search } = useContext(SearchContext);

  const handleSearch = (item) => {
    return item.title.toLowerCase().includes(search);
  };

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);

  if (!dataFromServer || !dataFromServer.length) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" color="initial">
          Welcome
        </Typography>
        <Typography
          sx={{ my: 2, fontSize: "1.2rem" }}
          variant="body1"
          color="initial"
        >
          Here You Have a Large Variety of Businesses to Choose from, look for
          the perfect man for the job!
        </Typography>
        <Typography>Something went wrong, Could not find any items</Typography>
      </Box>
    );
  }
  const handleDeleteCard = (id) => {
    setDataFromServer((cDataFromServer) =>
      cDataFromServer.filter((card) => card._id !== id)
    );
    deleteCard(id);
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handlePhoneCall = (phone) => {
    console.log("phone number is:", phone);
  };

  const handleLiked = (id) => {
    console.log("car liked is:", id);
  };
  return (
    <Box sx={{ mb: 8 }}>
      <Button
        variant="contained"
        sx={{
          borderRadius: "50%",
          minWidth: 0,
          width: "50px",
          height: "50px",
          fontSize: "20px",
          position: "fixed",
          bottom: "100px",
          right: "20px",
          zIndex: 1,
        }}
      >
        +
      </Button>
      <Typography style={{ textAlign: "center" }} variant="h1" color="initial">
        Welcome
      </Typography>
      <Typography
        sx={{ textAlign: "center", my: 2, fontSize: "1.2rem" }}
        variant="body1"
        color="initial"
      >
        Here You Have a Large Variety of Businesses to Choose from, look for the
        perfect man for the job!
      </Typography>
      <Grid container spacing={2}>
        {dataFromServer.filter(handleSearch).map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"carsCard" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={{
                city: item.address.city,
                street: item.address.street,
                houseNumber: item.address.houseNumber,
                zip: item.address.zip,
              }}
              cardNumber={item.bizNumber}
              onDelete={handleDeleteCard}
              onEdit={handleEditCard}
              onPhoneNumber={handlePhoneCall}
              onLiked={handleLiked}
              userID={item.user_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
