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
  let all = JSON.parse(localStorage.getItem("all-tasks") || "[]");
  let complete = JSON.parse(localStorage.getItem("complete-task") || "[]");
  document.getElementById("complete").innerText = complete.length;
  document.getElementById("comp").value = complete.length * 100;
  document.getElementById("comp").max = all.length * 100;
  let progress = JSON.parse(localStorage.getItem("inprogress-task") || "[]");
  document.getElementById("inprogress").innerText = progress.length;
  document.getElementById("pro").value = progress.length * 100;
  document.getElementById("pro").max = all.length * 100;
  let going = JSON.parse(localStorage.getItem("ongoing-task") || "[]");
  document.getElementById("ongoing").innerText = going.length;
  document.getElementById("going").value = going.length * 100;
  document.getElementById("going").max = all.length * 100;
  let cancel = JSON.parse(localStorage.getItem("delete-task") || "[]");
  document.getElementById("canceled").innerText = cancel.length;
  document.getElementById("cancel").value = cancel.length * 100;
  document.getElementById("cancel").max = all.length * 100;
}

function setUsername() {
  let user = grabUsername();
  document.getElementById("user").innerHTML = user.toUpperCase();
}
function Redirect(item) {
  let user = grabUsername();
  let loc = item.id;
  window.location.href =
    "http://localhost/fullstack/Todo%20Website/Pages/" +
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
