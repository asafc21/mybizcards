// FooterComponent
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CoffeeIcon from "@mui/icons-material/Coffee";
import DiamondIcon from "@mui/icons-material/Diamond";
const FooterComponent = () => {
  return (
    <Paper
      elevation={4}
      sx={{ width: "100%", position: "fixed", mt: 2, bottom: 0 }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Icebook" icon={<AcUnitIcon />} />
        <BottomNavigationAction label="Cofegram" icon={<CoffeeIcon />} />
        <BottomNavigationAction label="D" icon={<DiamondIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default FooterComponent;
