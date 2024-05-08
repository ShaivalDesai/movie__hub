import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from "@mui/icons-material/Home";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ home, sortAsc, sortDes }) {
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = useState("");
  // console.log(search);
  const navigate = useNavigate();
  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      home();
    } else if (newValue === 1) {
      sortAsc();
    } else if (newValue === 2) {
      sortDes();
    } else if (newValue === 3) {
      navigate("/edit");
    }
  };

  return (
    <Box style={{ marginTop: "20px" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        style={{ borderRadius: "5px" }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Sort Ascending"
          icon={<ArrowUpwardIcon />}
        />
        <BottomNavigationAction
          label="Sort Descending"
          icon={<ArrowDownwardIcon />}
        />
        <BottomNavigationAction label="Edit" icon={<EditIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Navbar;
