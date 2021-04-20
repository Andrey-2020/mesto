export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
        this._closeByEscape = this._closeByEscape.bind(this)
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }
    _closeByEscape(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this._closeByEscape
        );
    }
    close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._closeByEscape
        );
    }
    setEventListeners() {
        this._popupElement.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
            if (evt.target.classList.contains("popup__button")) {
                this.close();
            }
        });
    }
}