export class Card {
  constructor(cardData, templateSelector, handler, isCardMine) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handler.onClick;
    this._handleCardLike = handler.onLike;
    this._likeCounter = this._element.querySelector('.elements__like_counter');
    this._likeCounter.textContent = cardData.likes.length;
    const elementsPhoto = this._element.querySelector('.elements__photo');
    elementsPhoto.src = this._link;
    elementsPhoto.alt = this._name;
    const titlePhoto = this._element.querySelector('.elements__title');
    titlePhoto.textContent = this._name;

    this._likeButton = this._element.querySelector('.elements__like');

    this._buttonDeleteCard = this._element.querySelector('.elements__delete');

    this._isCardMine = isCardMine;

    this._handleCardRemove = handler.onDelete;
    this._isOwnerCard();

    this._setEventListeners();

  }

  // Методо удаления значка корзины, если карточка не моя
  _isOwnerCard() {
    if (!this._isCardMine) {
      this._buttonDeleteCard.remove()
    }
  }

  // Метод isLike - определяет принадлежность лайка по id
  isLike() {
    return this._cardData.likes.some((item) => {
      return item._id === this._cardData.currentUser._id
    })
  }


  // Метод постановки лайка
  _handleLike() {
    // вызов колбека, который пришёл снаружи
    this._handleCardLike(
      this._cardData,
      (updatedLikes) => {
        this._cardData.likes = updatedLikes;
        const classNameLiked = 'elements__like_active';
        if (this.isLike()) {
          this._likeButton.classList.add(classNameLiked);
        } else {
          this._likeButton.classList.remove(classNameLiked);
        }
        this._likeCounter.textContent = this._cardData.likes.length;
      });
  }


  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return cardElement;
  }


  //метод возвращающий готовую разметку, с установленными методами и слушателями
  generateCard() {
    if (this._isCardMine) {
      this._buttonDeleteCard.classList.add('popup_opened')
    }
    return this._element;
  }

  // Метод удаление карточки
  _deleteCard() {

    this._element.remove();
    this._element = null;

  }

  //4. общий слушатель событий на все возможные методы, применимые к карточке
  _setEventListeners() {

    //4.1 слушатель на удаление карточки
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleCardRemove(this._cardData, () => {
        this._deleteCard();
      })

    });

    // 4.2 слушатель на простановку лайка карточки
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    // 4.3 слушатель клика по фото (для открытия попапа с фото) 
    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }


}