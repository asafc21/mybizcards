import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutUsPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLight = theme.palette.mode === "light";

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
        color={isLight ? "initial" : "white"}
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
        color={isLight ? "initial" : "white"}
        textAlign="center"
        sx={{
          width: isSmallScreen ? "90%" : 700,
          mx: "auto",
          fontSize: "1.2rem",
        }}
      >
        Join Us and Many Other Business Men Today!
      </Typography>
      <Typography
        variant="body1"
        color={isLight ? "initial" : "white"}
        textAlign="center"
        sx={{
          width: isSmallScreen ? "90%" : 700,
          mx: "auto",
          fontSize: "1.2rem",
        }}
      >
        Here's a brief explanation on how to use our site, whether you are a
        member or not you can view all buisnesses in our Home page, you have an
        option to search a business by it's name, just use the search bar on the
        top of the page. To see more details about a business simply press the
        relevent phone icon. If you are a registered member you can also add
        them to your favorites by pressing on the Heart Icon. If you are a
        business owner you can pulish your business, make sure to register as a
        business account, then to upload your business press the + (plus) button
        either on the Home page or on the My Cards page, you have an option to
        edit the business details by pressing on the Pencil icon or delete it by
        pressing on the Garbage Can icon.
      </Typography>
    </Box>
  );
};

export default AboutUsPage;
