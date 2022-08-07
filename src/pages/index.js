import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { configSelector } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

// Переменные для изменения профиля пользователя
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__content');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const formAddProfile = document.querySelector('.popup__form_profile');
// Переменные для нового места и фото
const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlaceForm = document.querySelector('.popup_place');
// Переменные для добавление карточек (заполнения формы карточки)
const list = document.querySelector('.elements__items');
const formAddCard = document.querySelector('.popup__form_place');
const formInputName = popupPlaceForm.querySelector('.popup__text_type_name');
const formInputLink = popupPlaceForm.querySelector('.popup__text_type_link');
const templatePhoto = document.querySelector('.item__template').content;

// Объект с селекторами-ключами : имя пользователя и информация о пользователе

const profileUser = {
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
}


// Валидация формы профиля
const formProfile = new FormValidator(configSelector, formAddProfile);
formProfile.enableValidation();

// Валидация формы карточки
const formCard = new FormValidator(configSelector, formAddCard);
formCard.enableValidation();


// Функция создания карточки (как новой из формы, так и из массива)
function createCard(name, link) {

  // Объявляем создание новой карточки из Класса
  const card = new Card(name, link, templatePhoto, handleCardClick);

  // Задаем элемент "карта" и вызываем метод генерация у новой карточки
  const cardElement = card.generateCard();

  // Возвращаем созданую карточку
  return cardElement;
};

// Загружаем карточки на страницу из массива исходных данных через создание новой секции из класса Секция
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  },
}, '.elements__items');


// Функция добавления новой карточки на страницу
function addCard(cardElement) {

  cardList.addItem(cardElement);

}

// Отрисовываем карточки из массива
cardList.renderItems();

// ФУНКЦИОНАЛ ОТКРЫТИЯ ПОПАПА С БОЛЬШОЙ КАРТИНКОЙ ПРИ КЛИКЕ НА КАРТОЧКУ 

// Создание попапа из класса PWI
const popupImage = new PopupWithImage('.popup_photo');
popupImage.setEventListeners();

// Функция открытия попапа по клику по карточке => PopupWithImage
function handleCardClick(name, link) {

  popupImage.open(name, link);

};

// ФУНКЦИОНАЛ РАБОТЫ С ПРОФИЛЕМ ПОЛЬЗОВАТЕЛЯ

// Создаем новый элемент класса UserInfo
const newUser = new UserInfo(profileUser);

// Слушатель действий. Попап открыть, значения в поле формы = исходному имени и работе
buttonOpenPopupProfile.addEventListener('click', () => {

  // Открытие попапа Профиля
  popupEditProfile.open();

  // Активация кнопки Сабмита
  formProfile.enableButton();

  // Вызов метода очищения поля ошибок
  formProfile.resetErrors();

  // Присвоение первичных значений (со страницы) в поля открытой формы
  handleProfile();


});

// Первичные значения в профиле формы
function handleProfile() {

  // Вызов у нового элемента класса UserInfo  метода возврата объекта с данными пользователя
  const userData = newUser.getUserInfo();

  // Подставляем имя
  nameInput.value = userData.name;

  // Подставляем работу (информацию о пользователя)
  jobInput.value = userData.job;
};

// Заполнение формы попапа Профиля новыми данными, вводимыми пользователем
// Код по новой теории
const handleProfileFormSubmit = (formData) => {
  // Вызов у нового пользователя метода подстановки значений данных из формированных полей формы в formData
  newUser.setUserInfo(formData);

  // Закрыть попап формы Профиля
  popupEditProfile.close();
};

// Создание нового элемента Попап-Профиля из класса PWF
const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
popupEditProfile.setEventListeners();

// ФУНКЦИОНАЛ ОТКРЫТИЯ ПОПАПА ДЛЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ НА СТРАНИЦУ

// Слушатель действий: сбросить форму, открыть попап Места, блокировка кнопки
buttonAddOpen.addEventListener('click', function () {

  // Сброс полей формы Попапа добавления карточек
  formAddCard.reset();

  // Открытие Попапа добавления карточки
  popupPlace.open();

  // Вызов метода переключения кнопки
  formCard.resetValidation();

  // Вызов метода очищения поля ошибок
  formCard.resetErrors();
});

// Функция - обработчик событий по добавлению новой карточки 
function handleAddCardFormSubmit(evt) {

  const cardElement = createCard(formInputName.value, formInputLink.value); //присваиваем новой карточке значения из полей формы

  addCard(cardElement);

  popupPlace.close();
};


// Объявление нового элемента класса
const popupPlace = new PopupWithForm('.popup_place', handleAddCardFormSubmit);
popupPlace.setEventListeners();