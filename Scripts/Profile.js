window.onload = () =>{
    setUsername()
}

function setUsername(){
    let user = grabUsername()
    document.getElementById("user").innerHTML = user.toUpperCase();
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
    for(let i = 0; i < url.length;i++){
        if(url[i] == "="){
            index = i+1;
            break;
        }
    }
    for(let i = index; i < url.length;i++){
        user += url[i];
    }
    user = user.replace("#","");
    return user;
}