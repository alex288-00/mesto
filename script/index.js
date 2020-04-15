const editbtn = document.querySelector('.profile__info-editbutton');
const popup = document.querySelector('.popup');
const closebtn = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_job');
const infoname = document.querySelector('.profile__info-name');
const infojob = document.querySelector('.profile__info-job');
const savebtn = document.querySelector('.popup__button');

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


