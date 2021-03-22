export default class FormValidator {
  constructor(parameters, formSelector) {
    this._parameters = parameters
    this._formSelector = formSelector
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._parameters.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._parameters.errorClass);
  }
  _hideInputError(formElement, inputElement) {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._parameters.inputErrorClass);
    formError.classList.remove(this._parameters.errorClass);
    formError.textContent = " ";
  }
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._parameters.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._parameters.inactiveButtonClass);
    }
  };
  //setEventListeners добавит обработчики сразу всем полям формы
  _setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const InputList = Array.from(
      formElement.querySelectorAll(this._parameters.inputSelector)
    );
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(
      this._parameters.submitButtonSelector
    );
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(InputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    InputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formElement, inputElement);
        this._toggleButtonState(InputList, buttonElement);
      });
    });
  };

  //Добавление обработчиков всем формам
  enableValidation() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(
      document.querySelectorAll(this._formSelector)
    );

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });

      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners(formElement);
    });
  }
}
