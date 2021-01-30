function showInputError(formElement, inputElement, errorMessage, parameters) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameters.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(parameters.errorClass);
}
function hideInputError(formElement, inputElement, parameters) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameters.inputErrorClass);
  formError.classList.remove(parameters.errorClass);
  formError.textContent = " ";
}
function isValid(formElement, inputElement, parameters) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
}
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement, parameters) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parameters.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
};
//setEventListeners добавит обработчики сразу всем полям формы
const setEventListeners = (formElement, parameters) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const InputList = Array.from(formElement.querySelectorAll(parameters.inputSelector))
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(InputList, buttonElement, parameters);
  // Обойдём все элементы полученной коллекции
  InputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, parameters);
      toggleButtonState(InputList, buttonElement, parameters);
    });
  });
};

//Добавление обработчиков всем формам
function enableValidation(parameters) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, parameters);
  });
}

// Вызовем функцию
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error', 
    errorClass: 'form__input-error_active'
  });