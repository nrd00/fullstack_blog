import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) =>{
    res.send("Hello from express!");
})

app.get("/auth", (req, res) =>{
    res.send("Hello from auth!");
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
    
})