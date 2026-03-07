
document.getElementById("btn-signIn").addEventListener("click", function(event) {
    
    event.preventDefault(); 

    const nameInput = document.getElementById("input-name");
    const userName = nameInput.value;
    
    const passwordInput = document.getElementById("input-password");
    const password = passwordInput.value;

    if(userName === "admin" && password === "admin123") {
        alert("SignIn Success");
        window.location.href = "home.html"; 
    } else {
        alert("Wrong Username or Password");
    }
});