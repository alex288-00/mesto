import '../pages/index.css';
import {Api} from '../components/Api.js';
import {params, editProfileBtn, nameInput,jobInput, addPlaceButton, avatarBtn} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js'
import {PopupConfirmation} from '../components/PopupConfirmation.js';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: '206505f6-db9d-4d3e-9753-f9e84f791b0d'
});

Promise.all([api.getInitialCards(), api.getUserData()])
.then(([cards, userData]) => {
    cardList.renderItems(cards, userData._id);
    user.setUserInfo(userData);
    user.setUserAvatar(userData);
})

.catch((err) => {
    console.log('Произошла ошибка:', err)
})

//Экземпляр PopupConfirmation
const deleteCard = new PopupConfirmation({
    popupSelector: '.popup_form-confirm',
    callbackSubmit: (card) => {
        const id = card.getId()
        api.deleteCard(id)
        .then(() => {
            card.deleteHandler();
            deleteCard.close()
        })

        .catch((err) => {
            console.log('Произошла ошибка:', err)
        })
    }
})

deleteCard.setEventListeners();

 //Функционал создания карточек
const createCardFunction = (item, selector, myId) => {
    const card = new Card(item, selector, myId, {
        handleCardClick: (link, name) =>{
            popupWithImage.open(link, name)
        },
        handleCardDelete: () => {
            deleteCard.open(card);   
        },
        handleCardLike: () => {
            const id = card.getId()
            if(card.liked()) {
                api.deleteLike(id)
                .then((res) => {
                    card.updateLike(res.likes.length)
                })

                .catch((err) => {
                    console.log('Произошла ошибка:', err)
                })

            }
            else{
                api.putLike(id)
                .then((res) => {
                    card.updateLike(res.likes.length)
                })

                .catch((err) => {
                    console.log('Произошла ошибка:', err)
                })

            }
        }
    });

    const cardElement = card.createCard(myId);
    cardList.addItem(cardElement);
};

//Экземпляр Section
 const cardList = new Section({
       renderer: (item, myId) => {
           createCardFunction(item, '#element-temp', myId)
       } 
    }, '.elements');

//Создание нового места
const formPlace = new PopupWithForm ({
    popupSelector: '.popup_add-card',
    callbackSubmit: (cardData) => {
        formPlace.loadingBtnOn()
        api.postAddCard(cardData)
        .then((res) => {
            createCardFunction(res, '#element-temp', res.owner._id)
        })

        .catch((err) => {
            console.log('Произошла ошибка:', err)
        })

        .finally(() => {
            formPlace.loadingBtnOff()
        })
        
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

//Обновление аватара пользователя
const formAvatar = new PopupWithForm ({
    popupSelector: '.popup_update-avatar',
    callbackSubmit: (userData) => {
        formAvatar.loadingBtnOn()
        api.patchUserAvatar(userData)
        .then((res) => {
            user.setUserAvatar(res)
        })

        .catch((err) => {
            console.log('Произошла ошибка:', err)
        })

        .finally(() => {
            formAvatar.loadingBtnOff()
        })
        formAvatar.close();
        
    }
},'.popup__form_update-avatar');

formAvatar.setEventListeners();

//Открытие попап смены аватара
avatarBtn.addEventListener('click', () => {
    formAvatar.open();
    formUpdateAvatar.clearFormErrors();
});

//Экземпляр класса UserInfo
const user = new UserInfo({
    userName: '.profile__info-name',
    userProfession: '.profile__info-job'
});

//Экземпляр класса PopupWithForm для сохранения информации о профиле
const formProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    callbackSubmit: (userData) => {
        formProfile.loadingBtnOn()
        api.patchUserData(userData)
        .then((res) => {
            user.setUserInfo(res)
        })

        .catch((err) => {
            console.log('Произошла ошибка:', err)
        })

        .finally(() => {
            formProfile.loadingBtnOff()
        })
       // user.setUserInfo(item)
        formProfile.close();
    }
}, '.popup__form_profile');

formProfile.setEventListeners();

//Открытие попап профиля и редактироавние
editProfileBtn.addEventListener('click', () => {
    const userInfoText = user.getUserInfo();
    formEditProfileValidator.clearFormErrors();
    nameInput.value = userInfoText.name;
    jobInput.value = userInfoText.about;
    formProfile.open();
});

//Экземпляры класса для валидации каждой формы
const formEditProfileValidator = new FormValidator(params.formSelectorProfile, params);
formEditProfileValidator.enableValidation();

const formAddPlaceValidator = new FormValidator(params.formSelectorAddCard, params);
formAddPlaceValidator.enableValidation();

const formUpdateAvatar = new FormValidator(params.formSelectorUpdateAvatar, params);
formUpdateAvatar.enableValidation();