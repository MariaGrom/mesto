export class Card {
  constructor(name, link, handleClickCard) {
    this._name = name;
    this._link = link;
    this._element = this._getTemplate();
    this._handleClickCard = handleClickCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.item__template')
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }


  //метод возвращающий готовую разметку, с установленными методами и слушателями
  generateCard() {
    // Запишем разметку в приватное поле __element.  
    // Так у других элементов появится доступ к ней.

    this._element = this._getTemplate();
    const elementsPhoto = this._element.querySelector('.elements__photo');
    elementsPhoto.src = this._link;
    elementsPhoto.alt = this._name;
    const titlePhoto = this._element.querySelector('.elements__title');
    titlePhoto.textContent = this._name;
    this._deleteCard();
    this._getLike();
    this._handleClickPhoto();


    return this._element;
  }

  // методы класса, которые установят слушателей событий
  // 1. метод клика по карточке для дальнейшего использования в открытии попапа
  _handleClickPhoto() {
    const elementsPhoto = this._element.querySelector('.elements__photo');
    elementsPhoto.addEventListener ('click', () => {
      this._handleClickCard(this._name, this._link);
    });
  }

  // 1. метод удаление карточки
  _deleteCard() {
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._element.remove()
    });
  }

  // 2. метод постановки лайка
  _getLike() {
    this._element.querySelector('.elements__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active');
    });
  }

  /*
  //4. общий слушатель событий на все возможные методы, применимые к карточке
  _setEventListeners() {

    //4.1 слушатель на удаление карточки
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    // 4.2 слушатель на простановку лайка карточки
    /* this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._getLike();
    });

    // 4.3 слушатель на заполнение полей новой карточки стр.109 из index.js
    this._element.cardElement.querySelector('.elements__photo').addEventListener('click', () => {
      this._createNewCard();
    });
  }*/


}
