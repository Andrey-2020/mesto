export default class Card {
  constructor(data, handleCardClick, handlePopupOpen, cardSelector, api, userId) {
    this._name = data.name;
    this._src = data.link;
    this._ownerId = data.owner._id
    this._id = data.id;
    this._handlePopupOpen = handlePopupOpen;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    // this._handleConfirmDelete = handleConfirmDelete;
    this._cardSelector = cardSelector;
    this._api = api;
    this._userId = userId;
  }

  _handleDelete(element) {
    element.remove()

  }

  // const confirmDelete = new PopupWithForm(".popup_type_confirm", () => {
  //   this._api.deleteTask(this._id)
  //   const deleteItem = deleteCard.closest(".place");
  //   deleteItem.remove();
  //   confirmDelete.close();
  //   this._id = undefined;
  // }, formConfirmDelete, this._api)
  // deleteCard.addEventListener("click", () => {
  //   confirmDelete.open();

  // })
  // }
  // const deleteCard = item.querySelector(".place__delete");

  // deleteCard.addEventListener("click", () => {
  //   this._api.deleteTask(this._id)
  //     .then(() => {
  //       const deleteItem = deleteCard.closest(".place");
  //       deleteItem.remove();
  //     })
  //     .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  // });

  _setEventListeners(item) {
    if (this._ownerId !== this._userId) {
      item.querySelector(".place__delete").classList.add("place__delete-none");
    } else {
      const deleteCard = item.querySelector(".place__delete");
      deleteCard.addEventListener('click', () => {
        this._handlePopupOpen(this._id, () => {
          this._handleDelete(deleteCard.closest('.place')); // Слушатель на клик по корзине (передаем параметры в класс popupConfirm)
        });
      });
    }
  }


  _handleLike(item) {
    const like = item.querySelector(".place__like");
    const likeofNumbers = item.querySelector(".place__number-of-like");
    this._likes.forEach(element => {
      if (element._id === this._userId) {
        like.classList.add("place__like_active");
      }
    })
    likeofNumbers.textContent = this._likes.length;

    like.addEventListener("click", () => {
      if (!like.classList.contains("place__like_active")) {
        this._api.putTask(`likes/${this._id}`)
          .then(data => {
            likeofNumbers.textContent = data.likes.length;
            like.classList.toggle("place__like_active");
          })
      } else {
        this._api.deleteTask(`likes/${this._id}`)
          .then(data => {
            likeofNumbers.textContent = data.likes.length;
            like.classList.toggle("place__like_active");
          })
      }

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
    this._setEventListeners(htmlElement);
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

