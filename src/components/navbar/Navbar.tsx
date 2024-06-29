// import React from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { LogoutOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.user);

  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    throw new Error(
      "DarkModeContext must be used within a DarkModeContextProvider"
    );
  }

  const { toggle, darkMode } = darkModeContext;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login"); // Navigate to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Logo</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <button className="logout" onClick={() => handleLogout()}>
          logout
          <LogoutOutlined />
        </button>

        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <span>{currentUser?.userData?.fullname}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
