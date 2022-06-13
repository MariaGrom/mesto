
// Попал для изменения профиля пользователя
//Находим кнопки 
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

//объявим функция открытия попап
function popupOpen() {
    popup.classList.remove('popup_hidden');
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
}

// объявим функцю закрытия попап
function popupClose() {
    popup.classList.add('popup_hidden');
}

//Слушатель действий. Попап открыт, значения в поле формы = исходному имени и работе
buttonOpen.addEventListener('click', popupOpen);

//Слушатель действий. Попап закрыт
popupCloseButton.addEventListener('click', popupClose);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
    newName.textContent = nameInput.value; //новые элементы полей
    newJob.textContent = jobInput.value;
    popupClose();  //закрытие попапа по "Сохранению"
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 




// Добавление попапа для Нового места

const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup-place');
const popupPlaceCloseButton = document.querySelector('.popup-place__close-button');

//объявим функцию открытия попапа места
function popupPlaceOpen() {
    popupPlace.classList.remove('popup-place_hidden');
}

//Слушатель действий. Попап места открыт
buttonAddOpen.addEventListener('click', popupPlaceOpen);

// объявим функцю закрытия попапа места
function popupPlaceClose() {
    popupPlace.classList.add('popup-place_hidden');
}

//Слушатель действий. Попап закрыт
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);