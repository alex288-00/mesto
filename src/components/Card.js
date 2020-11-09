
export class Card {
    constructor(data, selector, myId, {handleCardClick, handleCardDelete, handleCardLike}) {
        this._link = data.link;
        this._name = data.name;
        this._cardId = data._id;
        this._likes = data.likes;
        this._likeSum = data.likes.length;
        this._ownerId = data.owner._id
        this._selector = selector;
        this._myId = myId;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
    }

    //Возвращаем элемент
    _getTamplate() {
        return document.querySelector(this._selector).content.cloneNode(true).children[0];
    }

    //Удаление карточки
    deleteHandler() {
        this._element.remove();
    }

    //Лайк карточки
    _likeHandler() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    //Обработчики событий
    _setListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => this._handleCardDelete());
        this._element.querySelector('.element__like').addEventListener('click', () => this._handleCardLike());
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    }

    //Создание карточки
    createCard(myId) {
        this._element = this._getTamplate();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__counter').textContent = this._likeSum;
        if(this._ownerId != myId) {
            this._element.querySelector('.element__trash').classList.add('element__trash_hidden')
        }
        this._likes.forEach((item) => {
            if(item._id == myId) {
                this._element.querySelector('.element__like').classList.add('element__like_active')
            }
        })

        this._setListeners();
        return this._element;
    } 

    //Проверка лайкнута ли карточка
    liked() {
        if(this._element.querySelector('.element__like').classList.contains('element__like_active')) {
            return true
        }
        return false
    }

    //Обновление счетчика и лайк карточки
    updateLike(likesum) {
        this._likeHandler()
        this._element.querySelector('.element__counter').textContent = likesum;
    }

    //id карточки
    getId() {
        return this._cardId
    }
}


