import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { db } from './firebaseConfig';
import Form from './components/Form';
import Navbar from './components/Navbar'
import Home from './components/Home';  
import { Button, Card, CardContent, Typography } from "@mui/material";

import Menu from "./components/Menu";
import Admin from './components/Admin';
import { collection,getDocs,deleteDoc,doc } from 'firebase/firestore';
const App = () => {
  
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <br /><br /><br />
    <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/Menu" element={<Menu/>}/>
      <Route path ="/Admin" element={<Admin/>}/>

      
    </Routes>
    </BrowserRouter>
    
    
    
    
    
    

   
    </>
);
};
  

  
export default App