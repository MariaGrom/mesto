import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
//import { initialCards } from '../utils/constants.js';
import { configSelector } from '../utils/constants.js';
import { configApi } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { Popup } from '../components/Popup.js'
import Api from '../components/Api.js';

const api = new Api(configApi);

/*
fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
  headers: {
    authorization: '6759dab4-c3f2-490f-91ba-dce1213f320e'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
*/

  api.getAllCards()
  .then((items) => {
    cardList.renderItems(items);
    //console.log('items', items)
  })
  .catch(err => console.log('Ошибка:', err))

  api.getUserInfo().then((result)=> {
    console.log(result)
  })
  .catch (err => console.log('Ошибка:', err))

// Переменные для изменения профиля пользователя
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__content');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const formAddProfile = document.querySelector('.popup__form_profile');
// Переменные для нового места и фото
const buttonAddOpen = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form_place');
// Переменные для изменения аватара
const buttonChangeAvatar = document.querySelector('.profile__photo');
const formAddAvatar = document.querySelector('.popup__form_avatar');

// Переменные для удаления карточки
const buttonDeleteCard = document.querySelector('.elements__delete');


// Объект с селекторами-ключами : имя пользователя и информация о пользователе

const profileUser = {
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
  selectorUserAvatar: '.profile__photo',
}


// Валидация формы профиля
const formProfile = new FormValidator(configSelector, formAddProfile);
formProfile.enableValidation();

// Валидация формы карточки
const formCard = new FormValidator(configSelector, formAddCard);
formCard.enableValidation();

// Валидация формы смены аватара
const formAvatar = new FormValidator(configSelector, formAddAvatar);
formAvatar.enableValidation();

// Функция создания карточки (как новой из формы, так и из массива)
function createCard(name, link) {

  // Объявляем создание новой карточки из Класса
  const card = new Card(name, link, '.item__template', handleCardClick);

  // Задаем элемент "карта" и вызываем метод генерация у новой карточки
  const cardElement = card.generateCard();

  // Возвращаем созданую карточку
  return cardElement;
};


// Загружаем карточки на страницу из массива исходных данных через создание новой секции из класса Секция
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  },
}, '.elements__items');


// Функция добавления новой карточки на страницу
function addCard(cardElement) {

  cardList.addItem(cardElement);

}


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
function handleProfileFormSubmit ({ name, job }) {
  // Вызов у нового пользователя метода подстановки значений данных из формированных полей формы в formData
  api.updateUserInfo({ name: name, about: job })
  .then((result) => {
  newUser.setUserInfo({ name: result.name, job: result.about });
  // Закрыть попап формы Профиля
  popupEditProfile.close();
  })
  .catch (err => console.log('Ошибка:', err))
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
function handleAddCardFormSubmit(data) {


  api.createNewCard({name: data.name, link: data.link})
  .then((result)=> {
    cardList.addItem(createCard(result.name, result.link)); //присваиваем новой карточке значения из полей формы

    //addCard(cardElement);
  
    popupPlace.close();
  })
  .then((result) => {
  console.log ('Новая карточка', result)})
  .catch(err => console.log('Ошибка', err))

};


// Объявление нового элемента класса
const popupPlace = new PopupWithForm('.popup_place', handleAddCardFormSubmit);
popupPlace.setEventListeners();



/*
// ФУНКЦИОНАЛ РАБОТЫ С ПОПАПОМ ОБНОВЛЕНИЯ АВАТАРА


// Функция по обновлению аваатар
function handleAddAvatarFormSubmit ({avatar}) {

  api.updateUseravatar({avatar: avatar})
  .then((result) => {
    newUser.setUserAvatar({avatar: result.avatar})
    popupAvatar.close();
  })
.catch(err => console.log('Ошибка', err))
}

// Объявления нового класса попапа - попап аватара
const popupAvatar = new PopupWithForm('.popup_avatar', handleAddAvatarFormSubmit);
popupAvatar.setEventListeners();

// Слушатель событий на открытие попапа 
buttonChangeAvatar.addEventListener('click', function(){
  console.log ('Клик')
  popupAvatar.open();
})
*/


/*
// ФУНКЦИОНАЛ РАБОТЫ С ПОПАПОМ УДАЛЕНИЯ КАРТОЧКИ

const popupDeleteCard = new Popup('.popup_delete-card');
/* придумать, как реализовать последовательность событий:
кликаю на корзину карточки -> выскакивает попап "Вы уверены?" -> кликаю на "Да" -> 
-> удаляется карточка (то есть надо поменять слушатель события в удалении карточки)

popupDeleteCard.setEventListeners();

buttonDeleteCard.setEventListeners('click', function(){

popupDeleteCard.open();

})*/



