import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import loginContext from "../store/loginContext";
import { useContext } from "react";

const CardComponent = ({
  title,
  subtitle,
  img,
  phone,
  address,
  cardNumber,
  id,
  onEdit,
  onPhoneNumber,
  onLiked,
  onDelete,
  userID,
  likes,
}) => {
  const { login } = useContext(loginContext);
  let checkIfOwnerOrAdmin = false;
  if (login) {
    if (login._id === userID || login.isAdmin) {
      checkIfOwnerOrAdmin = true;
    }
  }
  const handleEditClick = () => {
    onEdit(id);
  };

  const handlePhoneClick = () => {
    onPhoneNumber(phone);
  };

  const handleLikeClick = () => {
    onLiked(id);
  };

  const handleDeleteCard = () => {
    onDelete(id);
  };
  return (
    <Card square raised sx={{ height: "450px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt="card's image"
          height={200}
        />
      </CardActionArea>
      <CardHeader
        sx={{ height: "80px" }}
        title={title}
        subheader={subtitle}
      ></CardHeader>
      <Divider></Divider>
      <CardContent>
        <Box sx={{ height: "100px" }}>
          <Typography>
            <Typography component="span" fontWeight={700}>
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography>
            <Typography component="span" fontWeight={700}>
              Address:{" "}
            </Typography>
            {`${address.street} ${address.houseNumber}, ${address.city}`}
          </Typography>
          <Typography>
            <Typography component="span" fontWeight={700}>
              Card number:{" "}
            </Typography>
            {cardNumber}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {checkIfOwnerOrAdmin && (
              <IconButton onClick={handleDeleteCard}>
                <DeleteIcon />
              </IconButton>
            )}
            {checkIfOwnerOrAdmin && (
              <IconButton onClick={handleEditClick}>
                <ModeIcon />
              </IconButton>
            )}
          </Box>
          <Box>
            <IconButton onClick={handlePhoneClick}>
              <LocalPhoneIcon />
            </IconButton>
            {login && (
              <IconButton
                color={likes.includes(login._id) ? "error" : "inherit"}
                onClick={handleLikeClick}
              >
                <FavoriteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.number.isRequired,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
  userID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPhoneNumber: PropTypes.func.isRequired,
  onLiked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  likes: PropTypes.array.isRequired,
};

export default CardComponent;
