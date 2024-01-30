import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutUsPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mx: "auto",
        mb: 10,
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="primary" textAlign="center">
        About Us
      </Typography>
      <Typography variant="h3" color="primary.light" textAlign="center">
        Here you can learn about us!
      </Typography>
      <Typography
        variant="body1"
        color="initial"
        textAlign="center"
        sx={{
          width: isSmallScreen ? "90%" : 700,
          mx: "auto",
          fontSize: "1.2rem",
        }}
      >
        We are a company which promotes other businesses and help them grow and
        sustain a healthy customer-business relationship. Whether you're a
        client looking for the perfect man for the job or the head of a small to
        medium business, this is the place for you! Here you can publish your
        business and attract clients or other businesses looking to cooperate.
      </Typography>
      <Typography
        variant="body1"
        color="initial"
        textAlign="center"
        sx={{
          width: isSmallScreen ? "90%" : 700,
          mx: "auto",
          fontSize: "1.2rem",
        }}
      >
        Join Us and Many Other Business Men Today!
      </Typography>
      <Box>
        <img
          sx={{ width: isSmallScreen ? "80%" : "10%", height: "auto" }}
          alt="business-image"
          src="/assets/images/buisness-pic.jpg"
        />
      </Box>
    </Box>
  );
};

export default AboutUsPage;
