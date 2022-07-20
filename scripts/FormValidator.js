export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

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
      this._showInputError(inputElement, inputElement.validationMessage);   // Если поле не проходит валидацию, покажем ошибку
    } else {
      this._hideInputError(inputElement); // Если проходит, скроем
    }
  }

  // 
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      
    });
  }

  // Метод не активной кнопки
  disabledButton () {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  //Метод активной кнопки
  enableButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  //Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState  () {
    if (this._hasInvalidInput()) {
      this.disabledButton();
    } else {
      this.enableButton();
    }
  }


/// Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', isValid);
// Взамен ей напишем слушатель на каждое поле ввода

_setEventListeners() {
 
  this._toggleButtonState();

  // Обойдём все элементы полученной коллекции

  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });

};


// Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
enableValidation () { 
   this._setEventListeners();
};

  // Функция переключения кнопки в попапе при его открытии и очищение списка ошибок.
  resetValidation() {
    this._toggleButtonState();

  }

}