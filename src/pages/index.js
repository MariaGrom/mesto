import '../pages/index.css';
import { FormValidator } from '../scripts/FormValidator.js';
import { Card } from '../scripts/Card.js';
import { initialCards } from '../scripts/cards.js';
import { configSelector } from '../scripts/validate.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithForm from '../scripts/PopupWithForm.js';

// Переменные для изменения профиля пользователя
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__content');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_description');
const newName = document.querySelector('.profile__title');
const newJob = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCloseButton = popupProfile.querySelector('.popup__close-button');
const formAddProfile = document.querySelector('.popup__form_profile');
// Переменные для нового места и фото
const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlaceOne = document.querySelector('.popup_place');
//const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');
//Переменные для добавление карточек (заполнения формы карточки)
const list = document.querySelector('.elements__items');
const formAddCard = document.querySelector('.popup__form_place');
const formInputName = popupPlaceOne.querySelector('.popup__text_type_name');
const formInputLink = popupPlaceOne.querySelector('.popup__text_type_link');
//const popupPhotoTitle = document.querySelector('.popup__caption');
const popupPhotoImg = document.querySelector('.popup__photo');

// Объект с селекторами-ключами : имя пользователя и информация о пользователе

const profileUser = {
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
}


//Валидация формы профиля
const formProfile = new FormValidator(configSelector, formAddProfile);
formProfile.enableValidation();

//Валидация формы карточки
const formCard = new FormValidator(configSelector, formAddCard);
formCard.enableValidation();


// Функция создания карточки (как новой из формы, так и из массива)
function createCard(name, link) {

  // Объявляем создание новой карточки из Класса
  const card = new Card(name, link, handleCardClick);

  // задаем элемент "карта" и вызываем метод генерация у новой карточки
  const cardElement = card.generateCard();

  // возвращаем созданую карточку
  return cardElement;
};

// Функция добавления новой карточки на страницу
function addCard(cardElement) {
  list.prepend(cardElement);
}

// Загружаем карточки на страницу из массива исходных данных через создание новой секции из класса Секция
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  },
}, '.elements__items');


// Отрисовываем карточки из массива
cardList.renderItems();


// ======== ФУНКЦИОНАЛ ОТКРЫТИЯ ПОПАПА С БОЛЬШОЙ КАРТИНКОЙ ПРИ КЛИКЕ НА КАРТОЧКУ=======//

// создание попапа из класса PWI
const popupImage = new PopupWithImage('.popup_photo');

// Функция открытия попапа по клику по карточке => PopupWithImage
function handleCardClick(name, link) {

  popupImage.open(name, link);

};
// ==================КОНЕЦ==========================//


// ================ ФУНКЦИОНАЛ РАБОТЫ С ПРОФИЛЕМ ПОЛЬЗОВАТЕЛЯ ====================//

// создаем новый элемент класса UserInfo
const newUser = new UserInfo(profileUser);


// Слушатель действий. Попап открыть, значения в поле формы = исходному имени и работе
buttonOpenPopupProfile.addEventListener('click', () => {

  //Открытие попапа Профиля
  popupEditProfile.open();

  // Активация кнопки Сабмита
  formProfile.enableButton();

  // Присвоение первичных значений (со страницы) в поля открытой формы
  handleProfile();

});

// Первичные значения в профиле формы
function handleProfile() {

  //Вызов у нового элемента класса UserInfo  метода возврата объекта с данными пользователя
  const userData = newUser.getUserInfo();

  // подставляем имя
  nameInput.value = userData.name;

  // подставляем работу (информацию о пользователя)
  jobInput.value = userData.job;
};


// Заполнение формы попапа Профиля новыми данными, вводимыми пользователем ===> РАЗОБРАТЬСЯ!!!

 //Код по новой теории
const formSubmitProfile = (formData) => {
console.log ('Данные из формы', formData);
// вызов у нового пользователя метода подстановки значений данных из формированных полей формы в formData
  newUser.setUserInfo(formData);

  console.log('что у нас в newUser ->', newUser)
  console.log('заполнение профиля из формы жду этот результат ->', newUser.setUserInfo(formData))

  // Закрыть попап формы Профиля
  popupEditProfile.close();
}

/*
// Старый код на сабмит формы профиля с новыми данными 

function formSubmitProfile() {


  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;

  popupEditProfile.close();
}
*/

//создание нового элемента Попап-Профиля из класса PWF
const popupEditProfile = new PopupWithForm('.popup_edit-profile', formSubmitProfile);
popupEditProfile.setEventListeners();

//======================= КОНЕЦ ==============================//



// ============ ФУНКЦИОНАЛ ОТКРЫТИЯ ПОПАПА ДЛЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ НА СТРАНИЦУ =======//


// Слушатель действий: сбросить форму, открыть попап Места, блокировка кнопки
buttonAddOpen.addEventListener('click', function () {
  formAddCard.reset();
  popupPlace.open();
  formCard.resetValidation();
})

// Заполнение формы попапа Карточки новыми данными из формы и сабмит ===> РАЗОБРАТЬСЯ!!!

// Код по новой теории
/*const formSubmitPlace = (formData) => {
  const link = formData.link;
  const name = formData.name;

  cardList.addItem(createCard({name, link}));
  popupPlace.close();
}
*/

//старый код по форме сабмита по карточке:

// Функция - обработчик событий по добавлению новой карточки 
function formSubmitPlace(evt) {

  const cardElement = createCard(formInputName.value, formInputLink.value); //присваиваем новой карточке значения из полей формы
  addCard(cardElement, list);

  popupPlace.close();
}

// Объявление нового элемента класса
const popupPlace = new PopupWithForm('.popup_place', formSubmitPlace);
popupPlace.setEventListeners();
