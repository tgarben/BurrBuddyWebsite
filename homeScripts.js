"use strict"

document.getElementById("logInBtn").addEventListener("click", function(){
    localStorage.setItem("currentState","loggedIn")
    location.reload()
});
document.getElementById("logOutBtn").addEventListener("click", function(){
    localStorage.setItem("currentState","loggedOut")
    location.reload()
});


function storeName(e){
	e.preventDefault();
	let welcomeP = document.getElementById("welcomeP");
    let nameInput = document.getElementById("nameInput");
	if(localStorage.getItem("usersName") == nameInput.value){
		welcomeP.innerHTML = `Hello ${localStorage.getItem("usersName")}!`;
	}else{
		nameInput.classList.remove("errorInput");

		if(nameInput.value === ""){
			nameInput.classList.add("errorInput");
		}else{
			localStorage.setItem("usersName", nameInput.value);
			welcomeP.innerHTML = `Hello ${localStorage.getItem("usersName")}!`;

			nameInput.value = "";
		}
	}
}

document.getElementById("nameSubmit").addEventListener("click", storeName);

document.getElementById("adButton").addEventListener("click", function(){
    window.open(`https://apps.apple.com/us/app/burr-buddy/id1660156811`)
})

window.onload = function(){
    if(localStorage.getItem("usersName")){
        let nameInput = document.getElementById("nameInput");
        nameInput.value = `${localStorage.getItem("usersName")}`;
        welcomeP.innerHTML = `Hello ${localStorage.getItem("usersName")}!`;
    }else{
        welcomeP.innerHTML = `Hello New User!`;
    }

    if (!localStorage.getItem("currentState")){
        localStorage.setItem("currentState","loggedOut")
    }
    
    if (localStorage.getItem("currentState") == "loggedIn"){
        document.getElementById("coffeeNav").classList.remove("hidden")
        document.getElementById("settingsNav").classList.remove("hidden")
        document.getElementById("logInBtn").classList.add("hidden")
        document.getElementById("logOutBtn").classList.remove("hidden")
        document.getElementById("gearNav").classList.remove("hidden")
    }else{
        document.getElementById("coffeeNav").classList.add("hidden")
        document.getElementById("settingsNav").classList.add("hidden")
        document.getElementById("logOutBtn").classList.add("hidden")
        document.getElementById("logInBtn").classList.remove("hidden")
        document.getElementById("gearNav").classList.add("hidden")
    }
};