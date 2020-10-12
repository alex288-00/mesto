import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'
import {initialCards, params} from './constants.js'

const popup = document.querySelector('.popup');
const editProfileBtn = document.querySelector('.profile__info-editbutton');
const closeProfileBtn = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const infoName = document.querySelector('.profile__info-name');
const infoJob = document.querySelector('.profile__info-job');
const popupImg = document.querySelector('.popup_img');
const elements = document.querySelector('.elements');
const closePopupImg = popupImg.querySelector('.popup__close');
const addPlaceButton = document.querySelector('.profile__info-addbutton');
const bigImg = document.querySelector('.popup__image');
const bigImgSubtitle = document.querySelector('.popup__subtitle');

//Закрытие попап клавишей Esc
function closePopupByEsc (evt) { 
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.key === 'Escape' && popupOpened) {
        closePopup(popupOpened);    
    }        
};

// Реализация закрытия попап при клике в пустую область
function popupCloseByOverlay (evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.target !== popupOpened) {
        return;
    }
    closePopup (popupOpened);
};

//Открытие попап
function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupByEsc);    
};

//Закрытие попап
function closePopup (popupElement) {  
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupByEsc);     
};

//Функция открытия popup редактирования профиля
function editProfile (evt) {
    evt.preventDefault();
    formEditProfileValidator.clearFormErrors(popup);
    nameInput.value = infoName.textContent;
    jobInput.value = infoJob.textContent;
    openPopup(popup);
};

//Функция сохранения данных профиля
function saveProfile () {
    infoName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;   
    closePopup(popup);    
};

//Открытие попап профиля
editProfileBtn.addEventListener('click', editProfile);    

//Закрытие попап профиля
closeProfileBtn.addEventListener('click', ()=> {
    closePopup(popup);
});

popup.addEventListener('click', popupCloseByOverlay);

//Сохранение профиля
popupForm.addEventListener('submit', saveProfile);

initialCards.forEach(({link, name}) => {
    const cards = new Card(link, name, '#element-temp', openPopupImg)
    elements.prepend(cards.createCard());
});

//Открытие Popup изображения
function openPopupImg (link, name) {
    openPopup(popupImg);
    bigImg.src = link;
    bigImg.alt = name;
    bigImgSubtitle.textContent = name;
};

//Закрытие Popup изображения
closePopupImg.addEventListener('click', function() {
    closePopup(popupImg);    
});

popupImg.addEventListener('click', popupCloseByOverlay);

const popupAddPlace = document.querySelector('.popup_add-card');
const popupAddName = popupAddPlace.querySelector('.popup__input_mesto');
const popupAddUrl = popupAddPlace.querySelector('.popup__input_link');
const formAddPlace = popupAddPlace.querySelector('.popup__form');

//Открытие Popup нового места
addPlaceButton.addEventListener('click', function () {
    openPopup(popupAddPlace); 
    formAddPlaceValidator.clearFormErrors(popupAddPlace);

});

//Закрытие Popup нового места
const popupClose = popupAddPlace.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
    closePopup(popupAddPlace); 
});

popupAddPlace.addEventListener('click', popupCloseByOverlay);

//Добавление нового места
formAddPlace.addEventListener('submit',function(evt) {
    evt.preventDefault(); 
    const cards = new Card(popupAddUrl.value, popupAddName.value, '#element-temp', openPopupImg)  
    elements.prepend(cards.createCard())
    closePopup(popupAddPlace); 
    formAddPlace.reset();
});

//Экземпляры класса для валидации каждой формы
const formEditProfileValidator = new FormValidator(params.formSelectorProfile, params);
formEditProfileValidator.enableValidation();

const formAddPlaceValidator = new FormValidator(params.formSelectorAddCard, params);
formAddPlaceValidator.enableValidation();