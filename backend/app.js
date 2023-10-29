import List from "./config.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req,res)=>{
    await List.find()
            .then(function(List){
                res.send(List)
            })
            .catch(function(err){
                console.log(err)
            })
}); 

app.post("/item", async (req,res)=>{
    try {
        const { newItem } = req.body;
        const item = await new List({
            name: newItem,
            status: 0
        })
        item.save();
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
    res.redirect("/");
});

app.put("/item/:id", async (req, res)=>{
    try {
        const {id}= req.params;
        const {Status} = req.body;
        const updateStatus = await List.findByIdAndUpdate(id, {status: Status})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    res.redirect("/")
})

app.delete("/item/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const deleteItem = await List.findByIdAndDelete(id) 
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    res.redirect("/")
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});