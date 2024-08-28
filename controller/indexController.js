// import methods
import {autoFillCurrentDate, lastOrderItems, loadOrdersCount} from "./orderController.js";
import {loadCustomerComboBoxValues} from "./orderController.js";
import {loadItemComboBoxValues} from "./orderController.js";
import {loadCustomerTable} from "./customerController.js";
import {loadCustomersCount} from "./customerController.js";
import {loadItemTable} from "./itemController.js";
import {loadItemsCount} from "./itemController.js";
import {loadOrderHistoryTable} from "./orderHistoryController.js";


// set all customer count to the home page's customer card
loadCustomersCount();

// set all item count to home page's item card
loadItemsCount();

// set all order count to home page's order card
loadOrdersCount();

// display all customers in customer table
loadCustomerTable();

// display all items in item table
loadItemTable();

// display all orders in order history table
loadOrderHistoryTable(lastOrderItems);


// -------------------------- The start - when click navbar and some buttons --------------------------


export const displayNonSections = () => {
    $('#home-section').css({display: 'none'});
    $('#customer-section').css({display: 'none'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});
    $('#login-section').css({display: 'none'});
    $('#register-section').css({display: 'none'});
    $('#logout-section').css({display: 'none'});
}




/* start when first time loaded index.html */
displayNonSections();
$('#home-section').css({display: 'block'});
/* end when first time loaded index.html */




/* start home nav management */
$('#nav-home').on("click", function () {
    displayNonSections();
    loadCustomersCount();
    loadItemsCount();
    loadOrdersCount();
    $('#home-section').css({display: 'block'});
});
/* end home nav management */




/* start customers nav management */
$('#nav-customers').on("click", function () {
    displayNonSections();
    $('#customer-section').css({display: 'block'});
});
/* end customers nav management */




/* start items nav management */
$('#nav-items').on("click", function () {
    displayNonSections();
    // Load the item table
    loadItemTable();
    $('#item-section').css({display: 'block'});
});
/* end items nav management */




/* start orders nav management */
$('#nav-orders').on("click", function () {
    displayNonSections();
    $('#order-section').css({display: 'block'});

    // ---- when click order nav link want to load customer IDs, item codes and autofill current date ----
    autoFillCurrentDate();
    loadCustomerComboBoxValues("#customersIdComboBox");
    loadItemComboBoxValues("#itemsIdComboBox");
    loadOrderHistoryTable(lastOrderItems);

});
/* end orders nav management */




/* start login nav management */
$('#btn-login').on("click", function () {
    displayNonSections();
    $('#login-section').css({display: 'block'});
    $('#navbar-section').css({display: 'none'});
});
/* end login nav management */




/* start register nav management */
$('#btn-register').on("click", function () {
    displayNonSections();
    $('#register-section').css({display: 'block'});
    $('#navbar-section').css({display: 'none'});
});
/* end register nav management */




/* start logout nav management */
$('#btn-logout').on("click", function () {
    displayNonSections();
    $('#logout-section').css({display: 'block'});
    $('#navbar-section').css({display: 'none'});
});
/* end logout nav management */




/* when click login page's register button */
$('#go-register-page').on("click", function () {
    displayNonSections();
    $('#register-section').css({display: 'block'});
});
/* end when click login page's register button */




/* when click register page's login button */
$('#go-login-page').on("click", function () {
    displayNonSections();
    $('#login-section').css({display: 'block'});
});
/* end when click login page's register button */




/* when click home page's customer card's more button */
$('#go-customer-page').on("click", function () {
    displayNonSections();
    $('#customer-section').css({display: 'block'});

    $('ul span.active').removeClass('active');
    $('ul li:nth-child(2) span').addClass('active');
});
/* end when click home page's customer card's more button */




/* when click home page's item card's more button */
$('#go-item-page').on("click", function () {
    displayNonSections();
    $('#item-section').css({display: 'block'});

    $('ul span.active').removeClass('active');
    $('ul li:nth-child(3) span').addClass('active');
});
/* end when click home page's customer card's more button */




/* when click home page's order card's more button */
$('#go-orders-page').on("click", function () {
    displayNonSections();
    $('#order-section').css({display: 'block'});

    // ---- when click order nav link want to load customer IDs, item codes and autofill current date ----
    autoFillCurrentDate();
    loadCustomerComboBoxValues("#customersIdComboBox");
    loadItemComboBoxValues("#itemsIdComboBox");

    $('ul span.active').removeClass('active');
    $('ul li:nth-child(4) span').addClass('active');
});
/* end when click home page's customer card's more button */




/* start adding active class on click */
$('ul').on("click", 'span', function () {
    $('ul span.active').removeClass('active');
    $(this).addClass('active');
});
/* end adding active class on click */



// -------------------------- The end - when click navbar and some buttons --------------------------