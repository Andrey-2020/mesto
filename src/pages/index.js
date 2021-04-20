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
    },
    cardUrl: 'cards',
    userUrl: 'users/me'
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
const editPopup = new PopupWithForm(".popup_type_edit",
    (formData) => {
        editPopup.renderLoading(true)
        api.updateUserTask({
            name: `${formData.name}`,
            about: `${formData.profession}`,
            avatar: `${formData.avatar}`
        }, '')
            .then((userData) => {
                userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
                editPopup.close();
                valid1.disableSubmitButton()
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
            .finally(() => {
                editPopup.renderLoading(false)
            })
    }, formEditElement
)
const openButton = document.querySelector(".profile__button_edit");
openButton.addEventListener("click", function () {
    editPopup.open();
    const info = userInfo.getUserInfo()
    nameInput.value = info.name
    professionInput.value = info.profession;
});
editPopup.setEventListeners()

let userId;
Promise.all([api.getCardTasks(), api.getUserTasks()])
    .then((res) => {
        userId = res[1]._id;
        cardsContainer.renderItems(res[0]);

        userInfo.setUserInfo(res[1].name, res[1].about, res[1].avatar)
    })
    .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))


const formAvatar = document.querySelector(".form_type_update-avatar");
const avatarEditButton = document.querySelector(".profile__cover-avatar");
const updateAvatar = new PopupWithForm(".popup_type_update-avatar", (input) => {
    updateAvatar.renderLoading(true)
    api.updateUserTask(input, 'avatar')
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar)
            updateAvatar.close();
        }, '')
        .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
        .finally(() => {
            updateAvatar.renderLoading(false)
        })
    valid3.disableSubmitButton()
}, formAvatar)
avatarEditButton.addEventListener("click", () => {
    updateAvatar.open()
})
updateAvatar.setEventListeners()



const parametersCard = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}

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
        popupImage.renderLoading(true)
        api.createTask(formData, 'cards')
            .then((card) => {
                cardsContainer.renderItems([card]);
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
            .finally(() => {
                popupImage.renderLoading(false)
            })
        valid2.disableSubmitButton()
        popupImage.close()
    }, formAddElement)
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
