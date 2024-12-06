"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

function Page({ params }) {
  const [data, setData] = useState(null);
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
        const { id } = await params; // Unwrap the params Promise
        // console.log(message,sharedSecret,signature,clientTimestamp)
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            "x-signature": signature,
            "x-timestamp": clientTimestamp,
          },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      }
    };



  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button onClick={() => fetchData()}>Fetch</button>

      <h1>Posts</h1>
      {data ? (
        <ul>
          {data.map((post) => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
