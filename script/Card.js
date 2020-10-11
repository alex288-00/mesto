
export class Card {
    constructor(link, name, selector, openPopupImg) {
        this._link = link;
        this._name = name;
        this._selector = selector;
        this._openPopupImg = openPopupImg;
    }

    _getTamplate() {
        return document.querySelector(this._selector).content.cloneNode(true).children[0];
    }

    _openPopupImg() {
        this._openPopupImg(this._link, this._name);
    }

    _deleteHandler() {
        this._element.remove();
    }

    _likeHandler(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _setListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => this._deleteHandler());
        this._element.querySelector('.element__like').addEventListener('click', (evt) => this._likeHandler(evt));
        this._element.querySelector('.element__image').addEventListener('click', () => this._openPopupImg(this._link, this._name));
    }

    createCard() {
        this._element = this._getTamplate();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setListeners();
        return this._element;
    }
   
}


