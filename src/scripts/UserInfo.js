export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob }) {
    this._selectorUserName = document.querySelector(selectorUserName);
    this._selectorUserJob = document.querySelector(selectorUserJob);
  }

  // Метод возвращает объект с данными пользователя. Метод позволит подставить данные пользователя в форму при открытии.
  getUserInfo() {
    const userData = {

    name: this._selectorUserName.textContent,
    job: this._selectorUserJob.textContent
    };

    return userData;
  }

  // Метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, job }) {
    this._selectorUserName.textContent = name; //  здесь необходимо разобраться что здесь привязать
    console.log ('здесь должна получить новое значение имени', name)

    this._selectorUserJob.textContent = job; // здесь тоже надо разобраться
  }

}