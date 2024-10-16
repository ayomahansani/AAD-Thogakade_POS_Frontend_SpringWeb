// import methods
import {loadItemTable} from "./itemController.js";
import {showErrorAlert} from "./customerController.js";
import {loadOrderHistoryTable} from "./orderHistoryController.js";


// create temporary arrays
let addedItems = [];
let tempItems = [];

// Global variable to store last order items
export let lastOrderItems = [];


let sum = 0;
var itemRecordIndex;
var addedItemIndex;



// -------------------------- The start - fill current date --------------------------
export function autoFillCurrentDate() {

    var d = new Date();

    var year = d.getFullYear();
    var month = d.getMonth() + 1;

    if(month < 10){
        month = '0' + month;
    }

    var date = d.getDate();

    if(date < 10){
        date = '0' + date;
    }

    var current_date = year + "-" + month + "-" + date;

    $("#orderDate").val(current_date);

}
// -------------------------- The end - fill current date --------------------------




// ---------------- The start - when first time order page is loaded, want to generate order id  ----------------
autoGenerateOrderId("");
// --------------- The end - when first time order page is loaded, want to generate order id  ----------------




// ---------------- The start - when first time order page is loaded, want to fill total inputs ----------------
$("#subTotal").val("Rs:000.00");
$("#total").val("Rs:000.00");
// ---------------- The end - when first time order page is loaded, want to fill total inputs ----------------




// -------------------------- The start - generate order id automatically --------------------------
export function autoGenerateOrderId(orderId) {

    $.ajax({
        url : "http://localhost:8086/thogakadePOSBackend/api/v1/orders",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success : function (results) {

            if(results.length !== 0){

                orderId = results[results.length-1].orderId;
                console.log("currentOrderId: " + orderId);

                var split = [];
                split = orderId.split("O0");
                var id = Number.parseInt(split[1]);
                id++;
                if(id < 10) {
                    $("#orderId").val("O00" + id);
                }else{
                    $("#orderId").val("O0" + id);
                }

            } else {
                $("#orderId").val("O001");
            }

        },
        error : function (error) {
            console.log(error)
        }
    })

}
// -------------------------- The end - generate order id automatically --------------------------




// -------------------------- The start - load customer IDs to customer combo box --------------------------
export function loadCustomerComboBoxValues(customerComboBoxId) {

    $.ajax({
        url: "http://localhost:8086/thogakadePOSBackend/api/v1/customers",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success: function (results) {
            console.log(results)

            $(customerComboBoxId).empty();

            $(customerComboBoxId).append($(`<option>`, {
                text: "choose customer ID"
            }));

            for (let i = 0; i < results.length; i++) {

                var cusId = results[i].id;

                $(customerComboBoxId).append($(`<option>`, {
                    value: cusId,
                    text: cusId
                }));
            }

        },
        error: function (error) {
            console.log(error)
        }
    })
}
// -------------------------- The end - load customer IDs to customer combo box --------------------------




// -------------------------- The start - load item IDs to item combo box --------------------------
export function loadItemComboBoxValues(itemComboBoxId) {

    $.ajax({
        url : "http://localhost:8086/thogakadePOSBackend/api/v1/items",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success : function (results) {

            $(itemComboBoxId).empty();

            $(itemComboBoxId).append($(`<option>`, {
                text: "choose item code"
            }));

            for (let i = 0; i < results.length; i++) {

                var itemCode = results[i].code;

                $(itemComboBoxId).append($(`<option>`, {
                    value: itemCode,
                    text: itemCode
                }));
            }
        },
        error : function (error) {
            console.log(error)
        }
    })

}
// -------------------------- The end - load item IDs to item combo box --------------------------




// ---------------- The start - when select a customer dropdown value , autofilled other inputs ----------------
$("#customersIdComboBox").change(function () {

    var currentSelectionCustomerId = $(this).val();

    $.ajax({
        url: "http://localhost:8086/thogakadePOSBackend/api/v1/customers",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success: function (results) {
            console.log(results)

            for (let i = 0; i < results.length; i++) {

                if(results[i].id === currentSelectionCustomerId) {
                    $("#cusId").val(results[i].id);
                    $("#cusName").val(results[i].name);
                    $("#cusAddress").val(results[i].address);
                    $("#cusPhone").val(results[i].phone);

                    return;

                } else {

                    $("#cusId").val("");
                    $("#cusName").val("");
                    $("#cusAddress").val("");
                    $("#cusPhone").val("");

                }

            }

        },
        error: function (error) {
            console.log(error)
        }
    })

});
// ---------------- The end - when select a customer dropdown value , autofilled other inputs ----------------




// ---------------- The start - when select a customer dropdown value , autofilled other inputs ----------------
$("#itemsIdComboBox").change(function () {

    var currentSelectionItemCode = $(this).val();

    $.ajax({
        url : "http://localhost:8086/thogakadePOSBackend/api/v1/items",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success : function (results) {

            for (let i = 0; i < results.length; i++) {

                if(results[i].code === currentSelectionItemCode) {
                    $("#itemCode").val(results[i].code);
                    $("#itemName").val(results[i].name);
                    $("#itemPrice").val(results[i].price);
                    $("#itemQtyOnH").val(results[i].qty);

                    return;

                } else {

                    $("#itemCode").val("");
                    $("#itemName").val("");
                    $("#itemPrice").val("");
                    $("#itemQtyOnH").val("");

                }

            }

        },
        error : function (error) {
            console.log(error)
        }
    })

});
// ---------------- The end - when select a customer dropdown value , autofilled other inputs ----------------




// -------------------------- The start - add-to-cart table loading --------------------------
function loadAddToCartTable() {

    $("#add-to-cart-tbl-tbody").empty();

    addedItems.map((item, index) => {

        addedItemIndex = index;

        // want to wrap => use ` mark

        let record = `<tr>
            <td> ${item.code} </td>    <!-- <td> = table data -->
            <td> ${item.name} </td>
            <td> Rs: ${item.price} </td>
            <td> ${item.qty} </td>
            <td> ${item.price * item.qty} </td>
            <td> <button type="button" class="btn btn-danger item-remove-button">Remove</button> </td>
        </tr>`;

        $("#add-to-cart-tbl-tbody").append(record);
        $("#add-to-cart-tbl-tbody").css("font-weight", 600);
        $(".btn-danger").css("font-weight", 600);

    });
}
// -------------------------- The end - add-to-cart table loading --------------------------




// -------------------------- The start - order's count loading --------------------------
export function loadOrdersCount() {

    $.ajax({
        url : "http://localhost:8086/thogakadePOSBackend/api/v1/orders",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success : function (results) {
            $("#orders-count").html(results.length);
        },
        error : function (error) {
            console.log(error)
        }
    })
}
// -------------------------- The end - order's count loading --------------------------




// -------------------------- The start - when click remove button want to call removeItem() function --------------------------
$("#table-add-to-cart").on('click', function (event) {

    if (event.target.classList.contains('item-remove-button')) {
        const row = event.target.closest('tr');
        const code = row.querySelector('td:nth-child(1)').textContent.trim();
        const qty = parseInt(row.querySelector('td:nth-child(4)').textContent.trim());
        const price = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('Rs:', '').trim());

        // call the function
        removeItem(code, qty, price);
    }
});
// -------------------------- The end - when click remove button want to call removeItem() function --------------------------




// -------------------------- The start - when click remove button of add-to-cart table --------------------------
function removeItem(addedItemRecord, qty, unitPrice) {

    console.log(addedItemRecord);
    console.log(qty);
    console.log(unitPrice);

    var total = unitPrice * qty ;


    var filt = addedItems.filter((item,index) => {

        if(addedItemRecord === item.code) {
            addedItems.splice(index,1);

            $.ajax({
                url : "http://localhost:8086/thogakadePOSBackend/api/v1/items",   // request eka yanna one thana
                type: "GET", // request eka mona vageda - type eka
                success : function (results) {

                    results.filter((item,index) => {

                        if(item.code === addedItemRecord) {

                            item.qty += qty;
                            loadItemComboBoxValues("#itemsIdComboBox");

                            $("#itemCode").val("");
                            $("#itemName").val("");
                            $("#itemPrice").val("");
                            $("#itemQtyOnH").val("");
                            $("#quantity").val("");

                            sum -= total;

                            $("#total").val(`Rs: ${sum}`);
                        }
                    });

                    // load the table
                    loadAddToCartTable();

                },
                error : function (error) {
                    console.log(error)
                }
            })
        }
    });
}
// -------------------------- The start - when click remove button of add-to-cart table --------------------------




// -------------------------- The start - when click add to cart button --------------------------
$("#addBtn").on('click', function () {

    var codeOfItem = $("#itemCode").val();
    var nameOfItem = $("#itemName").val();
    var priceOfItem = Number.parseFloat($("#itemPrice").val());
    var qtyOfItem = Number.parseInt($("#quantity").val());
    var itemTotal = priceOfItem * qtyOfItem;


    if(codeOfItem !== "") {

        $.ajax({
            url : "http://localhost:8086/thogakadePOSBackend/api/v1/items",   // request eka yanna one thana
            type: "GET", // request eka mona vageda - type eka
            success : function (results) {

                // chosen item's index of items[] array
                itemRecordIndex = results.findIndex(item => item.code === codeOfItem);
                console.log("itemRecordIndex : " + itemRecordIndex);

                // check the typed qty, equal or lower than qtyOnHand
                if( !/^\d{1,10}$/.test($("#quantity").val()) || qtyOfItem > results[itemRecordIndex].qty || !qtyOfItem ) {
                    showErrorAlert("Please enter a valid qty..Need to be lower than or equal to qty on hand");
                    return;
                }

                // check the chosen item, include to addedItems[] array and get index
                let existingItem = addedItems.findIndex(item => item.code === codeOfItem);
                console.log("index of existingItem: " + existingItem);

                if(existingItem < 0) {  // if addedItems[] array is empty, add a new object to array.

                    // create an object - Object Literal
                    let addedItem = {
                        code: codeOfItem,
                        name: nameOfItem,
                        price: priceOfItem,
                        qty: qtyOfItem,
                        total: itemTotal
                    }

                    // push to the array
                    addedItems.push(addedItem);

                } else if (existingItem >= 0) {    // if addedItems[] array is not empty, want to update qty.
                    addedItems[existingItem].qty += qtyOfItem;
                }

                // load the add-to-cart table
                loadAddToCartTable();

                tempItems.push(results[itemRecordIndex]);     // push the chosen item to the temporary array called tempItems[]
                console.log("temp item" + tempItems);
                tempItems[itemRecordIndex].qty -= qtyOfItem;    // update the qtyOnHand of that chosen item in the items[] array
                console.log(tempItems[itemRecordIndex].qty);
                $("#itemQtyOnH").val(tempItems[itemRecordIndex].qty);   // update the qtyOnHand input of that chosen item in Select Item form

                sum += itemTotal;   // update the total when add new items

                $("#total").val(`Rs: ${sum}`);

            },
            error : function (error) {
                console.log(error)
            }
        })

    } else {
        showErrorAlert("Please select an item / items to add to cart!");
    }


});
// -------------------------- The end - when click add to cart button --------------------------




// -------------------------- The start - when input discount, auto generated sub total --------------------------
$("#discount").on('input', function () {

    // get total value and slice it 4 characters -> Extract the Sub Total value
    let subTotal = Number.parseFloat($("#total").val().slice(4));

    // get the discount input value (default to 0 if not a valid number)
    let discount = Number.parseFloat($("#discount").val()) || 0;

    // calculate the discounted total
    let discountedTotal = subTotal - ( subTotal * discount / 100 );

    // update the Sub Total with the discounted value
    $("#subTotal").val(`Rs: ${discountedTotal.toFixed(2)}`);

});
// -------------------------- The end - when input discount, auto generated sub total --------------------------




// -------------------------- The start - when type cash, auto generated balance --------------------------
$("#cash").on('input', function () {

    // get cash value
    let cashValue = Number.parseFloat($("#cash").val());

    // get the discount input value (default to 0 if not a valid number)
    let discount = Number.parseFloat($("#discount").val()) || 0;

    // get sub total value and slice it 4 characters -> Extract the Sub Total value
    let subTotal = Number.parseFloat($("#subTotal").val().slice(4));

    // get total value and slice it 4 characters -> Extract the Sub Total value
    let total = Number.parseFloat($("#total").val().slice(4));


    if( discount > 0) {

        // calculate the balance
        let balance = (cashValue - subTotal) ;

        // update the balance input
        $("#balance").val(balance.toFixed(2));

    } else {

        // calculate the balance
        let balance = (cashValue - total) ;

        // update the balance input
        $("#balance").val(balance.toFixed(2));

    }


});
// -------------------------- The end - when type cash, auto generated balance --------------------------




// -------------------------- The start - save order when click purchase button of order page --------------------------
$("#purchaseBtn").on('click', function () {

    sum = 0;

    var orderId = $("#orderId").val();
    var orderDate = $("#orderDate").val();
    var customerId = $("#cusId").val();

    var orderTotal = Number.parseFloat($("#total").val().slice(4));
    var orderDiscount = Number.parseFloat($("#discount").val());
    var orderSubTotal = Number.parseFloat($("#subTotal").val().slice(4));
    var cash = Number.parseFloat($("#cash").val());

    var chosenItems = addedItems;

    let orderValidated = checkOrderValidation(customerId, chosenItems, orderTotal, orderDiscount, orderSubTotal, cash);

    if (orderValidated) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6da959',
            cancelButtonColor: '#dcba65',
            background: '#fff1e0',
            width: '35em',
            confirmButtonText: 'Yes, Place Order!'
        }).then((result) => {
            if (result.isConfirmed) {

                // Create an order object - Object Literal
                let order = {
                    orderId: orderId,
                    orderDate: orderDate,
                    customerId: customerId,
                    orderedItems: chosenItems
                };

                // For testing
                console.log("JS Object : " + order);

                // Create JSON
                const jsonOrder = JSON.stringify(order);
                console.log("JSON Object : " + jsonOrder);

                // Store items temporarily
                lastOrderItems = [...chosenItems]; // Save a copy of chosenItems

                var quantity;

                //// Place the order
                $.ajax({
                    url: "http://localhost:8086/thogakadePOSBackend/api/v1/orders",
                    type: "POST",
                    data: jsonOrder,
                    headers: { "Content-Type": "application/json" },
                    success: function (results) {

                        //// Want to insert order details to the OrderDetails table

                        chosenItems.map(item => {

                            // create an orderDetail object - Object Literal
                            let orderDetail = {
                                totalPrice: orderTotal,
                                discount: orderDiscount,
                                subTotal: orderSubTotal,
                                orderId: orderId,
                                itemCode: item.code
                            };

                            // For testing
                            console.log("JS Object : " + orderDetail);

                            // Create JSON
                            const jsonOrderDetail = JSON.stringify(orderDetail);
                            console.log("JSON Object : " + jsonOrderDetail);

                            $.ajax({
                                url: "http://localhost:8086/thogakadePOSBackend/api/v1/orderDetails",
                                type: "POST",
                                data: jsonOrderDetail,
                                headers: {"Content-Type": "application/json"},

                                success: function (results) {

                                    console.log("order details saved...");

                                    // load the table
                                    //loadOrderHistoryTable();

                                },

                                error: function (error) {
                                    console.log(error)
                                    showErrorAlert('order details not saved...')
                                }
                            });

                        })



                        //// Update item quantities on the server after successfully placing the order
                        let updatePromises = chosenItems.map(item => {

                            $.ajax({
                                url : "http://localhost:8086/thogakadePOSBackend/api/v1/items",   // request eka yanna one thana
                                type: "GET", // request eka mona vageda - type eka
                                success : function (results) {

                                    for (let i = 0; i < results.length; i++) {

                                        if(results[i].code === item.code){
                                            quantity = results[i].qty;
                                        }
                                    }

                                    return $.ajax({
                                        url: "http://localhost:8086/thogakadePOSBackend/api/v1/items/" + item.code,
                                        type: "PUT",
                                        data: JSON.stringify({
                                            code: item.code,
                                            name: item.name,
                                            price: item.price,
                                            qty: quantity - item.qty // update the item quantity
                                        }),
                                        headers: { "Content-Type": "application/json" }
                                    });

                                },
                                error : function (error) {
                                    console.log(error)
                                }
                            })
                        });

                        // Wait for all quantity updates to complete
                        $.when.apply($, updatePromises).done(function () {

                            // After all item updates are successful, proceed with UI updates
                            // Reset the forms
                            $("#order-section form").trigger('reset');

                            // Load combobox values again
                            loadItemComboBoxValues("#itemsIdComboBox");
                            loadCustomerComboBoxValues("#customersIdComboBox");

                            // Load the item table
                            loadItemTable();

                            // Empty the addedItems[] array because the order has been placed
                            addedItems = [];

                            // Remove all items from the cart
                            loadAddToCartTable();

                            // Fill current date
                            autoFillCurrentDate();

                            // Generate next order ID
                            autoGenerateOrderId(orderId);

                            // Show order confirmation
                            Swal.fire({
                                icon: 'success',
                                title: orderDiscount ? `Rs: ${orderSubTotal}` : `Rs: ${orderTotal}`,
                                text: 'The Order has been placed!',
                                background: '#fff1e0',
                                width: '35em',
                                confirmButtonColor: '#eac237',
                                iconColor: '#4dc94d'
                            });

                            // Finally, reset total inputs
                            $("#subTotal").val("Rs:000.00");
                            $("#total").val("Rs:000.00");

                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            console.log("Error updating item quantities: ", textStatus, errorThrown);
                            showErrorAlert('Failed to update item quantities.');
                        });

                        /*// Show order confirmation
                        Swal.fire({
                            icon: 'success',
                            title: orderDiscount ? `Rs: ${orderSubTotal}` : `Rs: ${orderTotal}`,
                            text: 'The Order has been placed!',
                            background: '#fff1e0',
                            width: '35em',
                            confirmButtonColor: '#eac237',
                            iconColor: '#4dc94d'
                        });*/

                    },
                    error: function (error) {
                        console.log(error);
                        showErrorAlert('Order not placed...');
                    }
                });
            }
        });
    }
});
// -------------------------- The end - save order when click purchase button of order page --------------------------




//-------------------------- The start - check validations when place order --------------------------
function checkOrderValidation(customer, chosenItems, total, discount, subTotal, cash) {

    if(!customer){
        showErrorAlert("Please select a customer to place order!");
        return false;
    }

    if(chosenItems.length === 0){
        showErrorAlert("Please select and add to cart an item / items to place order!");
        return false;
    }

    if(!cash){
        showErrorAlert("Please enter the cash amount!");
        return false;
    }

    if(!discount  || discount === 0 ){
        if((cash - total) < 0){
            showErrorAlert("The cash is not enough to pay the order!!!");
            return false;
        }
        return true;
    } else {
        if((cash - subTotal) < 0){
            showErrorAlert("The cash is not enough to pay the order!!!");
            return false;
        }

        return true;
    }

}
//-------------------------- The end - check validations when place order --------------------------




// before applying MVC , can use this code ... But after applying MVC , can't use inline onclick function
// <td> <button type="button" class="btn btn-danger" onclick='removeItem("${item.code}", Number.parseInt(${item.qty}), Number.parseFloat(${item.price}))'>Remove</button> </td>
