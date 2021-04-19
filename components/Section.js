export default class Section {
    constructor(object, cardSelector) {
        // this._renderedItems = object.items
        this._renderer = object.renderer
        this._container = document.querySelector(cardSelector)
        // this._api = api
    }
    addItem(element) {
        this._container.prepend(element);
    };
    renderItems(cards) {
        cards.reverse().forEach(item => {
            this._renderer(item);
        });


    }
}