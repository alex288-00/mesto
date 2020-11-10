export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //Метод принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }

    //Метод отвечает за отрисовку всех элементов
    renderItems(res, myId) {
        res.forEach(item => {
            this._renderer(item, myId)
        })

    }
}