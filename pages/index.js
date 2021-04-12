import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'

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

const openButton = document.querySelector(".profile__button_edit");
const places = document.querySelector(".places");
const addButton = document.querySelector(".profile__button_add");

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

const nameInput = document.querySelector(".form__input_type_name-input")
const professionInput = document.querySelector(".form__input_type_job-input")

const formEditElement = document.querySelector(".form_type_edit");
const userInfo = new UserInfo(".profile__autor", ".profile__profession")
const editPopup = new PopupWithForm(".popup_type_edit",
    (formData) => {
        userInfo.setUserInfo(formData.name, formData.profession)
        valid1.disableSubmitButton()
        editPopup.close();
    }, formEditElement
)
openButton.addEventListener("click", function () {
    editPopup.open();
    const info = userInfo.getUserInfo()
    nameInput.value = info.name
    professionInput.value = info.profession;
});
editPopup.setEventListeners()

function createCard(item) {
    const card = new Card(item, handleCardClick, ".item-template");
    return card.renderCard();
}
const cardsContainer = new Section({
    items: initialCards,
    renderer: (card) => {
        const cardElement = createCard(card)
        cardsContainer.addItem(cardElement);
    }
}, places)
cardsContainer.renderItems()
const formAddElement = document.querySelector(".form_type_add");

const popupImage = new PopupWithForm(".popup_type_add",
    (formData) => {
        const cardElement = createCard(formData)
        places.prepend(cardElement);
        valid2.disableSubmitButton()
        popupImage.close()
    }, formAddElement
)
addButton.addEventListener("click", function () {
    popupImage.open();
    valid2.disableSubmitButton() 
});
popupImage.setEventListeners()


const valid1 = new FormValidator(parametersCard, formEditElement)
const valid2 = new FormValidator(parametersCard, formAddElement)
// Вызовем функцию
valid2.enableValidation()

valid1.enableValidation()
