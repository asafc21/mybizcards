import Grid from "@mui/material/Grid";
import { Typography, Box, Divider } from "@mui/material/";
import CardComponent from "../../components/CardComponent";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../store/searchContext";
import { useTheme } from "@emotion/react";
import loginContext from "../../store/loginContext";
import NewCardButtonComponent from "../../components/NewCardButtonComponent";
import useCardFunctions from "../../hooks/useCardFunctions";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const { search } = useContext(SearchContext);
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { login } = useContext(loginContext);
  const {
    handleLiked,
    handleDeleteCard,
    handleEditCard,
    handleNewCard,
    handleViewCard,
  } = useCardFunctions();

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
  const handleDelete = (id) => {
    handleDeleteCard(setDataFromServer, id);
  };

  const handleEdit = (id) => {
    handleEditCard(id);
  };

  const handleLike = (id) => {
    handleLiked(setDataFromServer, id);
  };

  const handleView = (id) => {
    handleViewCard(id);
  };

  const handleNew = () => {
    handleNewCard();
  };

  return (
    <Box sx={{ mb: 8 }}>
      {login && login.isBusiness && (
        <NewCardButtonComponent onClick={handleNew}>+</NewCardButtonComponent>
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
              onDelete={handleDelete}
              onEdit={handleEdit}
              onPhoneNumber={handleView}
              onLiked={handleLike}
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
