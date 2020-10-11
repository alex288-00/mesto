
export class FormValidator {

  constructor(formSelector, params) {
    this._formSelector = formSelector;
    this._params = params;
    this._formElement = document.querySelector(formSelector)
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
  }
  
  //Показываем ошибку
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._params.inputErrorClass);
  };

    //Скрываем ошибку
  _hideInputError(formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._params.inputErrorClass); 
  };
    
    //Проверяем инпуты на валидность добавляем/снимаем текст ошибки
  _checkInputValidity(formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(formElement, inputElement, errorMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
    
    //Проверка на валидность и изменение кнопки активная/неактивная
  _toggleButtonState (inputList, buttonElement) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
      buttonElement.classList.add(this._params.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._params.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };
    
    //Вешаем обработчики событий
  _setEventListeners (formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    const buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });

    });

    this._toggleButtonState(inputList, buttonElement);
  };
    
    //Функция проверки валидности формы
  enableValidation () {  
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._params.inactiveButtonClass)
    });

    this._setEventListeners(this._params, this._formElement);
    };
}


