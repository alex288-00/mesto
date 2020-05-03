const editbtn = document.querySelector('.profile__info-editbutton');
const popup = document.querySelector('.popup');
const closebtn = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_job');
const infoname = document.querySelector('.profile__info-name');
const infojob = document.querySelector('.profile__info-job');
const savebtn = document.querySelector('.popup__button');


//Функция открытия popup
function popupOpen (popup) {
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_hidden');      
};

//Popup редактирования профиля
editbtn.addEventListener('click', function() {
    popupOpen(popup);
    nameInput.value = infoname.textContent;
    jobInput.value = infojob.textContent;    
});

closebtn.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_hidden');
});

savebtn.addEventListener('click', function() {
    infoname.textContent = nameInput.value;
    infojob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_hidden');
});

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
function cards (item) {
    const elementTemplate = document.querySelector('#element-temp').content;
    const elements = document.querySelector('.elements');
    const elementNew = elementTemplate.cloneNode(true);
    elementNew.querySelector('.element__image').src = item.link;
    elementNew.querySelector('.element__image').alt = item.name;
    elementNew.querySelector('.element__title').textContent = item.name;
    
    //Удаление карточек
    const removeBtn = elementNew.querySelector('.element__trash');
    removeBtn.addEventListener('click', function() {
        removeBtn.parentElement.remove();
    });
    //Лайк карточки
    elementNew.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    //Открытие Popup изображения
    const imagePopupButton = elementNew.querySelector('.element__image');
    const popupImg = document.querySelector('.popup_img');
    imagePopupButton.addEventListener('click', function() {
        popupImg.classList.add('popup_opened');
        popupImg.classList.remove('popup_hidden');
        document.querySelector('.popup__image').src = item.link;
        document.querySelector('.popup__image').alt = item.name;
        document.querySelector('.popup__subtitle').textContent = item.name;
});
    //Закрытие Popup изображения
    const closePopupImg = popupImg.querySelector('.popup__close');
    closePopupImg.addEventListener('click', function() {
        popupImg.classList.remove('popup_opened');
        popupImg.classList.add('popup_hidden');
});

    elementNew.cloneNode(true);
    elements.append(elementNew);
};
       
//Popup добавления места
const addPlaceButton = document.querySelector('.profile__info-addbutton');
const page = document.querySelector('.page');
const popupAddPlace = popup.cloneNode(true);
page.append(popupAddPlace);

addPlaceButton.addEventListener('click', function () {
    popupAddPlace.classList.add('popup_opened');
    popupAddPlace.classList.remove('popup_hidden');
    
    const popupAddTitle = popupAddPlace.querySelector('.popup__title');
    popupAddTitle.textContent = 'Новое место';
    const popupAddName = popupAddPlace.querySelector('.popup__field_name');
    popupAddName.placeholder = 'Название';
    const popupAddUrl = popupAddPlace.querySelector('.popup__field_job');
    popupAddUrl.placeholder = 'Ссылка на картинку';
    popupAddPlace.querySelector('.popup__button').textContent = 'Создать';  
});

const popupClose = popupAddPlace.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
    popupAddPlace.classList.remove('popup_opened');
    popupAddPlace.classList.add('popup_hidden');
});

//Добавление нового места
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-temp').content;
const elementNew = elementTemplate.cloneNode(true);

function create (elem) {

    const elementNew = elementTemplate.cloneNode(true);
    
    elementNew.querySelector('.element__title').textContent = popupAddPlace.querySelector('.popup__field_name').value;
    elementNew.querySelector('.element__image').src = popupAddPlace.querySelector('.popup__field_job').value;
    elementNew.querySelector('.element__image').alt = popupAddPlace.querySelector('.popup__field_name').value;
    popupAddPlace.classList.remove('popup_opened');
    popupAddPlace.classList.add('popup_hidden');    
    popupAddPlace.querySelector('.popup__field_job').value = '';
    popupAddPlace.querySelector('.popup__field_name').value = '';
    elementNew.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');        
    });

    const removeBtn = elementNew.querySelector('.element__trash');
    removeBtn.addEventListener('click', function() {
        removeBtn.parentElement.remove();
    });

//Открытие popup изображения добавленной карточки    
    const imagePopupButton = elementNew.querySelector('.element__image');
    const popupImg = document.querySelector('.popup_img');
    imagePopupButton.addEventListener('click', function(evt) {
        popupImg.classList.add('popup_opened');
        popupImg.classList.remove('popup_hidden');
        popupImg.querySelector('.popup__image').src = evt.target.src;
        popupImg.querySelector('.popup__image').alt = evt.target.alt;
        popupImg.querySelector('.popup__subtitle').textContent = evt.target.alt;
    });  

   elements.prepend(elementNew);
   
};
popupAddPlace.querySelector('.popup__button').addEventListener('click', create);

initialCards.forEach(cards);
    





    

