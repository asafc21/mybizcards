import { Box, Button, Typography, useMediaQuery } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleHomeNav = () => {
    navigate(ROUTES.HOME);
  };

  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        mb: isMobile ? 8 : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: isMobile ? 0 : 5,
          marginBottom: isMobile ? 5 : 0,
        }}
      >
        <img
          style={{ width: isMobile ? "300px" : "500px" }}
          src="/assets/images/404.png"
          alt="404 Not Found"
        />
        <a
          style={{ textDecoration: "none", color: "blue" }}
          href="https://pngtree.com/freepng/purple-stereo-404-page-loss-universal-creative-elements_4774965.html"
        >
          Image Source: pngtree.com
        </a>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          textAlign={"center"}
          color="primary"
        >
          Uh Oh... Seems Like You've Lost Your Way
        </Typography>
        <Typography variant={isMobile ? "subtitle1" : "h5"} color="primary">
          Go Back To The Home Page
        </Typography>
        <Button
          sx={{ width: isMobile ? "200px" : "150px" }}
          variant="contained"
          onClick={handleHomeNav}
        >
          Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
