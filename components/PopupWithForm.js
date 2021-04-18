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

    setEventListeners() {
        super.setEventListeners()
        this._formAddElement.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
        // добавим вызов функции _handleFormSubmit
        // передадим ей объект — результат работы _getInputValues


    }
    setEventListenersn() {
        super.setEventListeners();
        this._formAddElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._api.createTask(this._getInputValues())
                .then((card) => {
                    this._handleFormSubmit(card);
                })
  
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues


        });
    }
    close() {
        super.close()
        this._inputList.forEach(input => {
            input.value = '';
        });
    }
}
