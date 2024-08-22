export class CustomerModel {

    constructor(id, name, address, phone) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._phone = phone;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        this._phone = phone;
    }
}