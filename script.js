//localStorage.clear()

let passwordMatch = () => {
    let pass = document.getElementById("password").value
    let conpass = document.getElementById("confirmpassword").value

    if (pass != conpass) {
        document.getElementById("alert").innerHTML = "Passwords do not match"
    } else {
        document.getElementById("alert").innerHTML = " "
    }
}

document.querySelector('form').onsubmit = function (e) {
    e.preventDefault();//this will prevent refresh
        let pass = document.getElementById("password").value
        let conpass = document.getElementById("confirmpassword").value
    
        if (pass != conpass) {
            swal("Password Error", "...Password and Confirm Password are not same!");
        } else {
            let uname = document.getElementById("username").value; 
    let uemail = document.getElementById("email").value;
    let upassword = document.getElementById("password").value;
    let cpassword = document.getElementById("confirmpassword").value

    //managing needed data of user
    const userData = {
        username: uname,
        email: uemail,
        password: upassword,
        id: Math.floor(Math.random()*100001)+1001
    }

    //getting items from storage if any
    let users = localStorage.getItem("usersData")
    if (users == undefined) {
        users = []
    } else {
        users = JSON.parse(users)
    }
    
    //pushing user data to a Users ARRAY
    users.push(userData)

    //converting Users ARRAY to String and storing to data to store
    let data = JSON.stringify(users)
    localStorage.setItem("usersData", data)

    //Actions performed after submission for UX
    document.getElementById("formsubmitted").innerHTML = "Sign-Up Successfully"
    document.getElementById("username").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("confirmpassword").value = ""
        }
    }

