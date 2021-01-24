let popup = document.querySelector(".popup");
let openButton = document.querySelector(".profile__button_edit");
let closeButton = popup.querySelector(".popup__button");
let togglePopup = () => {
    popup.classList.toggle("popup_opened")
}
let formElement = document.querySelector(".form")
let profilename = document.querySelector(".profile__autor")
let profilejob = document.querySelector(".profile__profession")
let nameInput = formElement.querySelector(".form__item_type_name-input")
let jobInput = formElement.querySelector(".form__item_type_job-input")
openButton.addEventListener("click", function () {
    togglePopup()
    nameInput.value = profilename.textContent
    jobInput.value = profilejob.textContent
}
)
closeButton.addEventListener("click", togglePopup)
popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
        togglePopup()
    }
})
let likes = document.querySelectorAll(".place__like");

likes.forEach(function (item) {
    let toggleLike = () => {
        item.classList.toggle("place__like_active")
    }
    item.addEventListener("click", toggleLike)
});



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    profilename.textContent = nameInput.value
    profilejob.textContent = jobInput.value

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    togglePopup()
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);