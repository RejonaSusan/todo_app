import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.get("/", (req,res)=>{
    var options = { weekday: 'short',  month: 'long', day: 'numeric' };
    let today = new Date();
    let currentDay = today.toLocaleDateString("en-US", options)
    var a = document.getElementById("today");
    console.log(a);
});

app.post("/", (req,res)=>{
    
});

app.listen(port, ()=>{
    console.log(`server is running of ${port}`);
});