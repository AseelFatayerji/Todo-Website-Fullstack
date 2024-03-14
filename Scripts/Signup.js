function CheckPass() {
 
    let pass = document.getElementById('pass').value;
    let confirm_pass = document.getElementById('confirm').value;
    console.log("hi");
    if (pass != confirm_pass) {
        document.getElementById('alert').classList.remove("hide");
    }
    else{
        document.getElementById('alert').classList.add("hide");
    }
}