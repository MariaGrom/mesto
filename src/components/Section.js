export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, id) {

    items.forEach(item => {
      const isCardMine = item.owner._id === id 
      this._renderer(item, isCardMine)
    });
  }

  //Метод добавления элемента - принимает сформированную карточку и добавлает ее в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}