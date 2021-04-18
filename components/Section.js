export default class Section {
    constructor(object, cardSelector) {
        this._renderedItems = object.items
        this._renderer = object.renderer
        this._cardSelector = cardSelector
        // this._api = api
    }
    addItem(element) {
        this._cardSelector.prepend(element);
    };
    renderItems() {
        this._renderedItems.reverse().forEach(item => {
            this._renderer(item);
        });
    }
}