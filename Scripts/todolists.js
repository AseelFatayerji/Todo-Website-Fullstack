window.onload = () => {
    displayList();
};
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
  user = user.replace("#","");
  return user;
}
async function displayList() {
  const lists = await fetch("../PHP/DisplayLists.php")
    .then(function (response) {
      let results = response.json();
      results.then(function (list) {
        let user = grabUsername()
        let user_items = [];
        for( let i = 0; i < list.length;i++){
            let temp = list[i];
            if(user == temp.name){
                user_items.push(temp)
            }
        }
        let list_items = [];
        for( let i = 0; i < user_items.length;i++){
            let temp = user_items[i];
            if( !list_items.includes(user_items[i].list) ){
                list_items.push(temp.list)
            }
        }
        for(let i = 0; i < list_items.length;i++){
            displayOneList(list_items, user_items);
        }
        
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}
function displayOneList(list_name,arr){
    let container = document.getElementById("lists")
    let card = document.createElement("div");
    let card_header = document.createElement("div");
    let card_body = document.createElement("div");
    let ul = document.createElement("ul");
    
    card.className = "list-card";
    card_header.className = "list_cardheader accent-bg";
    card_header.innerText = list_name;
    for(let i = 0; i < arr.length ;i++){
        let li = document.createElement("li");
        let item = document.createElement("div");
        let trash = document.createElement("i");
        item.className = "item floatcontainer space-between";
        trash.className = "fa-solid fa-trash-can trash";

        let temp = arr[i];
        if(temp.list == list_name){
            item.innerText = temp.item;
            item.appendChild(trash);
            li.appendChild(item);
            ul.appendChild(li)
        }
    }
    card_body.appendChild(ul)
    card.appendChild(card_header);
    card.appendChild(card_body);
    container.appendChild(card);
}
