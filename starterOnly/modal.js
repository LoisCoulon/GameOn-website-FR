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
const modalBody = document.querySelector(".modal-body");
const btnClose = document.querySelector(".btn-close");

const closeCross = document.querySelector(".close");
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
closeCross.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//active la classe outline
function addOutline(el) {
  return el.classList.add("outline")
}

//Désactive les messages d'erreur
function removeChanges(text, el) {
  text.style.display = "none"
  el.classList.remove("outline")
}

//retourne un message d'erreur pour l'élément concerné
function errorMessage(text, el) {
  text.style.display = "inline"
  switch(text) {
    case noFirst : text.innerText = (errorMessages.firstName), addOutline(el);
    break;
    case noLast : text.innerText = (errorMessages.lastName), addOutline(el);
    break;
    case noMail : text.innerText = (errorMessages.email), addOutline(el);
    break;
    case noBirth : text.innerText = (errorMessages.birthdate), addOutline(el);
    break;
    case noQuant : text.innerText = (errorMessages.quantity), addOutline(el);
    break;
    case noCity : text.innerText = (errorMessages.location);
    break;
    case noCheck : text.innerText = (errorMessages.checkbox);
    break;
  }
}

//Vérification de la validité du prénom
function isFirstValid() {
  if (inputFirst.value.length >= 2){
    if (nameRegex.test(inputFirst.value)) {
      removeChanges(noFirst ,inputFirst)
      return true;
    } else {
      noFirst.style.display = "inline"
      noFirst.innerText = (errorMessages.reg)
      inputFirst.classList.add("outline")
      return false;
    }
  } else{
    errorMessage(noFirst, inputFirst)
    return false;
  }
}

//Vérification de la validité du nom
function isLastValid() {
  if (inputLast.value.length >= 2) {
    if (nameRegex.test(inputLast.value)) {
      removeChanges(noLast ,inputLast)
      return true;
    } else {
      noLast.style.display = "inline"
      noLast.innerText = (errorMessages.reg)
      inputLast.classList.add("outline")
      return false;
    }
  } else {
    errorMessage(noLast, inputLast)
    return false;
  }
}

//Vérification de la validité de l'email
function isMailValid() {
  if (emailRegex.test(inputMail.value)) {
    removeChanges(noMail ,inputMail)
    return true;
  } else {
    errorMessage(noMail, inputMail)
    return false;
  }
}

//Vérification de la validité de la date de naissance
function isBirthValid() {
  if (inputBirth.value != 0) {
    removeChanges(noBirth ,inputBirth)
    return true;
  } else {
    errorMessage(noBirth, inputBirth)
    return false;
  }
 
}

//Vérification de la validité du nombre de participations
function isQuantityValid() {
  if (inputQuantity.value >= 0 && isNaN(inputQuantity.value) === false && inputQuantity.value !== "") {
    removeChanges(noQuant ,inputQuantity)
    return true;
  } else {
    errorMessage(noQuant, inputQuantity)
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

  //Si le formulaire est valide on affiche un message à la place du form
  if (isFormValid) {
    form.style.display = "none";
    success.style.display = "inline";
    modalBody.classList.add("modal-body-submit");
    btnClose.style.display = "block";
    btnClose.addEventListener("click", closeModal);
  }
});