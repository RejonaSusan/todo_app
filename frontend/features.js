let hello = document.getElementById("hello")
let todos = document.getElementById("todos")


fetch(`http://localhost:4000/`)
.then((res)=>res.text())
.then((data)=>{
    var text = data;
    hello.innerHTML = text;
})

fetch(`http://localhost:4000/show/all/items`)
.then((res)=>res.json())
.then((data)=>{
    console.log(data);
    data.map();
    data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `Task: ${item.name}, ID: ${item._id}`;
    todoList.appendChild(listItem);
})
})


