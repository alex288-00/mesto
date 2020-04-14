let editbtn = document.querySelector('.profile__info-editbutton');
let popup = document.querySelector('.popup');
let closebtn = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__field_name');
let jobInput = document.querySelector('.popup__field_job');
let infoname = document.querySelector('.profile__info-name');
let infojob = document.querySelector('.profile__info-job');
let savebtn = document.querySelector('.popup__button');

editbtn.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = infoname.textContent;
    jobInput.value = infojob.textContent;    
});

closebtn.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});

savebtn.addEventListener('click', function() {
    infoname.textContent = nameInput.value;
    infojob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
});


