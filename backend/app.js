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

// app.post("/create", async (req,res)=>{
//     try {
//         const newItem = await List.create(req.body) 
//         res.status(200).json(newItem)
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).json({message: err.message})
//     }
// })

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
        const updateItem = await List.findByIdAndUpdate(id, req.body)
        if(!updateItem){
            return res.status(404).json({message: `not updated/not found`})
        } else {
            return res.status(200).json({message: `updated`})
        }
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

// app.put("/update/todo/:id", async (req,res)=>{
//     const { id } = req.params;
//     const item = await List.findById(id, req.body);
//     console.log(item);
//     res.redirect("/show/all/items");
// });

// app.post("/delete/todo/:id", (req,res)=>{
//     const { obj_id }= req.params;
//     List.findById(obj_id)
//     .then((obj_id) => {
//         console.log(obj_id)
//        })
//     .catch((err) => {
//         console.error('Error removing document:', err);
//     });
//     res.redirect("/show/all/items");
// });

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});