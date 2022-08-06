import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    this._formInputList = this._form.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();

  }

  _getInputValues() {
    this._formValues = {};

    this._formInputList.forEach(input => {
      this._formValues[input.name] = input.value});
    //console.log('какое значение принимает [input.name] ', this._formValues)
    //console.log('какое значение принимает inputvalue ', input.value)


    return this._formValues;

    //console.log('в итоге возвращается из изаполненной формы это ->', this._formValues)
  }

  setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })

    super.setEventListeners();
  }

  close() {
    this._form.reset();

    super.close();

  }

}