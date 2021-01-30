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

const popups = document.querySelectorAll(".popup");

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

const addpopup = document.querySelector(".popup_type_add");
const closeAddButton = addpopup.querySelector(".popup__button");
const addButton = document.querySelector(".profile__button_add");
closeAddButton.addEventListener("click", function () {
  closeModal(addpopup);
});
addButton.addEventListener("click", function () {
  openModal(addpopup);
});
const places = document.querySelector(".places");
const itemTemplate = document.querySelector(".item-template").content;

const popupImg = document.querySelector(".popup_type_image");

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
function createCard(htmlElement, name, link) {
  handleLike(htmlElement);
  handleDelete(htmlElement);
  handleImgPopup(htmlElement, name, link);
  htmlElement.querySelector(".place__title").textContent = name;
  htmlElement.querySelector(".place__image").setAttribute("src", link);
  htmlElement.querySelector(".place__image").setAttribute("alt", name);
}
function renderCard(name, link) {
  const htmlElement = itemTemplate.querySelector(".place").cloneNode(true);
  createCard(htmlElement, name, link)
  places.prepend(htmlElement);
}

initialCards.reverse().forEach((item) => {
  renderCard(item.name, item.link);
});

const formAddElement = document.querySelector(".form_type_add");
const nameAdd = formAddElement.querySelector(".form__input_type_name");
const link = formAddElement.querySelector(".form__input_type_link");

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderCard(nameAdd.value, link.value);
  closeModal(addpopup);
}

formAddElement.addEventListener("submit", handleFormAddCardSubmit);
