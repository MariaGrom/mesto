export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._selectorUserName = document.querySelector(selectorUserName);
    this._selectorUserJob = document.querySelector(selectorUserJob);
    this._selectorUserAvatar = document.querySelector(selectorUserAvatar);

  }

  // Метод возвращает объект с данными пользователя. Метод позволит подставить данные пользователя в форму при открытии.
  getUserInfo() {
    const userData = {

      name: this._selectorUserName.textContent,
      job: this._selectorUserJob.textContent,
      avatar: this._selectorUserAvatar.src

    };

    return userData;
  }

  /*getUserAvatar() {

    const userAvatar = {
      avatar: this._selectorUserAvatar.src
    }

    return userAvatar;
  }*/

  // Метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, job }) {
    this._selectorUserName.textContent = name;
    this._selectorUserJob.textContent = job;

  }

  setUserAvatar({ avatar }) {
    this._selectorUserAvatar.src = avatar;
  }

}
