const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


let popup = document.querySelector(".popup");
let openButton = document.querySelector(".profile__button_edit");
let closeButton = popup.querySelector(".popup__button");
let togglePopup = () => {
    popup.classList.toggle("popup_opened")
}

let formElement = document.querySelector(".form")
let profilename = document.querySelector(".profile__autor")
let profilejob = document.querySelector(".profile__profession")
let nameInput = formElement.querySelector(".form__item_type_name-input")
let jobInput = formElement.querySelector(".form__item_type_job-input")
openButton.addEventListener("click", function () {
    togglePopup()
    nameInput.value = profilename.textContent
    jobInput.value = profilejob.textContent
})

closeButton.addEventListener("click", togglePopup)
popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
        togglePopup()
    }
})




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    profilename.textContent = nameInput.value
    profilejob.textContent = jobInput.value

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    togglePopup()
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

let addpopup = document.querySelector(".popup-add");
let closeAddButton = addpopup.querySelector(".popup-add__button");
let addButton = document.querySelector(".profile__button_add");
let toggleAddPopup = () => {
    addpopup.classList.toggle("popup_opened")
}
closeAddButton.addEventListener("click", toggleAddPopup)
addButton.addEventListener("click", function () {
    toggleAddPopup()

})

const places = document.querySelector(".places")
const itemTemplate = document.querySelector(".item-template").content;

initialCards.forEach((item) => {
    renderCard(item.name, item.link)
});
let popupImg = document.querySelector(".popup-image");
let closeImgButton = document.querySelector(".popup-image__button");
let toggleImgPopup = () => {
    popupImg.classList.toggle("popup_opened")
}
function renderCard(name, link) {
    const htmlElement = itemTemplate.querySelector('.place').cloneNode(true);
    let photo = htmlElement.querySelector(".place__image");
    const like = htmlElement.querySelector('.place__like')
    like.addEventListener("click", function () {
        like.classList.toggle("place__like_active")
    });
    const deleteCard = htmlElement.querySelector('.place__delete')
    deleteCard.addEventListener("click", function () {
        const deleteItem = deleteCard.closest('.place')
        deleteItem.remove()
    });
    photo.addEventListener("click", function () {
        toggleImgPopup()
        popupImg.querySelector('.popup__caption').textContent = name;
        popupImg.querySelector(".popup__image").setAttribute('src', link);
        popupImg.querySelector(".popup__image").setAttribute('alt', name);
    })

    htmlElement.querySelector('.place__title').textContent = name;
    htmlElement.querySelector(".place__image").setAttribute('src', link);
    htmlElement.querySelector(".place__image").setAttribute('alt', name);
    places.append(htmlElement);

}
closeImgButton.addEventListener("click", toggleImgPopup)

let formAddElement = document.querySelector(".form-add")
function handleFormAddSubmit(evt) {
    evt.preventDefault();
    let nameAdd = formAddElement.querySelector(".form-add__item_type_name");
    let link = formAddElement.querySelector(".form-add__item_type_link");
    renderCard(nameAdd.value, link.value)
    toggleAddPopup();

}

formAddElement.addEventListener('submit', handleFormAddSubmit);
