const buttonOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_description');
// Находим имя и работу в профили, которые нужно будет изменить 
let newName = document.querySelector('.profile__title');
let newJob = document.querySelector('.profile__subtitle');

//Попап открыт, значения в поле формы = исходному имени и работе
buttonOpen.addEventListener('click', function () {
    popup.classList.remove('popup_hidden');
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
})

popupCloseButton.addEventListener('click', function () {
    popup.classList.add('popup_hidden');
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

    newName.textContent = nameInput.value; //новые элементы полей
    newJob.textContent = jobInput.value;
    popup.classList.add('popup_hidden');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 