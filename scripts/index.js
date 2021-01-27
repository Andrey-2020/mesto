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


let popup = document.querySelector(".popup_type_edit");
let openButton = document.querySelector(".profile__button_edit");
let closeButton = popup.querySelector(".popup__button");
let togglePopup = () => {
    popup.classList.toggle("popup_opened")
}

let formElement = document.querySelector(".form_type_edit")
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


function handleFormSubmit(evt) {
    evt.preventDefault();
    profilename.textContent = nameInput.value
    profilejob.textContent = jobInput.value

    togglePopup()
}

formElement.addEventListener('submit', handleFormSubmit);

let addpopup = document.querySelector(".popup_type_add");
let closeAddButton = addpopup.querySelector(".popup__button");
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

let popupImg = document.querySelector(".popup_type_image");
let closeImgButton = popupImg.querySelector(".popup__button_type_image");
let toggleImgPopup = () => {
    popupImg.classList.toggle("popup_opened")
}

function handleDelete(item) {
    const deleteCard = item.querySelector('.place__delete')
    deleteCard.addEventListener("click", function () {
        const deleteItem = deleteCard.closest('.place')
        deleteItem.remove()
    });
}
function handleLike(item) {
    const like = item.querySelector('.place__like')
    like.addEventListener("click", function () {
        like.classList.toggle("place__like_active")
    });
}
function handleImgPopup(item, name, link) {
    let photo = item.querySelector(".place__image");
    photo.addEventListener("click", function () {
        toggleImgPopup()
        popupImg.querySelector('.popup__caption').textContent = name;
        popupImg.querySelector(".popup__image").setAttribute('src', link);
        popupImg.querySelector(".popup__image").setAttribute('alt', name);
    })
}
function renderCard(name, link) {
    const htmlElement = itemTemplate.querySelector('.place').cloneNode(true);
    handleLike(htmlElement);
    handleDelete(htmlElement);
    handleImgPopup(htmlElement, name, link);
    htmlElement.querySelector('.place__title').textContent = name;
    htmlElement.querySelector(".place__image").setAttribute('src', link);
    htmlElement.querySelector(".place__image").setAttribute('alt', name);
    places.prepend(htmlElement);
}

initialCards.reverse().forEach((item) => {
    renderCard(item.name, item.link)
});
closeImgButton.addEventListener("click", toggleImgPopup)

let formAddElement = document.querySelector(".form_type_add")
function handleFormAddCardSubmit(evt) {
    evt.preventDefault();
    let nameAdd = formAddElement.querySelector(".form__item_type_name");
    let link = formAddElement.querySelector(".form__item_type_link");
    renderCard(nameAdd.value, link.value)
    toggleAddPopup();

}

formAddElement.addEventListener('submit', handleFormAddCardSubmit);
