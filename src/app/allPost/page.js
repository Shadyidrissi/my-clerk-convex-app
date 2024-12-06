"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const clientTimestamp = Date.now().toString();
      const path = "/api/posts";
      const message = `${path}:${clientTimestamp}`;
      const sharedSecret = process.env.HMAC_KEY;

      if (!sharedSecret) {
        throw new Error("HMAC_KEY is not defined in environment variables");
      }

      const signature = CryptoJS.HmacSHA256(message, sharedSecret).toString();

      const response = await axios.get("http://localhost:3000/api/posts", {
        headers: {
          "x-signature": signature,
          "x-timestamp": clientTimestamp,
        },
      });

      setPosts(response.data);
    } catch (err) {
      console.error("Error occurred:", err);
      setError(err.response?.data?.error || "Error fetching posts");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => fetchData()}>Fetch</button>
      {error && <p>{error}</p>}
      <ul>
        {posts.map((post,index) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
