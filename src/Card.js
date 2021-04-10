
export default class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._src = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;

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

  _handleImgPopup(item, name, src) {
    const photo = item.querySelector(".place__image");
    photo.addEventListener('click', () => {
      this._handleCardClick(name, src);
    });
  }
  _createCard(htmlElement) {
    this._handleLike(htmlElement);
    this._handleDelete(htmlElement);
    this._handleImgPopup(htmlElement, this._name, this._src);
    htmlElement.querySelector(".place__title").textContent = this._name;
    htmlElement.querySelector(".place__image").setAttribute("src", this._src);
    htmlElement.querySelector(".place__image").setAttribute("alt", this._name);
  }
  renderCard() {
    const itemTemplate = document.querySelector(this._cardSelector).content;
    const htmlElement = itemTemplate.querySelector(".place").cloneNode(true);
    this._createCard(htmlElement)
    return htmlElement;
  }
}

