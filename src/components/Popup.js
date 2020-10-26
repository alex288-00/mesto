export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupSelector.querySelector('.popup__close');

    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        })


    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        })

    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape' && this._popupSelector) {
            this.close(this._popupSelector)
        }

    }


    setEventListeners() {
        this._popupCloseBtn.addEventListener('click', () => {
            this.close()

        })

    }
}