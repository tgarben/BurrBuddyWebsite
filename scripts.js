"use strict"
function getCoffees(data){
    const cardDiv = document.getElementById("cards");

    let cardOutput = "";

    for(let coffee of data.coffees){
        cardOutput += `
                <a class="col" data-bs-toggle="modal" data-bs-target="#myModal" data-request="${coffee.id-1}">
                    <div class="card h-100">
                        <img src="${coffee.image}.png" id="cardImage" class="card-img-top" alt="Image of Coffee ">
                        <div class="card-body">
                            <h1 class="card-title m-2">${coffee.name}</h1>
                            <h2 class="card-text m-2">${coffee.roaster}</h2>
                        </div>
                    </div>
                </a>
        `;
    }
    cardDiv.innerHTML = cardOutput;

    $('#myModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var input = button.data('request'); // Extract info from data-* attributes
        let modalOutput = "";

        modalOutput = `
                        <div class="card-body">
                            <h1>Description:</h1>
                            <p id="descriptionTag"class="card-text m-2">${data.coffees[input].description}</p>
                            <a type="button" class="btn btn-outline-primary m-2" href="${data.coffees[input].purchaseLink}" target="_blank"><i class="bi bi-cart2"></i> Buy</a>
                        </div>
                    </div>
                </a>
        `;

        // Update the modal's content with the extracted data
        var modal = $(this);
        modal.find('.modal-title').text(data.coffees[input].name);
        modal.find('.modal-image').html(`<img src="${data.coffees[input].image}.png" class="card-img-top" alt="Image of Coffee "><p id="flavorNotes" class="mw-90 h-auto p-2">${data.coffees[input].flavorNotes}</p>`);
        modal.find('.modal-body').html(modalOutput);
    });
}

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

$( function() {
    var availableTags = [
      "Dark Roast",
      "Light Roast",
      "Bird Dog Beans",
      "Espresso",
      "Single Origin",
      "Chocolate",
      "Fruity",
      "Almond",
      "Orange",
      "Blueberry",
      "Cane Sugar",
      "Vanilla",
      "Green Apple",
      "Milk Chocolate",
      "Citrus",
      "Medium Roast",
      "Coffee Blend",
      "Natural Process",
      "Honey Process",
      "Brazil",
      "Paupa New Guinea",
      "Costa Rica",
      "Ethiopia",
      "Nicaragua",
      "Columbia",
      "Guatemala",
      "Tanzania",
      "Organic"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );


window.onload = function(){
    fetch("coffees.json")
        .then(response => response.json())
        .then(data => getCoffees(data));



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
            document.getElementById("logOutBtn").classList.remove("hidden")
            document.getElementById("searchDiv").classList.remove("hidden")
            document.getElementById("searchBtn").classList.remove("hidden")
        }else{
            location.href = "index.html"
        }
};

document.getElementById("nameSubmit").addEventListener("click", storeName);

document.getElementById("logOutBtn").addEventListener("click", function(){
    localStorage.setItem("currentState","loggedOut")
    location.reload()
});