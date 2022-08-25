import { Popup } from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup__content-delete');
    this._confirmAction = () => {};

  }


  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmAction();
    });

    super.setEventListeners();
  }

  setConfirmAction(action) {
    this._confirmAction = action;
  }

}