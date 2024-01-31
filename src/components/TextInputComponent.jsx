import { Grid, TextField, Alert } from "@mui/material";
import PropTypes from "prop-types";

const TextInputComponent = ({
  xs,
  id,
  label,
  autoFocus,
  value,
  onChange,
  onBlur,
  errors,
  required,
  type,
}) => {
  return (
    <Grid item xs={xs}>
      <TextField
        name={id}
        required={required}
        fullWidth
        id={id}
        label={label}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  );
};

TextInputComponent.propTypes = {
  xs: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
  type: PropTypes.string,
};

TextInputComponent.defaultProps = {
  xs: 6,
  autoFocus: false,
  type: "text",
};

export default TextInputComponent;
