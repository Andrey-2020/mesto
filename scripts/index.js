import Card from './Card.js';
import FormValidator from './FormValidator.js';
const initialCards = [
    {
        name: "Архыз",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];
const popup = document.querySelector(".popup_type_edit");
const openButton = document.querySelector(".profile__button_edit");
const places = document.querySelector(".places");
const formElement = document.querySelector(".form_type_edit");
const profilename = document.querySelector(".profile__autor");
const profilejob = document.querySelector(".profile__profession");
const nameInput = formElement.querySelector(".form__input_type_name-input");
const jobInput = formElement.querySelector(".form__input_type_job-input");
const addpopup = document.querySelector(".popup_type_add");
const closeAddButton = addpopup.querySelector(".popup__button");
const addButton = document.querySelector(".profile__button_add");
const popupImg = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const imagePopupCaption = popupImg.querySelector(".popup__caption")
const imagePopupPicture = popupImg.querySelector(".popup__image")
function openModal(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}
function closeModal(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
}
function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closeModal(openedPopup);
    }
}
function handleCardClick(name, link) {
    openModal(popupImg)
    imagePopupPicture.src = link
    imagePopupCaption.textContent = name
}


openButton.addEventListener("click", function () {
    openModal(popup);
    nameInput.value = profilename.textContent;
    jobInput.value = profilejob.textContent;
})


popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closeModal(popup);
        }
        if (evt.target.classList.contains("popup__button")) {
            closeModal(popup);
        }
    });
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profilename.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;

    closeModal(popup);
}

formElement.addEventListener("submit", handleFormSubmit);


closeAddButton.addEventListener("click", function () {
    closeModal(addpopup);
});
addButton.addEventListener("click", function () {
    openModal(addpopup);
});

function createCard(item, handleCardClick, template) {
    const card = new Card(item, handleCardClick, template);
    return card.renderCard()
}
initialCards.reverse().forEach((item) => {
    places.prepend(createCard(item, handleCardClick, ".item-template"))
});

const formAddElement = document.querySelector(".form_type_add");
const nameAdd = formAddElement.querySelector(".form__input_type_name");
const link = formAddElement.querySelector(".form__input_type_link");

function handleFormAddCardSubmit(evt) {
    evt.preventDefault();
    places.prepend(createCard({ name: nameAdd.value, link: link.value }, handleCardClick, ".item-template"));
    closeModal(addpopup);
    nameAdd.value = '';
    link.value = '';
    valid1.enableValidation()
    valid2.enableValidation()
}

formAddElement.addEventListener("submit", handleFormAddCardSubmit);

const valid1 = new FormValidator({
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}, ".form_type_edit")
const valid2 = new FormValidator({
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}, ".form_type_add")
// Вызовем функцию

valid1.enableValidation()
valid2.enableValidation()
