import List from "./config.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("helloe");
})

app.get("/show/all/items", (req,res)=>{
   List.find()
        .then(function(List){
            res.send(List)
        })
        .catch(function(err){
            console.log(err)
        })
}); 

app.post("/create/todo", (req,res)=>{
    const { newItem } = req.body;
    const item = new List({
        name: newItem
    })
    item.save();
    res.redirect("/show/all/items");
});

app.put("/update/todo", (req,res)=>{
    const { obj_id } = req.body;

});

app.post("/delete/todo", (req,res)=>{
    const { obj_id } = req.body;
    List.findByIdAndRemove(obj_id);
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});