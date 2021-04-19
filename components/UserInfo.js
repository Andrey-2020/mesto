export default class UserInfo {
  constructor(name, about, avatar) {
    this._profileName = document.querySelector(name);
    this._profileProfession = document.querySelector(about);
    this._profileAvatar = document.querySelector(avatar);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    }
  }

  setUserInfo(name, profession, avatar) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = profession;
    this._profileAvatar.src = avatar;

  }
}
