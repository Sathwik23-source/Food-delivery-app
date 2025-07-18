import React from 'react'
import './Home.css'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";

function Home  ()  {
  const navigate = useNavigate();
  return (
    <div className='home'>
      <div className="home_container">
        <div className="desc">
          <div>
            <select name="All Category" id="All Category">
              <option value="All Category ">All Category</option>
              <option value="Main course ">Main course</option>
              <option value="Starters ">Starters</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div className="description">
            <h1>Food delivery in minutes</h1>
            <h2>Order food</h2>
            <p>Ordering your favorite food online is a convenient and enjoyable way to satisfy your cravings without leaving the comfort of your home. With just a few clicks, you can browse through a variety of restaurants and cuisines, choose from an extensive menu, and customize your order to your liking.</p>
          </div>
          <Button onClick={()=>navigate('/Menu')} color="white">Get Started</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
