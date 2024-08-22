export class OrderModel{

    constructor(idOfOrder, dateOfOrder, idOfCustomer, itemsOfOrder, totalOfOrder, discountOfOrder, subTotalOfOrder) {
        this._idOfOrder = idOfOrder;
        this._dateOfOrder = dateOfOrder;
        this._idOfCustomer = idOfCustomer;
        this._itemsOfOrder = itemsOfOrder;
        this._totalOfOrder = totalOfOrder;
        this._discountOfOrder = discountOfOrder;
        this._subTotalOfOrder = subTotalOfOrder;
    }

    get idOfOrder() {
        return this._idOfOrder;
    }

    set idOfOrder(idOfOrder) {
        this._idOfOrder = idOfOrder;
    }

    get dateOfOrder() {
        return this._dateOfOrder;
    }

    set dateOfOrder(dateOfOrder) {
        this._dateOfOrder = dateOfOrder;
    }

    get idOfCustomer() {
        return this._idOfCustomer;
    }

    set idOfCustomer(idOfCustomer) {
        this._idOfCustomer = idOfCustomer;
    }

    get itemsOfOrder() {
        return this._itemsOfOrder;
    }

    set itemsOfOrder(itemsOfOrder) {
        this._itemsOfOrder = itemsOfOrder;
    }

    get totalOfOrder() {
        return this._totalOfOrder;
    }

    set totalOfOrder(totalOfOrder) {
        this._totalOfOrder = totalOfOrder;
    }

    get discountOfOrder() {
        return this._discountOfOrder;
    }

    set discountOfOrder(discountOfOrder) {
        this._discountOfOrder = discountOfOrder;
    }

    get subTotalOfOrder() {
        return this._subTotalOfOrder;
    }

    set subTotalOfOrder(subTotalOfOrder) {
        this._subTotalOfOrder = subTotalOfOrder;
    }
}