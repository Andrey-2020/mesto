import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css'
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { options, formEditElement, formUpdateAvatar, nameInput, professionInput, openButton, formAvatar, avatarEditButton, parametersCard, addButton, formAddElement } from '../utils/constant.js';


const api = new Api(options)
const cardsContainer = new Section({
    renderer: (card) => {
        const cardElement = createCard(card)
        cardsContainer.addItem(cardElement);
    }
}, ".places");

const userInfo = new UserInfo(".profile__autor", ".profile__profession", ".profile__avatar")

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


const updateAvatar = new PopupWithForm(".popup_type_update-avatar", (input) => {
    updateAvatar.renderLoading(true)
    api.updateUserTask(input, 'avatar')
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar);
            updateAvatar.close();
            valid3.disableSubmitButton();
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



const popupImage = new PopupWithForm(".popup_type_add",
    (formData) => {
        popupImage.renderLoading(true)
        api.createCardTask(formData)
            .then((card) => {
                valid2.disableSubmitButton();
                cardsContainer.renderItems([card]);
                popupImage.close()
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
            .finally(() => {
                popupImage.renderLoading(false)
            })
        valid2.disableSubmitButton()
    }, formAddElement)
addButton.addEventListener("click", function () {
    popupImage.open();
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
