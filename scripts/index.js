let openButton = document.querySelector(".profile__button_edit");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup_close");
let Likes = document.querySelectorAll(".place__like");
for (let i = 0; i <= 5; i += 1) {
    let toggleLike = () => {
        Likes[i].classList.toggle("place__like_active")
    }
    Likes[i].addEventListener("click", toggleLike)
}

let togglePopup = () => {
    popup.classList.toggle("popup_opened")
}
openButton.addEventListener("click", togglePopup)
closeButton.addEventListener("click", togglePopup)

popup.addEventListener("click", () => {
    if (event.target === event.currentTarget) {
        togglePopup()
    }
})

// Находим форму в DOM
let formElement = document.querySelector(".popup__container")

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let inputs = document.querySelectorAll('.form__item');
    let paragraph = document.querySelector('.profile__autor');
    let paragraphtwo = document.querySelector('.profile__profession');

    paragraph.textContent = inputs[0].value; // можно перезаписать содержимое 
    paragraphtwo.textContent = inputs[1].value
    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    // можно перезаписать содержимое
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);