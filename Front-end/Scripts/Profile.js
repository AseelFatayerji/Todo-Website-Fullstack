window.onload = () => {
  setUsername();
  if (
    localStorage.getItem("complete-task") == null &&
    localStorage.getItem("delete-task") == null &&
    localStorage.getItem("inprogress-task") == null &&
    localStorage.getItem("ongoing-task") == null &&
    localStorage.getItem("all-tasks") == null
  ) {
    return;
  }
  display();
};

function display() {
  let all = JSON.parse(localStorage.getItem("all-tasks")||"[]");
    let complete = JSON.parse(localStorage.getItem("complete-task")|| "[]");
  document.getElementById("complete").innerText = complete.length;
  document.getElementById("comp").value = complete.length;
  document.getElementById("comp").max = all.length;
  let progress = JSON.parse(localStorage.getItem("inprogress-task")|| "[]");
  document.getElementById("inprogress").innerText = progress.length;
  document.getElementById("pro").value = progress.length;
  document.getElementById("pro").max = all.length;
  let going = JSON.parse(localStorage.getItem("ongoing-task")|| "[]");
  document.getElementById("ongoing").innerText = going.length;
  document.getElementById("going").value = going.length;
  document.getElementById("going").max = all.length;
  let cancel = JSON.parse(localStorage.getItem("delete-task")|| "[]");
  document.getElementById("canceled").innerText = cancel.length;
  document.getElementById("cancel").value = cancel.length;
  document.getElementById("cancel").max = all.length;
}

function setUsername() {
  let user = grabUsername();
  document.getElementById("user").innerHTML = user.toUpperCase();
}
function Redirect(item) {
  let user = grabUsername();
  let loc = item.id;
  window.location.href =
    "http://localhost/fullstack/Todo%20Website/Front-end/Pages/" +
    loc +
    "?username=" +
    user;
}
function grabUsername() {
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
