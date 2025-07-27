import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from '@google/generative-ai';
import fetch from 'node-fetch';
import 'dotenv/config';
import mongoose from "mongoose";
import chartRoutes from "./routes/chat.js"

const app = express();
const PORT =  8080;
app.use(express.json());
app.use(cors());
app.use("/api",chartRoutes)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};




// app.get("/",async(req,res)=>{
//     res.send("hello");
// })

// app.post("/test", async (req, res) => {
//     const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
//     const prompt = req.body.prompt;
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     role: "user",
//                     parts: [{ text: prompt  }]
//                 }
//             ]
//         })
//     };

//     try {
//         const response = await fetch(endpoint, options);
//         const data = await response.json();
//         console.log(data.candidates[0].content.parts[0].text);
//         res.send(data); // Send the response back to the client
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).json({ error: "An error occurred" });
//     }
// });


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    connectDB();
});