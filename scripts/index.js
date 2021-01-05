let openButton = document.querySelector(".profile__button_edit");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".overlay_close");
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
    evt.preventDefault();
    let inputs = document.querySelectorAll('.form__item');
    let nameInput = document.querySelector('.profile__autor');
    let jobInput = document.querySelector('.profile__profession');
    nameInput.textContent = inputs[0].value;
    jobInput.textContent = inputs[1].value;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);