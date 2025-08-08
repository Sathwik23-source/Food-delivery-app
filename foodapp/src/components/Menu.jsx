import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import { Button, Card, CardContent, Typography } from "@mui/material";
import Cart from "../components/Cart";
import './Menu.css';

const Menu = () => {
  const [foods, setFoods] = useState([]); 
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");


  const fetchFood = async () => {
    console.log("Fetching foods from Firebase");
    const foodArray = [];
    const querySnapshot = await getDocs(collection(db, "foods")); 
    querySnapshot.forEach((doc) => {
      foodArray.push({ ...doc.data(), id: doc.id }); 
    });
    setFoods(foodArray);
  }

  useEffect(() => {
    fetchFood();
  }, []);

  const handleAdd = (item) => {
    let newItem = { ...cart };
    if (newItem[item.name]) newItem[item.name].stock += 1;
    else newItem[item.name] = { ...item, stock: 1 };
    setCart(newItem);
  };

  const handleSub = (item) => {
    let newItem = { ...cart };
    if (newItem[item.name]) {
      newItem[item.name].stock -= 1;
      if (newItem[item.name].stock <= 0) {
        delete newItem[item.name];
      }
    }
    setCart(newItem);
  };
  
  return (
  <>
    <div className="menu-container">
      <h1 className="menu-title">Menu</h1>
      <div className="category-filter">
      <div className="category-buttons">
  {["All", "Main course", "Starters", "Desserts", "Beverages"].map((category) => (
    <Button
      key={category}
      variant={selectedCategory === category ? "contained" : "outlined"}
      color="primary"
      onClick={() => setSelectedCategory(category)}
      style={{ margin: "5px" }}
    >
      {category}
    </Button>
  ))}
</div>

    </div>

      <div className="food-grid">         
        {foods.filter((item) => selectedCategory === "All" ? true : item.category === selectedCategory)
        .map((item) => (
          <div className="food-card" key={item.id}>
            <img className="food-image" src={item.image} alt={item.name} />
            <div className="food-content">
              <h2 className="food-name">{item.name}</h2>
              <p className="food-category">Category: {item.category}</p>
              <p className="food-stock">Stock: {item.stock}</p>
              <p className="food-price">₹{item.price}</p>
              <div className="food-actions">
                <Button variant="contained" color="success" onClick={() => handleAdd(item)}>+</Button>
                <Button variant="outlined" color="error" onClick={() => handleSub(item)}>-</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Cart cart={cart} />
  </>
);

}

export default Menu;
