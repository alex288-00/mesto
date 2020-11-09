export class UserInfo {
    constructor({userName, userProfession}) {
        this._userName = document.querySelector(userName);
        this._userProfession = document.querySelector(userProfession);  
        this._userAvatar = document.querySelector('.profile__avatar');
    }

    //Возвращаем объект с данными пользователя
    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userProfession.textContent
        }
    }

    //Принимаем новые данные пользователя
    setUserInfo({name, about}) {
        this._userName.textContent = name;
        this._userProfession.textContent = about;
    }

    //ОПринимаем новую ссылку для аватара
    setUserAvatar(userData) {
        this._userAvatar.src = userData.avatar
    }
}

