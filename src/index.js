import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import '../pages/index.css'

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
const parametersCard = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}
const popup = document.querySelector(".popup_type_edit");
const openButton = document.querySelector(".profile__button_edit");
const places = document.querySelector(".places");
const formElement = document.querySelector(".form_type_edit");

const addpopup = document.querySelector(".popup_type_add");
const buttonElement = addpopup.querySelector(
    parametersCard.submitButtonSelector
);
const addButton = document.querySelector(".profile__button_add");
const popupImg = document.querySelector(".popup_type_image");


function handleCardClick(name, link) {
    new PopupWithImage(popupImg, name, link).open()
}

openButton.addEventListener("click", function () {
    new Popup(popup).open();
    new UserInfo(".form__input_type_name-input", ".form__input_type_job-input").getUserInfo()

})

function handleFormSubmit(evt) {
    evt.preventDefault();
    new UserInfo(".form__input_type_name-input", ".form__input_type_job-input").setUserInfo()

    new Popup(popup).close();

}

formElement.addEventListener("submit", handleFormSubmit);


addButton.addEventListener("click", function () {
    new Popup(addpopup).open()
});



const cardsContainer = new Section({
    items: initialCards,
    renderer: (card) => {
        const cardPrototip = new Card(card, handleCardClick, ".item-template")
        const cardElement = cardPrototip.renderCard()
        cardsContainer.addItem(cardElement);
    }
}, places)
cardsContainer.renderItems()
const formAddElement = document.querySelector(".form_type_add");

const popupImage = new PopupWithForm(addpopup,
    (formData) => {
        const card = new Card(formData, handleCardClick, ".item-template");
        const cardElement = card.renderCard()
        places.prepend(cardElement);
        buttonElement.classList.add(parametersCard.inactiveButtonClass);
        popupImage.close()
    }, formAddElement
)
popupImage.setEventListeners()


const valid1 = new FormValidator(parametersCard, ".form_type_edit")
const valid2 = new FormValidator(parametersCard, ".form_type_add")
// Вызовем функцию
valid2.enableValidation()

valid1.enableValidation()
