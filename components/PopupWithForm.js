import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormAddCardSubmit, formAddElement) {
        super(popupSelector);
        this._handleFormSubmit = handleFormAddCardSubmit
        this._formAddElement = formAddElement
        this._inputList = this._formAddElement.querySelectorAll('.form__input');
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
    setEventListeners() {
        super.setEventListeners()
        this._formAddElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());

        });
    }
    close() {
        super.close()
        this._inputList.forEach(input => {
            input.value = '';
        });
    }
}
