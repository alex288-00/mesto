import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupSelector = document.querySelector(popupSelector);
        this._cardElementImage = document.querySelector('.popup__subtitle');
        this._bigImg = document.querySelector('.popup__image');
    }

    //Подставляем ссылку на изображение и подпись
    open(link, name) {
        super.open()
        this._bigImg.src = link;
        this._bigImg.alt = name;
        this._cardElementImage.textContent = name;
    }
}