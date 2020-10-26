
export class Card {
    constructor(data, selector, {handleCardClick}) {
        this._link = data.link;
        this._name = data.name;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    //Возвращаем элемент
    _getTamplate() {
        return document.querySelector(this._selector).content.cloneNode(true).children[0];
    }

    //Удаление карточки
    _deleteHandler() {
        this._element.remove();
    }

    //Лайк карточки
    _likeHandler(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    //Обработчики событий
    _setListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => this._deleteHandler());
        this._element.querySelector('.element__like').addEventListener('click', (evt) => this._likeHandler(evt));
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    }

    //Создание карточки
    createCard() {
        this._element = this._getTamplate();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setListeners();
        return this._element;
    } 
}


