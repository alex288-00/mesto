//Показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, params) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(params.inputErrorClass);
};

//Скрываем ошибку
const hideInputError = (formElement, inputElement, params) => {
  
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(params.inputErrorClass); 
};

//Проверяем инпуты на валидность добавляем/снимаем текст ошибки
const checkInputValidity = (formElement, inputElement, params) => {
 
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

//Проверка на валидность и изменение кнопки активная/неактивная
const toggleButtonState = (params, inputList, buttonElement) => {

  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//Вешаем обработчики событий
const setEventListeners = (params, formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(params, inputList, buttonElement);
    });

  });

  toggleButtonState(params, inputList, buttonElement);
};

//Функция проверки валидности формы
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(params, formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

