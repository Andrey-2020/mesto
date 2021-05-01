import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleDeleteCard) {
        super(popupSelector);
        this._cardId = undefined;
        this._deleteCardFunc = undefined;
        this._submitButton = this._popupElement.querySelector('.form__button_type_confirm');
        this._handleDeleteElement = handleDeleteCard;
    }

    open(cardId, deleteCardFunc) {           // Извлекаем id и функцию удаления и записываем их в контекст вместо undefined
        this._cardId = cardId;
        this._deleteCardFunc = deleteCardFunc;
        super.open();
    }

    setEventListeners() {
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleDeleteElement(this._cardId, this._deleteCardFunc); // сначала слушатели стоят на undefined но при открытии
        });                                                               //попапа они заменяются на ид и функцию закрытия

        super.setEventListeners();
    }
}