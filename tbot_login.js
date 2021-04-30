document.getElementById('login_button').addEventListener('click', store_username);

function store_username(){
    let username = document.querySelector("#username").value;
    localStorage.setItem('username', username);
    console.log(username);
}