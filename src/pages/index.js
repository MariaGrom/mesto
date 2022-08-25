import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { configSelector } from '../utils/constants.js';
import { configApi } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';

const api = new Api(configApi);


// ПРОМИСЫ

Promise.all([api.getUserInfo(), api.getAllCards()])
.then(([data, items]) => {
  newUser.setUserInfo(data);
  newUser.setUserAvatar(data);
  cardList.renderItems(items.slice().reverse());
})
.catch ((err) => {
  console.log (err);
})


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
const avatar = document.querySelector('.profile__photo');
const formAddAvatar = document.querySelector('.popup__form_avatar');

// Переменные для удаления карточки
//const buttonDeleteCard = document.querySelector('.elements__delete');


// Объект с селекторами-ключами : имя пользователя и информация о пользователе

const profileUser = {
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
  selectorUserAvatar: '.profile__avatar',
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
function createCard(cardData) {

  cardData.currentUser = newUser.getUserInfo();

  // Объявляем создание новой карточки из Класса
  const card = new Card(cardData, '.item__template', {

    onLike: (currentCardData, likeCallback) => {
      if (card.isLike()) {
        api
          .deleteLike(currentCardData._id)
          // вызов  функции из класса Card, которая меняет html
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка', err);

          })
      } else {
        api
          .setLike(currentCardData._id)
          // вызов  функции из класса Card, которая меняет html
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка', err);

          })
      }
    },
    onClick: handleCardClick,
    onDelete: (currentCardData, deleteCallback) => {
      popupDeleteCard.open();
      popupDeleteCard.setConfirmAction(() => {
        api
          .deleteCard(currentCardData._id)

          .then(() => {
            popupDeleteCard.close();
            deleteCallback()
          })
          .catch((err) => {
            console.log('Ошибка', err);

          })
      });

    }
  });

  // Задаем элемент "карта" и вызываем метод генерация у новой карточки
  const cardElement = card.generateCard();

  // Возвращаем созданую карточку
  return cardElement;
};


// ФУНКЦИОНАЛ РАБОТЫ С ПОПАПОМ УДАЛЕНИЯ КАРТОЧКИ

const popupDeleteCard = new PopupWithConfirm('.popup_delete-card');

popupDeleteCard.setEventListeners();


// Загружаем карточки на страницу из массива исходных данных через создание новой секции из класса Секция
const cardList = new Section({
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData));
  },
}, '.elements__items');



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
  jobInput.value = userData.about;


};

// Заполнение формы попапа Профиля новыми данными, вводимыми пользователем
// Код по новой теории
function handleProfileFormSubmit({ name, about }) {

  popupEditProfile.setSavingMode()
  // Вызов у нового пользователя метода подстановки значений данных из формированных полей формы в formData
  api.updateUserInfo({ name: name, about: about })
    .then((data) => {
      newUser.setUserInfo(data)
      // Закрыть попап формы Профиля
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
    .finally(() => popupEditProfile.removeSavingMode())
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

  api.createNewCard({ name: data.name, link: data.link })
    .then((result) => {
      cardList.addItem(createCard(result)); //присваиваем новой карточке значения из полей формы

      popupPlace.close();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
};


// Объявление нового элемента класса
const popupPlace = new PopupWithForm('.popup_place', handleAddCardFormSubmit);
popupPlace.setEventListeners();


// ФУНКЦИОНАЛ РАБОТЫ С ПОПАПОМ ОБНОВЛЕНИЯ АВАТАРА

// Функция по обновлению аваатар
function handleAddAvatarFormSubmit({ avatar }) {
  popupAvatar.setSavingMode()
  api.updateUseravatar({ avatar: avatar })
    .then((data) => {
      newUser.setUserAvatar(data)
      popupAvatar.close();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
    .finally(() => popupAvatar.removeSavingMode())
}

// Объявления нового класса попапа - попап аватара
const popupAvatar = new PopupWithForm('.popup_avatar', handleAddAvatarFormSubmit);
popupAvatar.setEventListeners();

// Слушатель событий на открытие попапа 
avatar.addEventListener('click', function () {
  popupAvatar.open();
})