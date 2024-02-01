import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const useCardFunctions = () => {
  const navigate = useNavigate();

  const handleDeleteCard = (setDataFromServer, id) => {
    setDataFromServer((cDataFromServer) =>
      cDataFromServer.filter((card) => card._id !== id)
    );
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

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleViewCard = (id) => {
    navigate(`${ROUTES.VIEWCARD}/${id}`);
  };

  const handleLiked = async (setDataFromServer, id) => {
    try {
      let { data } = await axios.patch("/cards/" + id, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex >= 0) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
    } catch (err) {
      console.log("error from axios", err);
    }
  };

  const handleNewCard = () => {
    navigate(ROUTES.CREATECARD);
  };

  return {
    handleDeleteCard,
    handleEditCard,
    handleViewCard,
    handleLiked,
    handleNewCard,
  };
};

export default useCardFunctions;
