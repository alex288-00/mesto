import {Popup} from './Popup.js';

export class PopupConfirmation extends Popup {
    constructor({popupSelector, callbackSubmit}) {
        super(popupSelector)
        this._popupSelector = document.querySelector(popupSelector);
        this._callbackSubmit = callbackSubmit
    }

    //Про сабмите передаем в колбек карточку которую сохранили в open
    _handleSubmit() {
        this._callbackSubmit(this._card);
    }

    //Обработчик события
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })

    }

    //Сохраняем карточку из параметров в свойство
    open(card) {
        this._card = card;
        super.open();
    }
}