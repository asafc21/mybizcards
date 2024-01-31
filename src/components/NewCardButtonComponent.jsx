import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const NewCardButtonComponent = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
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
      {children}
    </Button>
  );
};

NewCardButtonComponent.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewCardButtonComponent;
