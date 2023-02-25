//calling event when login
document.getElementById("loginBTN").addEventListener("click", login)

function login(e) {
    e.preventDefault() //this will prevent page to refresh
    // getting values from user
    let emailEntered = document.getElementById("email").value;
    let passwordEntered = document.getElementById("password").value;

    //getting data from localstorage
    let storedUsers = JSON.parse(localStorage.getItem("usersData"))
    console.log(storedUsers)

    if (storedUsers == null) {
        document.getElementById("emailError").innerHTML = "EMAIL PASSWORD INCORRECT"
        console.log("#")
    } else {
        let currentUser = storedUsers.find(e => e.email == emailEntered)
        console.log(currentUser)
        if (currentUser.email == emailEntered && currentUser.password == passwordEntered) {
            moveToDashboard()
            let current = {
                currentName: currentUser.username,
                userId: currentUser.id
            }
            let currentuser = JSON.stringify(current)
            localStorage.setItem("currentUser", currentuser)
        } else {
            document.getElementById("emailError").innerHTML = "EMAIL PASSWORD INCORRECT"
            console.log("#")
        }
    }
}

function moveToDashboard() {
    location.href = "./Assets/Assets/Index.html"
}