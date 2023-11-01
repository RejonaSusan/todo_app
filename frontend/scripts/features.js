let list = document.getElementById("todos");
let i = 0

const Update = () => {
  elements = [];
  for (let j = 0; j<i; j++){
    elements.push(document.getElementById(String(j)));
    elements[j].addEventListener("change", () => {
    console.log(elements[j].name);
    fetch(`http://localhost:4000/item/${elements[j].name}`, { 
      method: "PUT",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ Status: true })
    })
    // location.reload();
  })
  } 
}


const getitems = () => {
  list.innerHTML = "";
  fetch(`http://localhost:4000/`)
    .then((res) => res.json())
    .then((data) => {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var item = data[key];
          var li = document.createElement("li");
          var checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "box";
          checkbox.id = i;
          checkbox.name = item._id;
          var label = document.createElement("label");
          label.htmlFor = item.name;
          label.textContent = item.name;
          label.appendChild(document.createElement("br"));
          li.appendChild(checkbox);
          li.appendChild(label);
          list.appendChild(li);
          i++;
        }
      }
      Update();
    });  
};


getitems();

let button = document.getElementById("button");
let item = document.getElementById("newItem");

button.addEventListener("click", function () {
  fetch(`http://localhost:4000/item`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      newItem: item.value,
    }),
  });
  item.value = "";
  getitems();
});

item.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    button.click();
  }})
