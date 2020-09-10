const editBtn = document.querySelector('.profile__info-editbutton');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_job');
const infoName = document.querySelector('.profile__info-name');
const infoJob = document.querySelector('.profile__info-job');
const saveBtn = document.querySelector('.popup__button');
const popupImg = document.querySelector('.popup_img');
const elementTemplate = document.querySelector('#element-temp').content;
const elements = document.querySelector('.elements');
const closePopupImg = popupImg.querySelector('.popup__close');
const addPlaceButton = document.querySelector('.profile__info-addbutton');
const page = document.querySelector('.page');

//Функция открытия popup
function popupOpen (popupElement) {
    popupElement.classList.toggle('popup_opened');    
};

//Функция открытия popup редактирования профиля
function profileEdit () {
    
    nameInput.value = infoName.textContent;
    jobInput.value = infoJob.textContent;
    popupOpen(popup); 
};

//Функция сохранения данных профиля
function saveProfile () {
    
    infoName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;
    popupOpen(popup);
    
};

//Редактирование профиля
editBtn.addEventListener('click', profileEdit);

closeBtn.addEventListener('click', profileEdit);

saveBtn.addEventListener('click', saveProfile);

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
        popupOpen(popupImg);
        bigImg.src = link;
        bigImg.alt = name;
        bigImgSubtitle.textContent = name;    
});

    elementNew.cloneNode(true);
    elements.prepend(elementNew);   
};

initialCards.forEach(({link, name}) =>{
    createCard(link, name)
});

//Закрытие Popup изображения

    closePopupImg.addEventListener('click', function() {
        popupOpen(popupImg) 
});
      
//Popup добавления места

const popupAddPlace = popup.cloneNode(true);
const popupAddName = popupAddPlace.querySelector('.popup__field_name');
const popupAddUrl = popupAddPlace.querySelector('.popup__field_job');
const popupAddTitle = popupAddPlace.querySelector('.popup__title');
page.append(popupAddPlace);

addPlaceButton.addEventListener('click', function () {
    popupOpen(popupAddPlace); 
    popupAddUrl.value = '';
    popupAddName.value = '';
    popupAddTitle.textContent = 'Новое место';
    popupAddName.placeholder = 'Название';
    popupAddUrl.placeholder = 'Ссылка на картинку';
    popupAddPlace.querySelector('.popup__button').textContent = 'Создать';  
});

const popupClose = popupAddPlace.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
    popupOpen(popupAddPlace); 
});

//Добавление нового места

popupAddPlace.querySelector('.popup__button').addEventListener('click',function() {
    createCard (popupAddUrl.value, (popupAddName.value))
    popupOpen(popupAddPlace);
    
});





    




