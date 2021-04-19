import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css'
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'c4582077-8562-4c7d-9d43-345a93912f9e',
        'Content-Type': 'application/json'
    }
}

const api = new Api(options)
const cardsContainer = new Section({
    renderer: (card) => {
        const cardElement = createCard(card)
        cardsContainer.addItem(cardElement);
    }
}, ".places");


const userInfo = new UserInfo(".profile__autor", ".profile__profession", ".profile__avatar")
const formEditElement = document.querySelector(".form_type_edit");
const formUpdateAvatar = document.querySelector(".form_type_update-avatar");
const nameInput = document.querySelector(".form__input_type_name-input")
const professionInput = document.querySelector(".form__input_type_job-input")
const submitEditButton = formEditElement.querySelector(".form__button")
const editPopup = new PopupWithForm(".popup_type_edit",
    (formData) => {
        api.updateTask({
            name: `${formData.name}`,
            about: `${formData.profession}`,
            avatar: `${formData.avatar}`
        }, 'users/me')
            .then((userData) => {
                userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
                editPopup.renderLoading(true, submitEditButton)
                editPopup.close();
            })
            .catch(err => Promise.reject(err))
            .finally(() => {
                editPopup.renderLoading(false, submitEditButton)
            })
        valid1.disableSubmitButton()
    }, formEditElement, api
)

let userId;
Promise.all([api.getTasks('cards'), api.getTasks('users/me')])
    .then((res) => {
        userId = res[1]._id;
        cardsContainer.renderItems(res[0]);

        userInfo.setUserInfo(res[1].name, res[1].about, res[1].avatar)

        openButton.addEventListener("click", function () {
            editPopup.open();
            const info = userInfo.getUserInfo()
            nameInput.value = info.name
            professionInput.value = info.profession;
        });
        editPopup.handleUpdate()
    })
    .catch(err => Promise.reject(err))


const formAvatar = document.querySelector(".form_type_update-avatar");
const avatarEditButton = document.querySelector(".profile__cover-avatar");
const avatarSubmitButton = document.querySelector(".form__button_type_update-avatar")
const updateAvatar = new PopupWithForm(".popup_type_update-avatar", (input) => {
    api.updateTask(input, "users/me/avatar")
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar)
            updateAvatar.renderLoading(true, avatarSubmitButton)
            updateAvatar.close();
        })
        .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
        .finally(() => {
            updateAvatar.renderLoading(false, avatarSubmitButton)
        })
    valid3.disableSubmitButton()
}, formAvatar, api)
avatarEditButton.addEventListener("click", () => {
    updateAvatar.open()
})
updateAvatar.handleUpdate()



const parametersCard = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}

const openButton = document.querySelector(".profile__button_edit");
const addButton = document.querySelector(".profile__button_add");

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}



const popupConfirm = new PopupWithConfirm('.popup_type_confirm', api);

function createCard(data) {
    const cardPrototype = new Card(data, {
        'handleCardClick': handleCardClick,
        'handlePopupOpen': (id, deleteFunc) => {  // Функция открытия попапа 
            popupConfirm.open(id, deleteFunc);
        }
    }, {
        'cardSelector': ".item-template",
        'api': api,
        'userId': userId,
    })
    return cardPrototype.renderCard();
}
popupConfirm.setEventListeners()



const formAddElement = document.querySelector(".form_type_add");
const popupImage = new PopupWithForm(".popup_type_add",
    (formData) => {
        cardsContainer.renderItems([formData]);
        valid2.disableSubmitButton()
        popupImage.close()
    }, formAddElement, api)
addButton.addEventListener("click", function () {
    popupImage.open();
    valid2.disableSubmitButton()
    valid2.resetValidation()
});
popupImage.setEventListeners()


const valid1 = new FormValidator(parametersCard, formEditElement)
const valid2 = new FormValidator(parametersCard, formAddElement)
const valid3 = new FormValidator(parametersCard, formUpdateAvatar)
// Вызовем функцию
valid2.enableValidation()
valid3.enableValidation()
valid1.enableValidation()
