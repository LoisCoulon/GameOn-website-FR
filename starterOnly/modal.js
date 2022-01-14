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
btnClose.addEventListener("click", close);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function close() {
  modalbg.style.display = "none";
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
    noFirst.style.display = "inline"
    noFirst.innerText = (errorMessages.firstName)
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
    noLast.style.display = "inline"
    noLast.innerText = (errorMessages.lastName)
    return false;
  }
}

//Vérification de la validité de l'email
function isMailValid() {
  if (emailRegex.test(inputMail.value)) {
    noMail.style.display = "none"
    return true;
  } else {
    noMail.style.display = "inline"
    noMail.innerText = (errorMessages.email)
    return false;
  }
}

//Vérification de la validité de la date de naissance
function isBirthValid() {
  if (inputBirth.value != 0) {
    noBirth.style.display = "none";
    return true;
  } else {
    noBirth.style.display = "inline"
    noBirth.innerText = (errorMessages.birthdate)
    return false;
  }
 
}

//Vérification de la validité du nombre de participations
function isQuantityValid() {
  if (inputQuantity.value >= 0 && isNaN(inputQuantity.value) === false && inputQuantity.value !== "") {
    noQuant.style.display = "none"
    return true;
  } else {
    noQuant.style.display = "inline"
    noQuant.innerText = (errorMessages.quantity)
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
    noCity.style.display = "inline"
    noCity.innerText = (errorMessages.location)
    return false
  }
}

//Vérification du cochage des conditions
function isCheckboxValid() {
  if (inputCheckbox.checked) {
    noCheck.style.display = "none"
    return true
  } else{
    noCheck.style.display = "inline"
    noCheck.innerText = (errorMessages.checkbox)
    return false
  }
}

form.addEventListener('input', isBirthValid);
form.addEventListener('input', isCheckboxValid);
form.addEventListener('input', isCityValid);
form.addEventListener('input', isFirstValid);
form.addEventListener('input', isLastValid);
form.addEventListener('input', isMailValid)
form.addEventListener('input', isQuantityValid)

//vérification de la validité du formulaire
btnSubmit.addEventListener('click', function(e) {
  e.preventDefault()

  let isFormValid = true
  if (!isFirstValid){
    isFormValid = false
  }

  if (!isLastValid){
    isFormValid = false
  }

  if (!isMailValid){
    isFormValid = false
  }

  if (!isBirthValid){
    isFormValid = false
  }

  if (!isQuantityValid){
    isFormValid = false
  }
  if (!isCityValid){
    isFormValid = false
  }
  if (!isCheckboxValid) {
    isFormValid = false
  }

  //Si le formulaire est valide on ferme la fenêtre et on affiche un message
  if (isFormValid) {
    modalbg.style.display = "none";
    success.style.display = "inline"
  }
})