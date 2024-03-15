window.onload = () => {
  displayList();
  setUsername();
  if (localStorage.getItem("tesk-complete") == null) {
    return;
  }
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
  let form = document.createElement("form");
  let card = document.createElement("div");
  let card_header = document.createElement("div");
  let card_body = document.createElement("div");
  let ul = document.createElement("ul");

  let in1 = hiddenInput("username", grabName());
  let in2 = hiddenInput("list_name", list_name);

  form.method = "post";
  form.appendChild(in1);
  form.appendChild(in2);

  card.className = "list-card accent-bg";
  card_header.className = "list_cardheader accent-bg";
  card_header.innerText = list_name;
  card_body.className = "cardbody";

  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    let item = document.createElement("div");
    let trash = document.createElement("i");

    new_contanier = createPop(form);
    item.className = "item floatcontainer space-between";
    trash.className = "fa-solid fa-trash-can trash";
    trash.onclick = () => {
      changeAction(form, "../PHP/DeleteTask.php");
    };

    let temp = arr[i];
    let in3 = hiddenInput("item", temp.item);
    form.appendChild(in3);
    if (temp.list == list_name && temp.complete != 1) {
      let left = document.createElement("div");
      let right = document.createElement("div");
      let label = document.createElement("label");
      let edit = document.createElement("i");

      left.className = "floatcontainer gap space-between";
      right.className = "floatcontainer gap space-even";
      edit.className = "fa-solid fa-pen-to-square edit-icon";
      edit.onclick = () => {
        displayEditPop();
      };

      label.innerText = temp.item;
      label.name = "item";
      if (temp.imp == 1) {
        let imp = document.createElement("i");
        imp.className = "fa-solid fa-circle-exclamation";
        left.appendChild(imp);
        left.appendChild(label);
        right.appendChild(trash);
        right.appendChild(edit);
        right.appendChild(new_contanier);
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
        li.appendChild(new_contanier);
        ul.appendChild(li);
      }
    }
  }
  card_body.appendChild(ul);
  card.appendChild(card_header);
  card.appendChild(card_body);
  form.appendChild(card);
  container.appendChild(form);
}
function displayAddPop() {
  document.getElementById("create").classList.remove("hide");
}
function displayEditPop() {
  document.getElementById("edit").classList.remove("hide");
}
function createPop(form) {
  let inputs = document.createElement("div");

  let icon = document.createElement("i");
  let input = document.createElement("input");
  let submit = document.createElement("input");

  input.type = "text";
  input.name = "newitem";

  icon.className = "a-solid fa-thumbtack icon-edit";
  submit.type = "submit";
  submit.onclick = () => {
    changeAction(form, "../PHP/Edit.php");
  };
  inputs.id = "edit";
  inputs.className = "edit-box hide floatcontainer space-even ";
  input.className = "edit-input"
  submit.className = "edit-button main-bg";

  inputs.appendChild(icon);
  inputs.appendChild(input);
  inputs.appendChild(submit);
  return inputs;
}
function hiddenInput(name, value) {
  let input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.value = value;
  input.classList.add("hide");
  return input;
}
function changeAction(form, url) {
  form.action = url;
  form.submit();
}
