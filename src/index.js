import './pages/index.css';
import {initialCards, params, popupProfile, editProfileBtn, popupProfileForm, nameInput,
    jobInput, popupImg, addPlaceButton, popupAddPlace} from './utils/constants.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js'
import {PopupWithForm} from './components/PopupWithForm.js';
import {Popup} from './components/Popup.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {UserInfo} from './components/UserInfo.js'

//Создание карточек из массива
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item,'#element-temp', {
            handleCardClick: () =>{
                new PopupWithImage('.popup_img').open(item.link, item.name)
            }})
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
    }
}, '.elements')

cardList.renderItems();

//Создание нового места
const formPlace = new PopupWithForm ({
    popupSelector: '.popup_add-card',
    callbackSubmit: (item) => {
        const card = new Card(item, '#element-temp', {
            handleCardClick: () => {
                new PopupWithImage('.popup_img').open(item.link, item.name)
            } });
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
        formPlace.close();
    }
},'.popup__form_add-card');

formPlace.setEventListeners();

//Открытие Popup нового места
addPlaceButton.addEventListener('click', function () {
    formPlace.open();
    formAddPlaceValidator.clearFormErrors();

});

//Экземпляр класса UserInfo
const user = new UserInfo({
    userName: '.profile__info-name',
    userProfession: '.profile__info-job'
})

//Экземпляр класса PopupWithForm
const formProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    callbackSubmit: (item) => {
        user.setUserInfo(item)
    }
}, '.popup__form_profile');

formProfile.setEventListeners();

//Открытие попап профиля и редактироавние
editProfileBtn.addEventListener('click', () => {
    formEditProfileValidator.clearFormErrors(); 
    formProfile.open();
    nameInput.value = user.getUserInfo().name;
    jobInput.value = user.getUserInfo().job;
});

//Сохранение профиля
popupProfileForm.addEventListener('submit', () =>{
    formProfile.close();
    user.getUserInfo().name = nameInput.value;
    user.getUserInfo().job = jobInput.value;
});

//Экземпляр класса PopupWithImage
const zoomPopup = new PopupWithImage('.popup_img');

//Закрытие Popup изображения
zoomPopup.setEventListeners();

//Экземпляры класса для валидации каждой формы
const formEditProfileValidator = new FormValidator(params.formSelectorProfile, params);
formEditProfileValidator.enableValidation();

const formAddPlaceValidator = new FormValidator(params.formSelectorAddCard, params);
formAddPlaceValidator.enableValidation();

// Реализация закрытия попап при клике в пустую область
function popupCloseByOverlay (evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.target !== popupOpened) {
        return;
    }
    const popup = new Popup('.popup_opened');
    popup.close();
};

//Закрытие попапов при клике в пустую область
popupImg.addEventListener('click', popupCloseByOverlay);
popupAddPlace.addEventListener('click', popupCloseByOverlay);
popupProfile.addEventListener('click', popupCloseByOverlay);
