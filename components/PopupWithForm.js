import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormAddCardSubmit, formAddElement, api) {
        super(popupSelector);
        this._handleFormSubmit = handleFormAddCardSubmit
        this._formAddElement = formAddElement
        this._inputList = this._formAddElement.querySelectorAll('.form__input');
        this._api = api;
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
    renderLoading(isLoading, button) {
        if (isLoading) {
            button.textContent = 'Сохранение...';
        } else {
            button.textContent = 'Сохранить';
        }
    }

    handleUpdate() {
        super.setEventListeners()
        this._formAddElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    setEventListeners() {
        super.setEventListeners();
        this._formAddElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._api.createTask(this._getInputValues(), 'cards')
                .then((card) => {
                    this._handleFormSubmit(card);
                })
                .catch(err => Promise.reject(err))
        });
    }
    close() {
        this._formAddElement.reset()
        super.close()
    }
}
