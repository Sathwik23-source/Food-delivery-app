import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';

const Form = () => {
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const[image,setImage]=useState("");
    const[category,setCategory]=useState("");
    const[stock,setStock]=useState("");
   const addData = async () => {
    const docRef = await addDoc(collection(db, "foods"), {
        name: name,
        price: price,
        image:image,
        catgory:category,
        stock:stock,
      });
      setName("");
      setPrice(0);
      setCategory("");
      setStock("")
      console.log(name);
      console.log(category);
      console.log(stock);
      console.log("Document written with ID: ", docRef.id);
      alert("Inserted to database");
   }
  return (
    <div>
        <input placeholder='name' type='text' onChange={(e) => setName(e.target.value)} />
        <br />
        <input placeholder='price' value={price} type='number' onChange={(e) => setPrice(e.target.value)} />
        <br />
        <input placeholder='image' type='text'onChange={(e)=>setImage(e.target.value) } />
        <br/>
        <input placeholder='catgory' type='text' onChange={(e)=>setCategory(e.target.value)}/>
        <br/>
        <input placeholder='stock' type='text' onChange={(e)=>setStock(e.target.value)}/>
        <button onClick={addData}>Add Data</button>
        
    </div>
  )
}

export default Form;