import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import { Button, Card, CardContent, Typography } from "@mui/material";
import Cart from "../components/Cart";
import './Menu.css';

const Menu = () => {
  const [foods, setFoods] = useState([]); 
  const [cart, setCart] = useState({});

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
      <div style={{ marginTop: "70px" }}>
        {foods.map((item) => (
          <Card style={{ margin: "10px" }} key={item.id}>
            <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
              <div className='block'>
                <Typography className='fitem'>
                  <img className='image' src={item.image} alt={item.name} />
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography>{item.price}</Typography>
                <Typography>{item.stock}</Typography>
                <Typography>{item.category}</Typography>
              </div>
              <div>
                <Button onClick={() => handleAdd(item)}>+</Button>
                <Button onClick={() => handleSub(item)}>-</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Cart cart={cart}/>
    </>
  );
}

export default Menu;
