selectorValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

// Попал для изменения профиля пользователя
const buttonOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formEditProfile = document.querySelector('.popup__content');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_description');
const newName = document.querySelector('.profile__title');
const newJob = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_edit-profile');


function closePopupOnQ (evt) {
    if (evt.key === 'Escape') {  
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function closePopupByOverlay (evt) {
    if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
    }
}


function openPopup(popup) {
    document.addEventListener('keydown', closePopupOnQ);
    popup.addEventListener('click', closePopupByOverlay);
    popup.classList.add('popup_opened');
}


function closePopup(popup) {
    document.removeEventListener('keydown', closePopupOnQ);
    popup.removeEventListener('click', closePopupByOverlay);
    popup.classList.remove('popup_opened');
}

function handleProfile() {
    openPopup(popupProfile);
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
}

//Слушатель действий. Попап открыт, значения в поле формы = исходному имени и работе
buttonOpen.addEventListener('click', handleProfile);

//Слушатель действий. Попап закрыт
popupCloseButton.addEventListener('click', function () {
    closePopup(popupProfile);
});


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function submitEditProfileForm(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value; //новые элементы полей
    newJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', submitEditProfileForm);

// переменные нового места и фото
const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');

//Слушатель действий. Попап места открыт
buttonAddOpen.addEventListener('click', function () {
    openPopup(popupPlace);
})

//Слушатель действий. Попап места закрыт
popupPlaceCloseButton.addEventListener('click', function () {
    closePopup(popupPlace);
})

//Слушатель действий. Попап фото закрыт
buttonClosePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
})

// Добавление карточек
const itemTemplate = document.querySelector('.item__template').content;
const list = document.querySelector('.elements__items');
const formAddCard = document.querySelector('.popup__content_place');
const formInputName = popupPlace.querySelector('.popup__text_type_name');
const formInputLink = popupPlace.querySelector('.popup__text_type_link');
const buttonLike = document.querySelector('.elements__like');
const popupPhotoTitle = document.querySelector('.popup__caption');
const popupPhotoImg = document.querySelector('.popup__photo');

//функция создания карточки
function createCard(name, link) {
    const newCard = itemTemplate.querySelector('.elements__item').cloneNode(true);
    const elementsPhoto = newCard.querySelector('.elements__photo');
    newCard.querySelector('.elements__title').textContent = name;
    elementsPhoto.src = link;
    elementsPhoto.alt = name;

    // событие по клику на удаление - вызов функции удаления карточки
    newCard.querySelector('.elements__delete').addEventListener('click', () => {
        deleteCard(newCard);
    });
    // событие по клику на заполнение полей карточки
    elementsPhoto.addEventListener('click', () => {
        popupPhotoImg.src = link;
        popupPhotoImg.alt = name;
        popupPhotoTitle.textContent = name;

        openPopup(popupPhoto);
    });

    // событие по клику - функция лайка по карточке
    newCard.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    return newCard;
}

//функция добавления новой карточки
function addCard(newCard) {
    list.prepend(newCard);
}

//функция удаления карточки
function deleteCard(item) {
    item.remove();
}

// обработчик событий по добавлению новой карточки 
function submitAddCardForm(evt) {
    evt.preventDefault();

    addCard(createCard(formInputName.value, formInputLink.value)); //присваиваем новой карточке значения из полей формы

    formInputName.value = '';
    formInputLink.value = '';

    closePopup(popupPlace);
}

formAddCard.addEventListener('submit', submitAddCardForm);

//Перебор массива под существующие функции добавления/удаление/лайки карточки 
initialCards.forEach(function (item) {
    addCard(createCard(item.name, item.link));
})