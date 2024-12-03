"use client"
import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const createPost = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/posts', { 
        title:title,
        description:description,
        price:price,
      });      
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <input placeholder="عنوان" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="وصف" onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="السعر" type="number" onChange={(e) => setPrice(e.target.value)} />
      <button onClick={createPost}>إنشاء عرض</button>
    </div>
  );
}
