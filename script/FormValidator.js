
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
    
  // Кнопка неактивна
  _disabledButtonState(buttonElement) {
    buttonElement.classList.add(this._params.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };

  // Кнопка активна
  _enabledButtonState(buttonElement) {
    buttonElement.classList.remove(this._params.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  //Проверка на валидность и изменение кнопки активная/неактивная
  _checkInputValidityForButton (inputList, buttonElement) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
      this._disabledButtonState(buttonElement)
    } else {
      this._enabledButtonState(buttonElement)
    }
  };

  //Вешаем обработчики событий
  _setEventListeners (formElement) {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._checkInputValidityForButton(this._inputList, this._buttonElement);
      });

    });

    this._checkInputValidityForButton(this._inputList, this._buttonElement);
  };

  // Очищение формы от ошибок
  clearFormErrors (formElement) {
    this._inputList.forEach((inputElement) =>{
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._params.inputErrorClass);
        inputElement.value = '';
    });

};
    
  //Функция проверки валидности формы
  enableValidation () {  
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disabledButtonState(this._buttonElement);
    });

    this._setEventListeners(this._params, this._formElement);
    };
};


