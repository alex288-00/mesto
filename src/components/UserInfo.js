export class UserInfo {
    constructor({userName, userProfession}) {
        this._userName = document.querySelector(userName);
        this._userProfession = document.querySelector(userProfession);  
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userProfession.textContent
        }
    }

    setUserInfo({name, job}) {
        this._userName.textContent = name;
        this._userProfession.textContent = job;
    }
}

