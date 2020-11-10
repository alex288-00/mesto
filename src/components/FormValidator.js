
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
    this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
  };

  //Показываем ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._params.inputErrorClass);
  };

  //Скрываем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._params.inputErrorClass);
  };

  //Проверяем инпуты на валидность добавляем/снимаем текст ошибки
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Кнопка неактивна
  _disabledButtonState() {
    this._buttonElement.classList.add(this._params.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  // Кнопка активна
  _enabledButtonState() {
    this._buttonElement.classList.remove(this._params.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  //Проверка на валидность и изменение кнопки активная/неактивная
  _checkInputValidityForButton() {
    const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
      this._disabledButtonState();
    } else {
      this._enabledButtonState();
    }
  };

  //Вешаем обработчики событий
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._checkInputValidityForButton();
      });

    });

    this._checkInputValidityForButton();
  };

  // Очищение формы от ошибок
  clearFormErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = '';
    });

  };

  //Функция проверки валидности формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disabledButtonState();
    });

    this._setEventListeners();
  };
};


