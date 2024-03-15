function CheckPass() {
 
    let pass = document.getElementById('pass').value;
    let confirm_pass = document.getElementById('confirm').value;
    if (pass != confirm_pass) {
        document.getElementById('alert').classList.remove("hide");
        document.getElementById('icon').classList.add("alert-border");
        document.getElementById('confirm').className ="alert-border";
    }
    else{
        document.getElementById('alert').classList.add("hide");
        document.getElementById('icon').classList.remove("alert-border");
        document.getElementById('confirm').className ="";
    }
}