export default class Api {
  constructor(configApi) {
    this._url = configApi.url;
    this._headers = configApi.headers;
  }


  // 1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log ('Ошибка из АПИ!')
      }
    })
  }


  // 2. Загрузка карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log ('Ошибка из АПИ!')
        }
      })
  }

  // 3. Редактирование профиля
  updateUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log ('Ошибка обновления данных профиля из АПИ!')
        }
      })
  }

  // 4. Добавление новой карточки 
  createNewCard({ name, link }){
    return fetch(`${this._url}/cards`,
    {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log ('Ошибка добавления карточки из АПИ!')
      }
    })
  }







}