import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useContext, useState } from "react";
import { SearchContext } from "../../../store/searchContext";

const FilterComponent = () => {
  const [txt, setTxt] = useState("");
  const { setSearch } = useContext(SearchContext);

  const handleInputChange = (e) => {
    setTxt(e.target.value);
    setSearch(e.target.value.toString().toLowerCase());
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={txt}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
