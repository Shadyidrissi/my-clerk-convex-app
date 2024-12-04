"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params; // Unwrap the params Promise
        const response = await axios.get(`/api/posts/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [params]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
