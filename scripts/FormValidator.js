export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    console.log(this._formElement);
    this._config = config;
    console.log(this._config);
  }
  
  // Метод добавления класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  }

  // Метод удаления класса с ошибкой 
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = ''; // Очистим ошибку
  }

  //Метод проверки валидности поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement, inputElement, inputElement.validationMessage, this._config);   // Если поле не проходит валидацию, покажем ошибку
    } else {
      this._hideInputError(this._formElement, inputElement, this._config); // Если проходит, скроем
    }
  }

  // 
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      
    });
  }

  // Метод не активной кнопки
  disabledButton () {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  //Метод активной кнопки
  enableButton() {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  //Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState  () {
    if (this._hasInvalidInput()) {
      this.disabledButton(buttonElement, this._config);
    } else {
      this.enableButton(buttonElement, this._config);
    }
  }


//
_setEventListeners() {
   this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  
  this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  this._toggleButtonState();

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });
};


enableValidation () {
  // Функция проверки для одной формы
    //this._formElement.addEventListener('submit', (evt) => {

      //evt.preventDefault();
    //});
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
   this._setEventListeners();
};


}