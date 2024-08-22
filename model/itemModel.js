export class ItemModel{

    constructor(code, name, price, qty) {
        this._code = code;
        this._name = name;
        this._price = price;
        this._qty = qty;
    }

    get code() {
        return this._code;
    }

    set code(code) {
        this._code = code;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    get qty() {
        return this._qty;
    }

    set qty(qty) {
        this._qty = qty;
    }
}