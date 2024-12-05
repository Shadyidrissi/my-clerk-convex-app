"use client"
import { useState } from "react";
import axios from "axios";
import crypto from "crypto"; // مكتبة لإنشاء HMAC

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const sharedSecret = "MY_SHARED_SECRET"; // السر المشترك

  const createPost = async () => {
    try {
      const payload = { title, description, price };
      const body = JSON.stringify(payload);

      // إنشاء توقيع HMAC
      const signature = crypto.createHmac("sha256", sharedSecret).update(body).digest("hex");

      // إرسال الطلب مع التوقيع في الهيدر
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        payload,
        {
          headers: {
            "X-Signature": signature,
          },
        }
      );

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
