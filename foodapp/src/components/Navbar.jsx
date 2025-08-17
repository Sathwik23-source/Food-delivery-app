import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Navbar () {
  const navigate= useNavigate();
  const provider = new GoogleAuthProvider();
  const [name, setName] = useState();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        const user = result.user;
        setName(user.displayName);
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      
      });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      //console.log(parsedUser);
      setName(parsedUser.displayName);
    }
  }, []);
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setName(null);
    });
  };
  
  return (
    <AppBar>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={()=>navigate('/')} color="white">Food App</Button>
        <Button onClick={()=>navigate('/')} color="white">Home</Button>
        <div className="clickhome" onClick={()=>navigate(window.location.href="/")}>

        </div>
        <Button onClick={()=>navigate('/Menu')} color="white">Menu</Button>
        <Button onClick={()=>navigate('/admin')} color="white">Admin</Button>

        {name ? (         
          <h3>{name}</h3>
        ) : (
          <Button onClick={signIn} color="white">
            Login
          </Button>
        )}
        { name && (
  <Button onClick={signOut} variant="contained" color="secondary">
    Logout
  </Button>
) }

        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;