window.onload = () => {
  displayList();
  setUsername();
};
function setUsername() {
  let user = grabName();
  document.getElementById("user").innerHTML = user.toUpperCase();
  document.getElementById("label").value = user;
}

function grabName() {
  let user = "";
  let url = window.location.href;
  let index = 0;
  for (let i = 0; i < url.length; i++) {
    if (url[i] == "=") {
      index = i + 1;
      break;
    }
  }
  for (let i = index; i < url.length; i++) {
    user += url[i];
  }
  user = user.replace("#", "");
  return user;
}
async function displayList() {
  const lists = await fetch("../PHP/DisplayLists.php")
    .then(function (response) {
      let results = response.json();
      results.then(function (list) {
        let user = grabName();
        let user_items = [];
        for (let i = 0; i < list.length; i++) {
          let temp = list[i];
          if (user == temp.name) {
            user_items.push(temp);
          }
        }
        let list_items = [];
        for (let i = 0; i < user_items.length; i++) {
          let temp = user_items[i];
          if (!list_items.includes(user_items[i].list)) {
            list_items.push(temp.list);
          }
        }
        for (let i = 0; i < list_items.length; i++) {
          displayOneList(list_items[i], user_items);
        }
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}
function displayOneList(list_name, arr) {
  let container = document.getElementById("lists");
  let card = document.createElement("div");
  let card_header = document.createElement("div");
  let card_body = document.createElement("div");
  let ul = document.createElement("ul");

  card.className = "list-card accent-bg";
  card_header.className = "list_cardheader accent-bg";
  card_header.innerText = list_name;
  card_body.className = "cardbody";
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    let item = document.createElement("div");
    let trash = document.createElement("i");
    item.className = "item floatcontainer space-between";
    trash.className = "fa-solid fa-trash-can trash";

    let temp = arr[i];
    if (temp.list == list_name && temp.complete != 1) {
      let left = document.createElement("div");
      let right = document.createElement("div");
      let label = document.createElement("label");
      let edit = document.createElement("i");
      left.className = "floatcontainer gap space-between"
      right.className = "floatcontainer gap space-between"
      edit.className = "fa-solid fa-pen-to-square main-text";
      label.innerText = temp.item;
      if (temp.important == 1) {
        let imp = document.createElement("i");
        imp.className = "fa-solid fa-circle-exclamation";
        left.appendChild(imp);
        left.appendChild(label);
        right.appendChild(trash);
        right.appendChild(edit);
        item.appendChild(left);
        item.appendChild(right);
        item.classList.add("alert-text");
        li.appendChild(item);
        ul.appendChild(li);
      } else {
        let dot = document.createElement("i");
        dot.className = "fa-regular fa-circle-check correct-text";
        left.appendChild(dot);
        left.appendChild(label);
        right.appendChild(trash);
        right.appendChild(edit);
        item.appendChild(left);
        item.appendChild(right);
        li.appendChild(item);
        ul.appendChild(li);
      }
    }
  }
  card_body.appendChild(ul);
  card.appendChild(card_header);
  card.appendChild(card_body);
  container.appendChild(card);
}
function displayPop() {
  document.getElementById("create").classList.remove("hide");
}
