import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormAddCardSubmit, formAddElement) {
        super(popupSelector);
        this._handleFormSubmit = handleFormAddCardSubmit
        this._formAddElement = formAddElement
        this._inputList = this._formAddElement.querySelectorAll('.form__input');
        this._buttonSubmit = this._formAddElement.querySelectorAll('.form__button');
        this._buttonTextSubmit = this._buttonSubmit.textContent
    }
    _getInputValues() {
        // достаём все элементы полей
        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = `${this._buttonTextSubmit}`;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formAddElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        this._formAddElement.reset()
        super.close()
    }
}
