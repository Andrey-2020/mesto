export default class UserInfo {
    constructor(name, about) {
        this._formElement = document.querySelector(".form_type_edit");
        this._name = this._formElement.querySelector(name);
        this._about = this._formElement.querySelector(about);
        this._profilename = document.querySelector(".profile__autor");
        this._profilejob = document.querySelector(".profile__profession");
    }
    getUserInfo() {
        this._name.value = this._profilename.textContent;
        this._about.value = this._profilejob.textContent;
    }
    setUserInfo() {
        this._profilename.textContent = this._name.value;
        this._profilejob.textContent = this._about.value;
    };
}
