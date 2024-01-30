import axios from "axios";
import { toast } from "react-toastify";

const deleteCard = (id) => {
  axios
    .delete("/cards/" + id, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((response) => {
      toast.success("Card Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
    .catch((err) => {
      console.log("error from axios", err);
    });
};

export default deleteCard;
