"use client";
import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [data, setData] = useState([]); // Initialize as an array

  const createPost = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        headers: {
          Authorization: process.env.YOUR_SECRET_KEY,
        },
      });
      setData(response.data); // Set only the data portion
      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      <button onClick={createPost}>Fetch Posts</button> {/* Button to trigger fetching */}
      {data.length > 0 ? (
        data.map((e, index) => (
          <div key={index}>
            <p>Title: {e.title}</p>
            <p>Description: {e.description}</p>
            <p>Price: {e.price}</p>
          </div>
        ))
      ) : (
        <p>No posts available. Click the button to fetch posts.</p>
      )}
    </div>
  );
}
