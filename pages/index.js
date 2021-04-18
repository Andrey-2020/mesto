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
    url: 'https://mesto.nomoreparties.co/v1/cohort-21/cards',
    headers: {
        authorization: 'c4582077-8562-4c7d-9d43-345a93912f9e',
        'Content-Type': 'application/json'
    }
}
const optionsUser = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-21/users/me',
    headers: {
        authorization: 'c4582077-8562-4c7d-9d43-345a93912f9e',
        'Content-Type': 'application/json'
    }
}
const api = new Api(options)
const apiUser = new Api(optionsUser)
let userId;
Promise.all([api.getTasks(), apiUser.getTasks()])
    .then((res) => {
        userId = res[1]._id;
        const cardsContainer = new Section({
            items: res[0],
            renderer: (card) => {
                const cardElement = createCard(card)
                cardsContainer.addItem(cardElement);
            }
        }, places);
        cardsContainer.renderItems();
    })


const formEditElement = document.querySelector(".form_type_edit");
const formUpdateAvatar = document.querySelector(".form_type_update-avatar");
const userInfo = new UserInfo(".profile__autor", ".profile__profession")
const nameInput = document.querySelector(".form__input_type_name-input")
const professionInput = document.querySelector(".form__input_type_job-input")
const name12 = document.querySelector(".profile__autor")
const profes12 = document.querySelector(".profile__profession")
const avatar = document.querySelector(".profile__avatar")
const submitEditButton = formEditElement.querySelector(".form__button")
apiUser.getTasks()
    .then(data => {
        console.log(data)
        name12.textContent = data.name;
        profes12.textContent = data.about;
        avatar.src = data.avatar;

        const editPopup = new PopupWithForm(".popup_type_edit",
            (formData) => {
                apiUser.updateTask({
                    name: `${formData.name}`,
                    about: `${formData.profession}`
                }, "")
                    .then((userData) => {
                        userInfo.setUserInfo(userData.name, userData.about)
                        renderLoading(true, submitEditButton, valid1)
                    })
                    .finally(() => {
                        renderLoading(false, submitEditButton, valid1)
                    })
                valid1.disableSubmitButton()
                editPopup.close();
            }, formEditElement, api
        )
        openButton.addEventListener("click", function () {
            editPopup.open();
            const info = userInfo.getUserInfo()
            nameInput.value = info.name
            professionInput.value = info.profession;
        });
        editPopup.setEventListeners()
    })



const formAvatar = document.querySelector(".form_type_update-avatar");
const avatarEditButton = document.querySelector(".profile__cover-avatar");
const avatarSubmitButton = document.querySelector(".form__button_type_update-avatar")
const updateAvatar = new PopupWithForm(".popup_type_update-avatar", (input) => {
    apiUser.updateTask(input, "avatar")
        .then((data) => {
            avatar.src = data.avatar;
            renderLoading(true, avatarSubmitButton, valid3)
            // updateAvatar.close();
        })
        .finally(() => {
            renderLoading(false, avatarSubmitButton, valid3)
            updateAvatar.close();
        })

        .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    valid3.disableSubmitButton()
}, formAvatar, apiUser)
avatarEditButton.addEventListener("click", () => {
    updateAvatar.open()
})
updateAvatar.setEventListeners()

function renderLoading(isLoading, button, valid) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
        //   valid.disableSubmitButton()
    } else {
        button.textContent = 'Сохранить';
    }
}


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



const popupConfirm = new PopupWithConfirm('.popup_type_confirm', api);

function createCard(data) {
    const cardPrototype = new Card(data, handleCardClick, (id, deleteFunc) => {  // Функция открытия попапа 
        popupConfirm.open(id, deleteFunc);                   
    }, ".item-template", api, userId)
    return cardPrototype.renderCard();
}
popupConfirm.setEventListeners()



const formAddElement = document.querySelector(".form_type_add");
const popupImage = new PopupWithForm(".popup_type_add",
    (formData) => {
        const cardElement = createCard(formData)
        places.prepend(cardElement);
        valid2.disableSubmitButton()
        popupImage.close()
    }, formAddElement, api)
addButton.addEventListener("click", function () {
    popupImage.open();
    valid2.disableSubmitButton()
});
popupImage.setEventListenersn()


const valid1 = new FormValidator(parametersCard, formEditElement)
const valid2 = new FormValidator(parametersCard, formAddElement)
const valid3 = new FormValidator(parametersCard, formUpdateAvatar)
// Вызовем функцию
valid2.enableValidation()
valid3.enableValidation()
valid1.enableValidation()
