const buttonOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

buttonOpen.addEventListener('click', function () {
    popup.classList.remove('popup_hidden');
})

popupCloseButton.addEventListener('click', function () {
    popup.classList.add('popup_hidden');
})

popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        popup.classList.add('popup_hidden');
    }
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__text_type_name');
// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__text_type_description');
 // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault()
        
    ; // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 