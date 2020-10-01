const popup = document.querySelector('.popup');
const editProfileBtn = document.querySelector('.profile__info-editbutton');
const closeProfileBtn = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const infoName = document.querySelector('.profile__info-name');
const infoJob = document.querySelector('.profile__info-job');
const popupImg = document.querySelector('.popup_img');
const elementTemplate = document.querySelector('#element-temp').content;
const elements = document.querySelector('.elements');
const closePopupImg = popupImg.querySelector('.popup__close');
const addPlaceButton = document.querySelector('.profile__info-addbutton');
const page = document.querySelector('.page');

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
        return
    }
    closePopup (popupOpened);
};

//Открытие попап
function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupByEsc);
    //Уважаемый код-ревьюер, я вызываю тут функцию enableValidation для проверки заполнения формы при открытии попап. 
    //Функция enableValidation уже есть в файле validate.js
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled'
    });
        
};

//Закрытие попап
function closePopup (popupElement) {  
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupByEsc); 
    clearFormErrors(popupElement);           
};

popup.addEventListener('click', popupCloseByOverlay);
popupImg.addEventListener('click', popupCloseByOverlay);

//Функция открытия popup редактирования профиля
function editProfile (evt) {
    evt.preventDefault();
    nameInput.value = infoName.textContent;
    jobInput.value = infoJob.textContent;
    openPopup(popup)
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
    editProfile;
    closePopup(popup);
});

//Сохранение профиля
popupForm.addEventListener('submit', saveProfile);

//Массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Загрузка карточек из массива
function createCard (link, name) {
    const elementNew = elementTemplate.cloneNode(true);
    const cardImage = elementNew.querySelector('.element__image');
    const cardTitle = elementNew.querySelector('.element__title');
    const elemTrash = elementNew.querySelector('.element__trash');
    const elemLike = elementNew.querySelector('.element__like');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    
    //Удаление карточек
    const removeBtn = elemTrash;
    removeBtn.addEventListener('click', function() {
        removeBtn.parentElement.remove();
});

    //Лайк карточки
    elemLike.addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
});

    //Открытие Popup изображения
    const imagePopupButton = cardImage;
    const bigImg = document.querySelector('.popup__image');
    const bigImgSubtitle = document.querySelector('.popup__subtitle');
    imagePopupButton.addEventListener('click', function () { 
        openPopup(popupImg);
        bigImg.src = link;
        bigImg.alt = name;
        bigImgSubtitle.textContent = name;    
});
 
    return elementNew;
};

initialCards.forEach(({link, name}) => {
     elements.prepend(createCard(link,name));
});

//Закрытие Popup изображения
closePopupImg.addEventListener('click', function() {
    closePopup(popupImg);    
});

const popupAddPlace = document.querySelector('.popup_add-card');
const popupAddName = popupAddPlace.querySelector('.popup__input_mesto');
const popupAddUrl = popupAddPlace.querySelector('.popup__input_link');
const popupAddTitle = popupAddPlace.querySelector('.popup__title_add-card');
const formAddPlace = popupAddPlace.querySelector('.popup__form');

addPlaceButton.addEventListener('click', function () {
    openPopup(popupAddPlace);    
});

const popupClose = popupAddPlace.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
    closePopup(popupAddPlace); 
});

popupAddPlace.addEventListener('click', popupCloseByOverlay);

//Добавление нового места
    formAddPlace.addEventListener('submit',function(evt) {
    evt.preventDefault();
    closePopup(popupAddPlace); 
    elements.prepend(createCard(popupAddUrl.value, popupAddName.value));   
    formAddPlace.reset();
});

