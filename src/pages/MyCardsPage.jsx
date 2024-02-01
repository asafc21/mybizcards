import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Divider, Grid, useMediaQuery } from "@mui/material/";
import { useTheme } from "@emotion/react";
import { SearchContext } from "../store/searchContext";
import CardComponent from "../components/CardComponent";
import NewCardButtonComponent from "../components/NewCardButtonComponent";
import useCardFunctions from "../hooks/useCardFunctions";

const MyCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { search } = useContext(SearchContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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

  useEffect(() => {
    axios
      .get("/cards/my-cards", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);

  return (
    <Box sx={{ my: 8 }}>
      <NewCardButtonComponent onClick={handleNew}>+</NewCardButtonComponent>
      <Typography
        sx={{ mb: 2, textAlign: "center" }}
        variant="h2"
        color={isLight ? "initial" : "white"}
      >
        Your Business Cards
      </Typography>
      <Typography
        sx={{ mb: 2, textAlign: "center" }}
        variant="h5"
        color={isLight ? "initial" : "white"}
      >
        Here you can see all your business cards
      </Typography>
      <Divider sx={{ mb: 2 }}></Divider>
      {(!dataFromServer || !dataFromServer.length) && (
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          color={isLight ? "initial" : "white"}
          sx={{
            mt: 5,
            textAlign: "center",
            width: isSmallScreen ? "300px" : "700px",
            margin: "auto",
          }}
        >
          You don't seem to have any buisness cards. If you'd like, join us and
          create a new card by pressing on the + (plus) button at the bottom
          right of the screen
        </Typography>
      )}
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

export default MyCardsPage;
