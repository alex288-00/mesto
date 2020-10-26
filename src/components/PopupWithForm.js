import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, callbackSubmit}, popupFormSelector) {
        super(popupSelector);
        this._popupFormSelector = document.querySelector(popupFormSelector);
        this._popupSelector = document.querySelector(popupSelector);
        this._callbackSubmit = callbackSubmit;
    }

    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupFormSelector.addEventListener('submit', () => {
            this._callbackSubmit(this._getInputValues())
        })
        
    }

    close() {
        super.close();
        this._popupFormSelector.reset();
    }
}