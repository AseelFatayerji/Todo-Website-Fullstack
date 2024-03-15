window.onload = () =>{
    setUsername()
}

function setUsername(){
    let user = grabUsername()
    document.getElementById("Username").innerText = user.toUpperCase();
}
function Redirect(item){
    let user = grabUsername()
    let loc =  item.id;
    window.location.href = "http://localhost/fullstack/Todo%20Website/Pages/"+loc+"?username="+user;    
}
function grabUsername(){
    let user = "";
    let url = window.location.href;
    let index = 0;
    for(i = 0; i < url.length;i++){
        if(url[i] == "="){
            index = i+1;
            break;
        }
    }
    for(i = index; i < url.length;i++){
        user += url[i];
    }
    return user;
}