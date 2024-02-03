import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material/";
import NotFoundPage from "./404Page";

const ViewCardPage = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setCardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error from axios", err);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <NotFoundPage />;
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={200} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "@media (max-width: 768px)": {
          flexDirection: "column",
          alignItems: "center",
        },
        mb: 10,
      }}
    >
      <Box sx={{ my: 8, width: "65%" }}>
        <Typography variant="h2" color="primary" sx={{ textAlign: "center" }}>
          {cardData.title}
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          sx={{ textAlign: "center", marginTop: 2, marginBottom: 4 }}
        >
          {cardData.subtitle}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body" color="primary">
            About them:
          </Typography>
          <Box sx={{ height: "250px" }}>
            <Typography
              variant="body"
              color="primary"
              style={{
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              {cardData.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body" color="primary">
            Find Them here:
          </Typography>
          <Typography variant="body" color="primary">
            {`${cardData.address.street} ${cardData.address.houseNumber}, ${cardData.address.city}, ${cardData.address.country}, ${cardData.address.zip}`}
          </Typography>
          <Typography variant="body" color="primary">
            Or Call Now!
          </Typography>
          <Typography variant="body" color="primary">
            {cardData.phone}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: 5,
          "@media (max-width: 768px)": {
            height: "auto",
          },
        }}
      >
        <img
          src={cardData.image.url}
          alt={cardData.image.alt}
          style={{ width: "450px", height: "auto" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <iframe
            width="450"
            height="300"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${cardData.address.street} ${cardData.address.houseNumber}, ${cardData.address.city}, ${cardData.address.country}&output=embed`}
          ></iframe>
          <a href="https://google-map-generator.com/">Maps Generator</a>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewCardPage;
