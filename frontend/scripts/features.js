let list = document.getElementById("todos");

const getitems = () => {
  list.innerHTML = "";
  fetch(`http://localhost:4000/`)
    .then((res) => res.json())
    .then((data) => {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var item = data[key];
          var li = document.createElement("li");
          var checkbox =
            "<input type='checkbox' class='box' id='" +
            item._id +
            "' name='" +
            item.name +
            "'>";
          var label =
            "<label for='" + item.name + "'>" + item.name + "</label><br>";
          li.innerHTML = checkbox + label;
          list.appendChild(li);
        }
      }
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

let checkboxes = document.querySelectorAll(".box");

checkboxes.forEach((checkbox)=>{
  checkbox.onChange= ()=>{
    console.log("checked")
  }
}) 

// for(let i = 0;i < checkboxes.length; i++ ){
//   console.log(checkboxes)
//   checkboxes[i].addEventListener("change", function () {
//   if (checkboxes[i].checked) {
//     console.log(checkboxes[i])
//   }
// });
// }


// fetch(`http://localhost:4000/`)
//   .then((res) => res.json())
//   .then((data) => {
//     for (var key in data) {
//       if (data.hasOwnProperty(key)) {
//         var item = data[key];
//         var id = item._id;
//         fetch(`http://localhost:4000/item/${id}`, {
//           method: "PUT",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify({
//             status: newStatus,
//           }),
//         });
//       }
//     }
//   });