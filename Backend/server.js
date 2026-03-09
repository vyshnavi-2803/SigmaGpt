import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app=express();
const port =8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api",chatRouter);

// app.listen(port,()=>{
//   console.log(`Server running on ${port}`);
 
// });

const connectDB =async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }catch(err){
    console.log("Failed to connect with Db",err);
    process.exit(1);
  }
}
 connectDB();



// app.post("/test",async(req,res)=>{
//   const options={
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body:JSON.stringify({
//       model:"gpt-4o-mini",
//       messages:[{

//         role:"user",
//         content:req.body.message
//       }]
//     })
//   };
//   try{
//     const response = await fetch("https://api.openai.com/v1/chat/completions",options);
//     const data = await response.json();
//     console.log(data.choices[0].message.content);
//     res.send(data.choices[0].message.content);
//   }catch(err){
//     console.log(err);
//   }
// });


