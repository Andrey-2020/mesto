import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupCaption = this._popupElement.querySelector(".popup__caption")
        this._imagePopupPicture = this._popupElement.querySelector(".popup__image")

    }
    open(name, link) {
        this._imagePopupPicture.src = link;
        this._imagePopupCaption.textContent = name;
        this._imagePopupPicture.setAttribute('alt', `увеличенное изображение ${name}`)
        super.open()
    }
}