import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupPhotoTitle = document.querySelector('.popup__caption');
    this._popupPhotoImg = document.querySelector('.popup__photo');
    super.setEventListeners();
  }

  open(name, link) {
    this._popupPhotoImg.src = link;
    this._popupPhotoImg.alt = name;
    this._popupPhotoTitle.textContent = name;

    super.open();
  }
}