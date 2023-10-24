import mongoose from "mongoose";

const mongoURL = 'mongodb://127.0.0.1:27017/tododb';

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})

const todoschema = new mongoose.Schema({
    name: String,
    status: Number
});

const List = mongoose.model("List", todoschema);

export default List