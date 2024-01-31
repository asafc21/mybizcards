import Grid from "@mui/material/Grid";
import { Typography, Box, Divider } from "@mui/material/";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../store/searchContext";
import deleteCard from "../../services/deleteCard";
import { useTheme } from "@emotion/react";
import loginContext from "../../store/loginContext";
import NewCardButtonComponent from "../../components/NewCardButtonComponent";

const HomePage = () => {
  const navigate = useNavigate();
  const [dataFromServer, setDataFromServer] = useState([]);
  const { search } = useContext(SearchContext);
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { login } = useContext(loginContext);

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
        <Typography variant="h1" color={isLight ? "initial" : "white"}>
          Welcome
        </Typography>
        <Typography
          sx={{ my: 2, fontSize: "1.2rem" }}
          variant="body1"
          color={isLight ? "initial" : "white"}
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

  const handleLiked = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex >= 0) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
    } catch (err) {
      console.log("error from axios", err);
    }
  };

  const handleNewCard = () => {
    navigate(ROUTES.CREATECARD);
  };

  return (
    <Box sx={{ mb: 8 }}>
      {login && login.isBusiness && (
        <NewCardButtonComponent onClick={handleNewCard}>
          +
        </NewCardButtonComponent>
      )}
      <Typography
        style={{ textAlign: "center" }}
        variant="h1"
        color={isLight ? "initial" : "white"}
      >
        Welcome
      </Typography>
      <Typography
        sx={{ textAlign: "center", my: 2, fontSize: "1.2rem" }}
        variant="body1"
        color={isLight ? "initial" : "white"}
      >
        Here You Have a Large Variety of Businesses to Choose from, look for the
        perfect man for the job!
      </Typography>
      <Divider sx={{ mb: 5 }}></Divider>
      <Grid container spacing={2}>
        {dataFromServer.filter(handleSearch).map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"Business Card" + index}>
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
              likes={item.likes}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
