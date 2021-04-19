export default class FormValidator { 
  constructor(parameters, formElement) { 
    this._parameters = parameters 
    this._formElement = formElement 
    // Находим все поля внутри формы, 
    // сделаем из них массив методом Array.from 
    this._inputList = Array.from( 
      this._formElement.querySelectorAll(this._parameters.inputSelector) 
    ); 
    // Найдём в текущей форме кнопку отправки 
    this._buttonElement = this._formElement.querySelector( 
      this._parameters.submitButtonSelector 
    ); 
  } 
  _showInputError(inputElement, errorMessage) { 

    const formError = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._parameters.inputErrorClass); 
    formError.textContent = errorMessage; 
    formError.classList.add(this._parameters.errorClass); 
  } 
  _hideInputError(inputElement) { 

    const formError = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(this._parameters.inputErrorClass); 
    formError.classList.remove(this._parameters.errorClass); 
    formError.textContent = " "; 
  } 
  _isValid(inputElement) { 
    if (!inputElement.validity.valid) { 
      this._showInputError( 
        inputElement, 
        inputElement.validationMessage 
      ); 
    } else { 
      this._hideInputError(inputElement); 
    } 
  } 
  _hasInvalidInput = (inputList) => { 
    return inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    }); 
  }; 
  disableSubmitButton() { 
    this._buttonElement.classList.add(this._parameters.inactiveButtonClass); 
    this._buttonElement.setAttribute('disabled', true) 
  } 
  _toggleButtonState = () => { 
    if (this._hasInvalidInput(this._inputList)) { 
      this.disableSubmitButton() 
    } else { 
      this._buttonElement.classList.remove(this._parameters.inactiveButtonClass); 
      this._buttonElement.removeAttribute('disabled', true) 
    } 
  }; 
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(); 
  }


  //setEventListeners добавит обработчики сразу всем полям формы 
  _setEventListeners = () => { 
 
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля 
    this.resetValidation()
    // Обойдём все элементы полученной коллекции 
    this._inputList.forEach((inputElement) => { 
      // каждому полю добавим обработчик события input 
      inputElement.addEventListener("input", () => { 
        // Внутри колбэка вызовем isValid, 
        // передав ей форму и проверяемый элемент 
        this._isValid(inputElement); 
        this._toggleButtonState();
      }); 
    }); 
  }; 
 
  //Добавление обработчиков всем формам 
  enableValidation() { 
 
    this._formElement.addEventListener("submit", (evt) => { 
      // У каждой формы отменим стандартное поведение 
      evt.preventDefault(); 
    }); 
 
    // Для каждой формы вызовем функцию setEventListeners, 
    // передав ей элемент формы 
    this._setEventListeners(); 
 
  } 
} 
 
