import { Template } from "webpack";

export class Card {
  constructor(name, link, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
    
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

    this._likeButton = this._element.querySelector('.elements__like');

    this._setEventListeners();

    return this._element;
  }

  // Метод удаление карточки
  _deleteCard() {
   
      this._element.remove();
      this._element = null;
    
  }

  // Метод постановки лайка
  _getLike() {
    
      this._likeButton.classList.toggle('elements__like_active');
    
  }

  //4. общий слушатель событий на все возможные методы, применимые к карточке
  _setEventListeners() {

    //4.1 слушатель на удаление карточки
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    // 4.2 слушатель на простановку лайка карточки
    this._likeButton.addEventListener('click', () => {
      this._getLike();
    });

    // 4.3 слушатель клика по фото (для открытия попапа с фото) 
    this._element.querySelector('.elements__photo').addEventListener ('click', () => {
      this._handleCardClick(this._name, this._link)
    });   
  }

}
