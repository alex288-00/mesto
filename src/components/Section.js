export class Section {
    constructor({items, renderer}, containerSelector){
        this._renderItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //Метод принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }

    //Метод отвечает за отрисовку всех элементов
    renderItems() {
        this._renderItems.forEach(item => {
            this._renderer(item)
        })

    }
}