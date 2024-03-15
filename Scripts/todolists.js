window.onload = () => {
  if (
    localStorage.getItem("complete-task") == null &&
    localStorage.getItem("delete-task") == null &&
    localStorage.getItem("inprogress-task") == null &&
    localStorage.getItem("ongoing-task") == null &&
    localStorage.getItem("all-tasks") == null
  ) {
    return;
  }
  displayList();
  setUsername();
};

function setLocalStorage(arr) {
  let all = JSON.parse(localStorage.getItem("all-tasks") || "[]");
  let itemscomplete = JSON.parse(localStorage.getItem("complete-task") || "[]");
  let itemsprogress = JSON.parse(
    localStorage.getItem("inprogress-task") || "[]"
  );
  let itemsongoing = JSON.parse(
    localStorage.getItem("inprogress-task") || "[]"
  );
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    all.push(temp.list);
    if (temp.complete == 1 && !itemscomplete.includes(temp.item)) {
      itemscomplete.push(temp.item);
    } else if (!itemsprogress.includes(temp.item)) {
      itemsprogress.push(temp.item);
    }
  }
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    if (!itemscomplete.includes(temp.item)) {
      itemsongoing.push(temp.item);
    }
  }
  localStorage.setItem("complete-task", JSON.stringify(itemscomplete));
  localStorage.setItem("inprogress-task", JSON.stringify(itemsprogress));
  localStorage.setItem("ongoing-task", JSON.stringify(itemsongoing));
  localStorage.setItem("all-tasks", JSON.stringify(all));
}
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
          if (!list_items.includes(temp.list)) {
            list_items.push(temp.list);
          }
        }
        for (let i = 0; i < list_items.length; i++) {
          displayOneList(list_items[i], user_items);
        }
        setLocalStorage(user_items);
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

  let label = document.createElement("label");
  let ul = document.createElement("ul");

  card.className = "list-card accent-bg";
  card_header.className =
    "list_cardheader accent-bg floatcontainer space-between";
  label.innerText = list_name;
  card_header.appendChild(label);
  card_body.className = "list_cardbody";

  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    let item = document.createElement("div");
    let trash = document.createElement("i");

    let in1 = hiddenInput("username", grabName());
    let in2 = hiddenInput("list_name", list_name);
    let form = document.createElement("form");
    form.method = "post";
    form.appendChild(in1);
    form.appendChild(in2);

    let temp = arr[i];

    let new_contanier = createPop(form, i);
    item.className = "floatcontainer space-between";
    trash.className = "fa-solid fa-trash-can trash";
    trash.onclick = () => {
      let cancel = JSON.parse(localStorage.getItem("delete-task") || "[]");

      cancel.push(temp);
      localStorage.setItem("delete-task", JSON.stringify(cancel));

      changeAction(form, "../PHP/DeleteTask.php");
    };
    let in3 = hiddenInput("item", temp.item);
    form.appendChild(in3);
    if (temp.list == list_name && temp.complete != 1) {
      let left = document.createElement("div");
      let right = document.createElement("div");
      let label = document.createElement("label");
      let edit = document.createElement("i");

      left.className = "floatcontainer gap space-between";
      right.className = "floatcontainer gap space-even";
      edit.className = "fa-solid fa-pen-to-square main-text edit-hover";
      edit.onclick = () => {
        displayEditPop(i);
      };

      label.innerText = temp.item;
      label.name = "item";
      if (temp.imp == 1) {
        let imp = document.createElement("i");
        imp.className = "fa-solid fa-circle-exclamation complete";
        imp.onclick = () => {
          changeAction(form, "../PHP/CompleteTask.php");
        };
        item.classList.add("alert-text");

        left.appendChild(imp);
        left.appendChild(label);
        right.appendChild(trash);
        right.appendChild(edit);

        item.appendChild(left);
        item.appendChild(right);

        form.appendChild(item);
        form.appendChild(new_contanier);
        li.appendChild(form);
        ul.appendChild(li);
      } else {
        let dot = document.createElement("i");
        dot.className = "fa-regular fa-circle-check correct-text complete";
        dot.onclick = () => {
          changeAction(form, "../PHP/CompleteTask.php");
        };

        left.appendChild(dot);
        left.appendChild(label);
        right.appendChild(trash);
        right.appendChild(edit);
        item.appendChild(left);
        item.appendChild(right);

        form.appendChild(item);
        form.appendChild(new_contanier);
        li.appendChild(form);
        ul.appendChild(li);
      }
    }
  }
  card_body.appendChild(ul);
  card.appendChild(card_header);
  card.appendChild(card_body);
  container.appendChild(card);
}
function displayAddPop() {
  document.getElementById("create").classList.remove("hide");
}
function displayEditPop(i) {
  document.getElementById("edit" + i).classList.remove("hide");
}

function createPop(form, i) {
  let inputs = document.createElement("div");

  let icon = document.createElement("i");
  let input = document.createElement("input");
  let submit = document.createElement("input");

  input.type = "text";
  input.name = "newitem";

  icon.className = "fa-solid fa-thumbtack mg-top-2 edit-icon";
  submit.type = "submit";
  submit.onclick = () => {
    changeAction(form, "../PHP/EditTask.php");
  };
  inputs.id = "edit" + i;
  inputs.className = "edit-box  hide floatcontainer space-between ";
  input.className = "edit-input";
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
