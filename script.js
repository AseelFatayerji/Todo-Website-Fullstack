let count = 0;

function checkinfo() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  if (user == "AdminSEF123" && pass == "SeF@ctORy$$456") {
    window.location.href = "/board.html";
    console.log("done");
  } else {
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}
function additem() {
  let node = document.createElement("li");
  let item = document.getElementById("item").value;
  let check = document.createElement("input");
  let bullet = document.createElement("i");

  bullet.className = "fa-regular fa-circle-dot item";

  node.className ="text"
  node.id = count;
  check.id = count;
  count++;
  check.type = "checkbox";
  check.className = "checkbox-round";
  check.addEventListener("click", function handleClick() {
    let list = document.getElementById(this.id);
    list.remove();
  });
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
    node.className = "alerttext";
    node.replace(alert, node.firstChild)

  }


}
