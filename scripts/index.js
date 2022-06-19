
// Попал для изменения профиля пользователя
const buttonOpen = document.querySelector('.profile__edit-button');//Находим кнопки 
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__content');// Находим форму в DOM
let nameInput = formElement.querySelector('.popup__text_type_name');// Находим поля формы в DOM
let jobInput = formElement.querySelector('.popup__text_type_description');// Находим имя и работу в профили, которые нужно будет изменить 
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

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Добавление попапа для Нового места
const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
const popupPlaceCloseButton = document.querySelector('.popup-place__close-button');
// Добавление попапа для Демонстрации фото
const buttonOpenPhoto = document.querySelector('.elements__photo');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');

//объявим функцию открытия попапа места
function popupPlaceOpen() {
    popupPlace.classList.remove('popup_hidden');
}

//Слушатель действий. Попап места открыт
buttonAddOpen.addEventListener('click', popupPlaceOpen);


// объявим функцю закрытия попапа места
function popupPlaceClose() {
    popupPlace.classList.add('popup_hidden');
}

//Слушатель действий. Попап места закрыт
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);


//объявим функцию открытия попапа с фото
function popupPhotoOpen() {
    popupPhoto.classList.remove('popup_hidden');
}

//объявим функцию закрытия попапа с фото
function popupPhotoClose() {
    popupPhoto.classList.add('popup_hidden');
}

//Слушатель действий. Попап фото закрыт
buttonClosePhoto.addEventListener('click', popupPhotoClose);

// Добавление карточек
const itemTemplate = document.querySelector(".item__template").content;
const list = document.querySelector(".elements__items");
const form = document.querySelector(".popup__content_place");
const formButton = document.querySelector(".popup__submit-button"); // нужна ли она мне?
const formInputName = document.querySelector(".popup-place__text_type_name");
const formInputLink = document.querySelector(".popup-place__text_type_link");
const buttonLike = document.querySelector(".elements__like");
const popupPhotoTitle = document.querySelector('.popup__caption');
const popupPhotoImg = document.querySelector('.popup__photo');

//функция добавления карточки
function addCard(name, link) {
    const newCard = itemTemplate.querySelector(".elements__item").cloneNode(true); //клонируем элемент списка из документ-фрагмента
    newCard.querySelector(".elements__title").textContent = name; //название нового места
    newCard.querySelector(".elements__photo").src = link; //ссылка на новое место
    newCard.querySelector('.elements__photo').alt = name; //alt нового места

    // событие по клику на удаление - вызов функции удаления карточки
    newCard.querySelector(".elements__delete").addEventListener('click', () => {
        deleteCard(newCard);
    });
    // добавить клик по картинке 

    newCard.querySelector(".elements__photo").addEventListener('click', () => {
        popupPhotoImg.src = link;
        popupPhotoImg.alt = name;
        popupPhotoTitle.textContent = name;


        popupPhotoOpen();
    });

    // функция лайка по карточке
    newCard.querySelector(".elements__like").addEventListener('click', function (evt) {
        evt.target.classList.toggle("elements__like_active");
    })

    list.prepend(newCard);
}

//функция удаления карточки
function deleteCard(item) {
    item.remove();
}

// обработчик событий по добавлению новой карточки 
function createCard(evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

    addCard(formInputName.value, formInputLink.value); //присваиваем новой карточке значения из полей формы

    formInputName.value = '';
    formInputLink.value = '';

    popupPlaceClose();  //закрытие попапа по "Сохранению"
}

form.addEventListener('submit', createCard);


//Перебор массива под существующие функции добавления/удаление/лайки карточки 
initialCards.forEach(function (item) {
    addCard(item.name, item.link);
});