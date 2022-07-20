import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { configSelector } from './validate.js';

// Переменные для изменения профиля пользователя
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__content');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_description');
const newName = document.querySelector('.profile__title');
const newJob = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCloseButtonProfile = popupProfile.querySelector('.popup__close-button');
const formAddProfile = document.querySelector('.popup__form_profile');


// Функция закрытия попапа по кнопке Esc
function closePopupOnQ(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Функция закрытия попапа по оверлею
function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Функция октрытия попапа
function openPopup(popup) {
  document.addEventListener('keydown', closePopupOnQ);
  popup.addEventListener('mousedown', closePopupByOverlay);
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа (по любому из возможных методов)
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupOnQ);
  popup.removeEventListener('mousedown', closePopupByOverlay);
  popup.classList.remove('popup_opened');
}


// Функция присвоения исходных данных из профиля 
function handleProfile() {
  openPopup(popupProfile);
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
}

// Слушатель действий. Попап открыт, значения в поле формы = исходному имени и работе
buttonOpenPopupProfile.addEventListener('click', handleProfile);

// Слушатель действий. Попап закрыт
popupCloseButtonProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function submitEditProfileForm(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupProfile);
}


// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Переменные для нового места и фото
const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');


// Слушатель действий. Попап места открыт: сброс формы, открытие попапа Места, блокировка кнопки
buttonAddOpen.addEventListener('click', function () {
  formAddCard.reset(); 
  openPopup(popupPlace);
  formCard.resetValidation();
})

// Слушатель действий. Попап места закрыт
popupPlaceCloseButton.addEventListener('click', function () {
  closePopup(popupPlace);
})

// Слушатель действий. Попап фото закрыт
buttonClosePhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
})

// Переменные для добавление карточек (заполнения формы карточки)
const list = document.querySelector('.elements__items');
const formAddCard = document.querySelector('.popup__form_place');
const formInputName = popupPlace.querySelector('.popup__text_type_name');
const formInputLink = popupPlace.querySelector('.popup__text_type_link');
const popupPhotoTitle = document.querySelector('.popup__caption');
const popupPhotoImg = document.querySelector('.popup__photo');


// Функция открытия попапа по клику по карточке
  function handleClickCard (name, link) {
    popupPhotoImg.src = link;
    popupPhotoImg.alt = name;
    popupPhotoTitle.textContent = name;
  
    openPopup(popupPhoto)
  };

// Функция добавления карточки
function addCard(cardElement) {
  list.prepend(cardElement);
}


// Функция создания карточки (как новой из формы, так и из массива)
function createCard(name, link) {
  const card = new Card(name, link, handleClickCard);
  const cardElement = card.generateCard();

  return cardElement;
}


// Обработчик событий по добавлению новой карточки 
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardElement = createCard(formInputName.value, formInputLink.value); //присваиваем новой карточке значения из полей формы
  addCard(cardElement, list);

  closePopup(popupPlace);
}

formAddCard.addEventListener('submit', submitAddCardForm);

// Перебор массива под существующие функции добавления/удаление/лайки карточки 
initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  addCard(cardElement);
})


//Валидация формы профиля
const formProfile = new FormValidator (configSelector, formAddProfile);
formProfile.enableValidation();


//Валидация формы карточки
const formCard = new FormValidator (configSelector, formAddCard);
formCard.enableValidation();