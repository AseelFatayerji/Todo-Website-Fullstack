window.onload = () => {
    displayList()
}

async function displayList(){
    const lists = await fetch('../PHP/DisplayLists.php')
      .then(function( response){        
        const list = response.json()
        list.then(function( ans){
            console.log(ans)
        })
    })
    .catch(function (err) {
      console.log(err);
    });
}