export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupSelector.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    //Открытие попапа 
    open(deleteCard) {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
        this._popupSelector.addEventListener('submit', deleteCard)
    }

    //Закрытие попапа 
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    //Реализация закрытия попапа по нажатию клавиши Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape' && this._popupSelector) {
            this.close(this._popupSelector)
        }
    }

    //Реализация закрытия попапа при клике в пустую область
    _popupCloseByOverlay(evt) {
        if (evt.target !== this._popupSelector) {
            return;
        }
        this.close()
    }

    //Метод добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popupCloseBtn.addEventListener('click', this.close.bind(this));
        this._popupSelector.addEventListener('click', this._popupCloseByOverlay.bind(this));
    }
}