export const configSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    "content-type": "application/json",
    "authorization": "6759dab4-c3f2-490f-91ba-dce1213f320e",
  }
};

// Объект с селекторами-ключами : имя пользователя и информация о пользователе
export const profileUser = {
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
  selectorUserAvatar: '.profile__avatar',
};
