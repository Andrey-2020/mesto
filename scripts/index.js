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
const closeButton = popup.querySelector(".popup__button");
function openModal(item) {
  item.classList.add("popup_opened");
}
function closeModal(item) {
  item.classList.remove("popup_opened");
}

const formElement = document.querySelector(".form_type_edit");
const profilename = document.querySelector(".profile__autor");
const profilejob = document.querySelector(".profile__profession");
const nameInput = formElement.querySelector(".form__input_type_name-input");
const jobInput = formElement.querySelector(".form__input_type_job-input");
openButton.addEventListener("click", function () {
  openModal(popup);
  nameInput.value = profilename.textContent;
  jobInput.value = profilejob.textContent;
});

closeButton.addEventListener("click", function () {
  closeModal(popup);
});
function closeOverlayModal(item) {
  item.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(item);
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(item);
    }
  })
}

closeOverlayModal(popup);
function handleFormSubmit(evt) {
  evt.preventDefault();
  profilename.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;

  closeModal(popup);
}

formElement.addEventListener("submit", handleFormSubmit);

const addpopup = document.querySelector(".popup_type_add");
const closeAddButton = addpopup.querySelector(".popup__button");
const addButton = document.querySelector(".profile__button_add");
closeAddButton.addEventListener("click", function () {
  closeModal(addpopup);
});
addButton.addEventListener("click", function () {
  openModal(addpopup);
});
closeOverlayModal(addpopup);
const places = document.querySelector(".places");
const itemTemplate = document.querySelector(".item-template").content;

const popupImg = document.querySelector(".popup_type_image");
const closeImgButton = popupImg.querySelector(".popup__button_type_image");

function handleDelete(item) {
  const deleteCard = item.querySelector(".place__delete");
  deleteCard.addEventListener("click", function () {
    const deleteItem = deleteCard.closest(".place");
    deleteItem.remove();
  });
}
function handleLike(item) {
  const like = item.querySelector(".place__like");
  like.addEventListener("click", function () {
    like.classList.toggle("place__like_active");
  });
}
function handleImgPopup(item, name, link) {
  const photo = item.querySelector(".place__image");
  photo.addEventListener("click", function () {
    openModal(popupImg);
    popupImg.querySelector(".popup__caption").textContent = name;
    popupImg.querySelector(".popup__image").setAttribute("src", link);
    popupImg.querySelector(".popup__image").setAttribute("alt", name);
  });
}
function renderCard(name, link) {
  const htmlElement = itemTemplate.querySelector(".place").cloneNode(true);
  handleLike(htmlElement);
  handleDelete(htmlElement);
  handleImgPopup(htmlElement, name, link);
  htmlElement.querySelector(".place__title").textContent = name;
  htmlElement.querySelector(".place__image").setAttribute("src", link);
  htmlElement.querySelector(".place__image").setAttribute("alt", name);
  places.prepend(htmlElement);
}

initialCards.reverse().forEach((item) => {
  renderCard(item.name, item.link);
});
closeImgButton.addEventListener("click", function () {
  closeModal(popupImg);
});
closeOverlayModal(popupImg);
const formAddElement = document.querySelector(".form_type_add");
const nameAdd = formAddElement.querySelector(".form__input_type_name");
const link = formAddElement.querySelector(".form__input_type_link");

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderCard(nameAdd.value, link.value);
  closeModal(addpopup);
}

formAddElement.addEventListener("submit", handleFormAddCardSubmit);
