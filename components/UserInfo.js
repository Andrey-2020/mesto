export default class UserInfo {
    constructor(name, about) {
        this._profileName = document.querySelector(name);
        this._profileProfession = document.querySelector(about);
    }
    getUserInfo() {
        return {
          name: this._profileName.textContent,
          profession: this._profileProfession.textContent,
        }
      } 
    // getUserInfo() {
        
    //     this._name.value = this._profilename.textContent;
    //     this._about.value = this._profilejob.textContent;
    // }
    setUserInfo(name, profession) {
        this._profileName.textContent = name;
        this._profileProfession.textContent = profession;
      } 
}
