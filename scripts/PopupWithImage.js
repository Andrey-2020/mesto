import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector, caption, src) {
        super(popupSelector);
        this._popupSelector = popupSelector
        this._src = src
        this._caption = caption
        this._imagePopupCaption = this._popupSelector.querySelector(".popup__caption")
        this._imagePopupPicture = this._popupSelector.querySelector(".popup__image")

    }
    open() {
        super.open();
        super.setEventListeners()
        this._imagePopupPicture.src = this._src
        this._imagePopupCaption.textContent = this._caption
    }
}