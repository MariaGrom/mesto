export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._data = {};
    this._selectorUserName = document.querySelector(selectorUserName);
    this._selectorUserJob = document.querySelector(selectorUserJob);
    this._selectorUserAvatar = document.querySelector(selectorUserAvatar);

  }

  // Метод возвращает объект с данными пользователя. Метод позволит подставить данные пользователя в форму при открытии.
  getUserInfo() {

    return this._data;
  }

  // Метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._data = data;
    this._selectorUserName.textContent = data.name;
    this._selectorUserJob.textContent = data.about;

  }

  setUserAvatar(data) {
    this._data = data;
    this._selectorUserAvatar.src = data.avatar;
  }

}
