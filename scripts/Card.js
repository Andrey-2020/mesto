import {places, popupImg} from './index.js'
import  openModal from './index.js'
export default class Card {
  constructor( name, link) {
      this._name = name;
      this._link = link; 
  }

_handleDelete(item) {
    const deleteCard = item.querySelector(".place__delete");
    deleteCard.addEventListener("click", function () {
      const deleteItem = deleteCard.closest(".place");
      deleteItem.remove();
    });
  }
_handleLike(item) {
    const like = item.querySelector(".place__like");
    like.addEventListener("click", function () {
      like.classList.toggle("place__like_active");
    });
  }
_handleImgPopup(item, name, link) {
    const photo = item.querySelector(".place__image");
    photo.addEventListener("click", function () {
      openModal(popupImg);
      popupImg.querySelector(".popup__caption").textContent = name;
      popupImg.querySelector(".popup__image").setAttribute("src", link);
      popupImg.querySelector(".popup__image").setAttribute("alt", name);
    });
  }
  
_createCard(htmlElement, name, link) {
    this._handleLike(htmlElement);
    this._handleDelete(htmlElement);
    this._handleImgPopup(htmlElement, name, link);
    htmlElement.querySelector(".place__title").textContent = name;
    htmlElement.querySelector(".place__image").setAttribute("src", link);
    htmlElement.querySelector(".place__image").setAttribute("alt", name);
  }
  renderCard() {
    const itemTemplate = document.querySelector(".item-template").content;
    const htmlElement = itemTemplate.querySelector(".place").cloneNode(true);
    this._createCard(htmlElement, this._name, this._link)
    places.prepend(htmlElement);
  }
}

