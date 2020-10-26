import '../pages/index.css';
import {initialCards, params, editProfileBtn, nameInput,jobInput, addPlaceButton} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js'

//Функционал создания карточек
const createCardFunction = (item, selector) => {
    const card = new Card(item,selector, {
        handleCardClick: (link, name) =>{
            popupWithImage.open(link, name)
        }});
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
}

//Создание карточек из массива
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCardFunction(item, '#element-temp')
    } 
}, '.elements')

cardList.renderItems();

//Создание нового места
const formPlace = new PopupWithForm ({
    popupSelector: '.popup_add-card',
    callbackSubmit: (item) => {
        createCardFunction(item, '#element-temp')
        formPlace.close();
    }
},'.popup__form_add-card');

formPlace.setEventListeners();

//Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_img');

//Закрытие Popup изображения
popupWithImage.setEventListeners();

//Открытие Popup нового места
addPlaceButton.addEventListener('click', function () {
    formPlace.open();
    formAddPlaceValidator.clearFormErrors();
});

//Экземпляр класса UserInfo
const user = new UserInfo({
    userName: '.profile__info-name',
    userProfession: '.profile__info-job'
});

const userInfoText = user.getUserInfo();

//Экземпляр класса PopupWithForm
const formProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    callbackSubmit: (item) => {
        user.setUserInfo(item)
        userInfoText.name = nameInput.value;
        userInfoText.job = jobInput.value;
        formProfile.close();
    }
}, '.popup__form_profile');

formProfile.setEventListeners();

//Открытие попап профиля и редактироавние
editProfileBtn.addEventListener('click', () => {
    formEditProfileValidator.clearFormErrors(); 
    formProfile.open();
    nameInput.value = userInfoText.name;
    jobInput.value = userInfoText.job;
});

//Экземпляры класса для валидации каждой формы
const formEditProfileValidator = new FormValidator(params.formSelectorProfile, params);
formEditProfileValidator.enableValidation();

const formAddPlaceValidator = new FormValidator(params.formSelectorAddCard, params);
formAddPlaceValidator.enableValidation();
