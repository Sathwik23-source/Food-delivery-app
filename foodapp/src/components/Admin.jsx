import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField
} from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function Admin() {
  const auth = getAuth();
const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch foods
  const fetchFoods = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'foods'));
      const foodArray = [];
      querySnapshot.forEach((docItem) => {
        foodArray.push({ id: docItem.id, ...docItem.data() });
      });
      setFoods(foodArray);
    } catch (error) {
      console.error("Error fetching foods: ", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Add new food
  const handleAddFood = async () => {
  if (!user) return alert("Please login to add food.");

  try {
    await addDoc(collection(db, 'foods'), { ...formData });
    setFormData({ name: '', price: '', stock: '', category: '', image: '' });
    fetchFoods();
  } catch (error) {
    console.error("Error adding food: ", error);
  }
};


  // Delete food
  // Delete food
const handleDelete = async (id) => {
  if (!user) return alert("Please login to delete items.");
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, 'foods', id));
    fetchFoods();
  } catch (error) {
    console.error("Error deleting food: ", error);
  }
};



  // Start edit
  const handleEditClick = (food) => {
    setEditingId(food.id);
    setFormData({
      name: food.name,
      price: food.price,
      stock: food.stock,
      category: food.category,
      image: food.image
    });
  };

  // Save edited food
  const handleEditSave = async (id) => {
  if (!user) return alert("Please login to save changes.");

  try {
    const docRef = doc(db, 'foods', id);
    await updateDoc(docRef, { ...formData });
    setEditingId(null);
    setFormData({ name: '', price: '', stock: '', category: '', image: '' });
    fetchFoods();
  } catch (error) {
    console.error("Error updating food: ", error);
  }
};


  // Handle input changes
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard - Food Management</h1>

      {/* Add Food Form */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Add New Food Item</h2>
        <TextField name="name" label="Name" value={formData.name} onChange={handleChange} style={{ marginRight: '10px' }} />
        <TextField name="price" label="Price" value={formData.price} onChange={handleChange} style={{ marginRight: '10px' }} />
        <TextField name="stock" label="Stock" value={formData.stock} onChange={handleChange} style={{ marginRight: '10px' }} />
        <TextField name="category" label="Category" value={formData.category} onChange={handleChange} style={{ marginRight: '10px' }} />
        <TextField name="image" label="Image URL" value={formData.image} onChange={handleChange} style={{ marginRight: '10px' }} />
        {editingId ? (
          <Button variant="contained" color="primary" onClick={() => handleEditSave(editingId)}>Save</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddFood}>Add Food</Button>
        )}
      </div>

      {/* Food Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food) => (
              <TableRow key={food.id}>
                <TableCell><img src={food.image} alt={food.name} width="50" /></TableCell>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.price}</TableCell>
                <TableCell>{food.stock}</TableCell>
                <TableCell>{food.category}</TableCell>
                <TableCell>
                  {editingId === food.id ? (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEditSave(food.id)}>Save</Button>
                      <Button variant="outlined" color="secondary" onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>Cancel</Button>
                    </>
                  ) : (
                    <Button variant="contained" color="secondary" onClick={() => handleEditClick(food)}>Edit</Button>
                  )}
                  <Button variant="contained" color="error" onClick={() => handleDelete(food.id)} style={{ marginLeft: '5px' }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Admin;
