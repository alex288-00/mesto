export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupSelector.querySelector('.popup__close');
    }

    //Открытие попапа 
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        })
    }

    //Закрытие попапа 
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        })
    }

    //Реализация закрытия попапа по нажатию клавиши Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape' && this._popupSelector) {
            this.close(this._popupSelector)
        }
    }

    _popupCloseByOverlay(evt) {
        if (evt.target !== this._popupSelector) {
            return;
        }
        this.close()
    }

    //Метод добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popupCloseBtn.addEventListener('click', () => {
            this.close()
        })
        this._popupSelector.addEventListener('click', (evt) => {
            this._popupCloseByOverlay(evt)
        }) 
    }
}