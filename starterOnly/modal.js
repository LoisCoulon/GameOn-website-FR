function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const btnClose = document.querySelector(".close");
const btnSubmit = document.getElementById("btn-submit");
const form = document.getElementById("form");
const success = document.getElementById("success");

//Error span selectors
const noFirst = document.getElementById("no_first");
const noLast = document.getElementById("no_last");
const noMail = document.getElementById("no_email");
const noBirth = document.getElementById("no_birth");
const noQuant = document.getElementById("no_num");
const noCity = document.getElementById("no_city");
const noCheck = document.getElementById("no_check");

//input selectors
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputMail = document.getElementById("email");
const inputBirth = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const inputCheckbox = document.getElementById("checkbox1");
//All inputs named location
const inputLocation = document.getElementsByName("location");

//error messages
const errorMessages = {
  firstName: "Veuillez entrer un prénom comportant 2 caractères ou plus.",
  reg: "Veuillez entrer des caractères valides",
	lastName: "Veuillez entrer un nom comportant 2 caractères ou plus.",
	email: "Veuillez entrer une adresse email valide.",
	birthdate: "Veuillez entrer votre date de naissance",
	quantity: "Veuillez entrer un nombre valide.",
	location: "Veuillez choisir une ville.",
	checkbox: "Veuillez accepter les conditions d'utilisations.",
};

//regex
const nameRegex = /^[a-z-éèêëïîùüû\s]+$/i;
const emailRegex = RegExp(/^[a-z0-9._-]+@[a-z_]+?\.[a-z]{2,3}$/);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
btnClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//retourne un message d'erreur pour l'id concerné
function errorMessage(idName) {
  idName.style.display = "inline"
  switch(idName) {
    case noFirst : idName.innerText = (errorMessages.firstName);
    break;
    case noLast : idName.innerText = (errorMessages.lastName);
    break;
    case noMail : idName.innerText = (errorMessages.email);
    break;
    case noBirth : idName.innerText = (errorMessages.birthdate);
    break;
    case noQuant : idName.innerText = (errorMessages.quantity);
    break;
    case noCity : idName.innerText = (errorMessages.location);
    break;
    case noCheck : idName.innerText = (errorMessages.checkbox);
    break;
  }
}

//Vérification de la validité du prénom
function isFirstValid() {
  if (inputFirst.value.length >= 2){
    if (nameRegex.test(inputFirst.value)) {
      noFirst.style.display = "none"
      return true;
    } else {
      noFirst.style.display = "inline"
      noFirst.innerText = (errorMessages.reg)
      return false;
    }
  } else{
    errorMessage(noFirst)
    return false;
  }
}

//Vérification de la validité du nom
function isLastValid() {
  if (inputLast.value.length >= 2) {
    if (nameRegex.test(inputLast.value)) {
      noLast.style.display = "none"
      return true;
    } else {
      noLast.style.display = "inline"
      noLast.innerText = (errorMessages.reg)
      return false;
    }
  } else {
    errorMessage(noLast)
    return false;
  }
}

//Vérification de la validité de l'email
function isMailValid() {
  if (emailRegex.test(inputMail.value)) {
    noMail.style.display = "none"
    return true;
  } else {
    errorMessage(noMail)
    return false;
  }
}

//Vérification de la validité de la date de naissance
function isBirthValid() {
  if (inputBirth.value != 0) {
    noBirth.style.display = "none";
    return true;
  } else {
    errorMessage(noBirth)
    return false;
  }
 
}

//Vérification de la validité du nombre de participations
function isQuantityValid() {
  if (inputQuantity.value >= 0 && isNaN(inputQuantity.value) === false && inputQuantity.value !== "") {
    noQuant.style.display = "none"
    return true;
  } else {
    errorMessage(noQuant)
    return false
  }
}

//Vérification de la ville sélectionnée
function isCityValid() {
  let counter = 0
  inputLocation.forEach(function(location){
    if (location.checked) {
      counter++
    }
  })

  if (counter !== 0) {
    noCity.style.display = "none"
    return true
  } else {
    errorMessage(noCity)
    return false
  }
}

//Vérification du cochage des conditions
function isCheckboxValid() {
  if (inputCheckbox.checked) {
    noCheck.style.display = "none"
    return true
  } else{
    errorMessage(noCheck)
    return false
  }
}

inputFirst.addEventListener('blur', isFirstValid);
inputLast.addEventListener('blur', isLastValid);
inputMail.addEventListener('blur', isMailValid);
inputBirth.addEventListener('change', isBirthValid);
inputQuantity.addEventListener('change', isQuantityValid);
form.addEventListener('change', isCityValid);
inputCheckbox.addEventListener('change', isCheckboxValid);

//vérification de la validité du formulaire
btnSubmit.addEventListener('click', function(e) {
  e.preventDefault()

  let isFormValid = true
  if (!isFirstValid() || !isLastValid() || !isMailValid() || !isBirthValid() || !isQuantityValid() || !isCityValid() || !isCheckboxValid()){
    isFormValid = false
  }

  //Si le formulaire est valide on ferme la fenêtre et on affiche un message
  if (isFormValid) {
    closeModal();
    success.style.display = "inline";
  }
});