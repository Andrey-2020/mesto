export default class Card {
  constructor(card, handle, data) {
    this._card = card;
    this._name = card.name;
    this._src = card.link;
    this._ownerId = card.owner._id
    this._cardId = card._id;
    this._likes = card.likes;
    this._handlePopupOpen = handle.handlePopupOpen;
    this._handleCardClick = handle.handleCardClick;
    this._handleLikeCard = handle.handleLikeCard;
    this._handleDeleteLike = handle.handleDeleteLike;
    this._cardSelector = data.cardSelector;
    this._userId = data.userId;
  }

  _updateLikesView() {
    this._element.querySelector(".place__number-of-like").textContent = this._likes.length;
    if (this.islikedActive()) this._element.querySelector('.place__like')
      .classList.add("place__like_active");
    else this._element.querySelector('.place__like')
      .classList.remove("place__like_active");

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector(".place__delete").classList.add("place__delete-none");
    } else {
      const deleteCard = this._element.querySelector(".place__delete");
      deleteCard.addEventListener('click', () => {
        this._handlePopupOpen(this._cardId, () => {
          this._handleDeleteCardButton();
        });
      });
    }
    this._element.querySelector(".place__like").addEventListener("click", () => {
      if (!this._element.querySelector(".place__like").classList.contains("place__like_active")) {
        this._handleLikeCard(this);
      } else {
        this._handleDeleteLike(this);
      }
    });
    this._element.querySelector(".place__image").addEventListener('click', () => {
      this._handleCardClick(this._name, this._src);
    });
  }

  _handleDeleteCardButton() {
    this._element.remove();

    this._element = null;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._updateLikesView();
    this._setEventListeners();

    this._element.querySelector(".place__title").textContent = this._name;
    this._element.querySelector(".place__image").setAttribute("src", this._src);
    this._element.querySelector(".place__image").setAttribute("alt", this._name);;

    return this._element;
  }

  islikedActive() {
    return this._likes.some(item => item._id === this._userId);
  }

  getId() {
    return this._cardId;
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._updateLikesView();
  }
}
