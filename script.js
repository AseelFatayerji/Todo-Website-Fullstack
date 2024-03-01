let count = 0;
window.onload = function() {
    if ( sessionStorage.getItem('user') == "user"){
        count = 0
        return
    }
    console.log(sessionStorage.getItem('user'));
    document.getElementById('list').innerHTML = sessionStorage.getItem('user');
}
function removeitem(event) {    
    let id = event.target.parentElement.id + "main";
    let item = document.getElementById(id);
    item.remove();
    count--;
  };

function checkinfo() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  if (user == "AdminSEF123" && pass == "SeF@ctORy$$456") {
    window.location.href = "/board.html";
    console.log("done");
  } else {
    let pop = document.getElementById("popup");
    pop.className = "show";
  }
}
function closepop(){
  let pop = document.getElementById("popup");
    pop.className = "hide";
}
function additem() {
  let node = document.createElement("li");
  let item = document.getElementById("item").value;
  let check = document.createElement("i");
  let bullet = document.createElement("i");

  bullet.className = "fa-solid fa-star-of-life item";

  node.className ="text"
  
  check.innerHTML = '<i class="fa-solid fa-trash-can trash" onclick="removeitem(event)"> </i>'
  node.id = count +"main";
  check.id = count+"";
  count++;

  node.appendChild(bullet)
  node.appendChild(document.createTextNode(item));
  node.appendChild(check);
  document.getElementById("list").appendChild(node);

  if (document.getElementById("dates").checked) {
    let dates = document.createElement("INPUT");
    dates.setAttribute("type", "date");
    dates.setAttribute("value", "02-28-2024");
    node.insertBefore(dates,node.lastChild)
  }
  if (document.getElementById("imp").checked) {
    let alert = document.createElement("i");
    alert.className = "fa-solid fa-circle-exclamation item";
    node.className = "important";
    node.replaceChild(alert, node.firstChild);

  }
    node.appendChild(check);
    document.getElementById("list").appendChild(node);
    sessionStorage.setItem('user', document.getElementById("list").innerHTML)
    sessionStorage.setItem('count',count)
}
