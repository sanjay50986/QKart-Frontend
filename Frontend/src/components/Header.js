import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {

  let token = localStorage.getItem("token")
  let userName = localStorage.getItem("username")
  const history = useHistory()

  const handleLogout = () => {
   localStorage.clear("token") 
   localStorage.clear("username") 
   localStorage.clear("balance") 
   window.location.reload()
  }

    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>

        {children}

        {hasHiddenAuthButtons && (
          <Button
          onClick={() => {history.push("/")}}
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
          >
            Back to explore
          </Button>
        )}
        
        {!hasHiddenAuthButtons && (
          <div>
            { token ? (
              <div className="userDetails">
                <img src="avatar.png" alt="/crio.do/i"/>
                <h3>{userName}</h3>
                <Button onClick={handleLogout} className="logout-btn">Logout</Button>
              </div>
            ) : (
              <div>
                <Button onClick={() => {history.push("/login")}}  style={{marginRight: "20px"}}>Login</Button>
                <Button onClick={() => {history.push("/register")}} variant="contained">Register</Button>
              </div>
            )}
          </div>
        )}

      </Box>
    );
};

export default Header;
