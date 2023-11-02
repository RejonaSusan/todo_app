let list = document.getElementById("todos");
let i = 0;
let k = 1000;

const Update = () => {
  elements = [];
  for (let j = 0; j < i; j++) {
    elements.push(document.getElementById(String(j)));
    elements[j].addEventListener("change", () => {
      fetch(`http://localhost:4000/item/${elements[j].name}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ Status: true }),
      });
    });
  }
};


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

          var deleteButton = document.createElement("span");
          deleteButton.innerHTML = "\u00d7";
          deleteButton.className = "delete-button";
          deleteButton.id = k;
          deleteButton.dataset.info = item._id;

          var label = document.createElement("label");
          label.className = "tasks";
          label.textContent = item.name;

          label.appendChild(document.createElement("br"));

          li.appendChild(checkbox);
          li.appendChild(label);
          li.appendChild(deleteButton);

          list.appendChild(li);
          i++;
          k++;
        }
      }
      Update();
      del();
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

item.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    button.click();
    location.reload();
  }
});

const del = () => {
  elements = [];
  for (let j = 1000; j < k; j++) {
    elements.push(document.getElementById(String(j)));
  }
  for(let l = 0; l < elements.length; l++){
    elements[l].addEventListener("click", ()=>{
      fetch(`http://localhost:4000/item/${elements[l].dataset.info}`, { 
        method: "DELETE",
        headers: { "Content-type": "application/json" }
      })
      location.reload();
    })
  }
};





