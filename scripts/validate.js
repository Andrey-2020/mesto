function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form__input-error_active");
}
function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  formError.classList.remove("form__input-error_active");
  formError.textContent = " ";
}
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.classList.remove("form__submit_inactive");
  }
};
//setEventListeners добавит обработчики сразу всем полям формы
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const InputList = Array.from(formElement.querySelectorAll(".form__input"));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(".form__button");
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(InputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  InputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(InputList, buttonElement);
    });
  });
};

//Добавление обработчиков всем формам
function enableValidation() {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
}

// Вызовем функцию
enableValidation();
