
import {loadItemTable} from "./itemController.js";
import {lastOrderItems, autoGenerateOrderId} from "./orderController.js";

var orderRecordIndex;




// -------------------------- The start - order history table loading --------------------------
export function loadOrderHistoryTable(lastOrderItems) {

    console.log(lastOrderItems)
    console.log(lastOrderItems.length);

    $("#order-history-tbl-tbody").empty();

    $.ajax({
        url : "http://localhost:8085/order",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success : function (results) {

            results.map((order, index) => {

                let record = `<tr>
                    <td> ${order.orderId} </td>
                    <td> ${order.orderDate} </td>
                    <td> ${order.customerId} </td>
                    <td class="items-of-order" style="display: none;">${JSON.stringify(lastOrderItems)}</td>
                    <td> <i class="bi bi-eye-fill ml-3"></i> ${lastOrderItems.length} </td>
                    <td> Rs: ${order.totalPrice} </td>
                    <td> ${order.discount} % </td>
                    <td> Rs: ${order.subTotal} </td>
                    <td> <button type="button" class="btn btn-danger order-cancel-button">Cancel</button> </td>
                </tr>`;

                $("#order-history-tbl-tbody").append(record);
                $("#order-history-tbl-tbody").css("font-weight", 600);
                $(".order-cancel-button").css("font-weight", 600);
            });

        },
        error : function (error) {
            console.log(error)
        }
    })
}

// -------------------------- The end - order history table loading --------------------------




// -------------------------- The start - when click remove button want to call cancelOrder() function --------------------------
$("#table-order-history").on('click', function (event) {
    if (event.target.classList.contains('order-cancel-button')) {
        const row = event.target.closest('tr');
        const orderId = row.querySelector('td:nth-child(1)').textContent.trim();
        let orderedItems = [];
        orderedItems = JSON.parse(row.querySelector('.items-of-order').textContent.trim());

        // Call the function
        //cancelOrder(orderId, orderedItems);
    }
});
// -------------------------- The end - when click remove button want to call cancelOrder() function --------------------------




// -------------------------- The start - when click remove button of order history table --------------------------
function cancelOrder(orderId, orderedItems) {

    console.log(orderId);
    console.log(orderedItems);

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6da959',
        cancelButtonColor: '#dcba65',
        background: '#fff1e0',
        width: '35em',
        confirmButtonText: 'Yes, Cancel the order!'

    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url : "http://localhost:8085/order",   // request eka yanna one thana
                type: "GET", // request eka mona vageda - type eka
                success : function (results) {

                    // Remove the canceled order from the 'orders' array
                    let orderIndex = results.findIndex(item => item.idOfOrder === orderId);
                    results.splice(orderIndex,1);

                    return $.ajax({
                        url: "http://localhost:8085/item",
                        type: "GET",
                        success : function (items) {

                            // Iterate through the ordered items to update the 'items' array
                            orderedItems.forEach(orderedItem => {

                                let itemIndex = items.findIndex(item => item.code === orderedItem._code);
                                console.log("itemIndex" + itemIndex);

                                // Check if the item exists in the 'items' array
                                if (itemIndex !== -1) {

                                    // Increment the quantity of the item in the 'items' array
                                    items[itemIndex].qty += orderedItem._qty;

                                }
                            });

                            // Load the order history table
                            loadOrderHistoryTable();

                            // Load the item table
                            loadItemTable();

                            if(results.length === 0){
                                autoGenerateOrderId("");
                            } else {
                                let lastOrderId = results[results.length - 1].idOfOrder;
                                autoGenerateOrderId(lastOrderId);
                            }

                        },
                        error : function (error) {
                            console.log(error)
                        }

                    });
                },
                error : function (error) {
                    console.log(error)
                }
            })

        }

    });
}
// -------------------------- The start - when click remove button of order history table --------------------------




// -------------------------- The start - when click view order history button --------------------------
$("#viewBtn").on('click', function () {
    loadOrderHistoryTable(lastOrderItems);
});
// -------------------------- The end - when click view order history button --------------------------




// -------------------------- The start - when click a row of order history table --------------------------
/*$("#order-history-tbl-tbody").on('click', 'tr', function () {

    let index = $(this).index();
    orderRecordIndex = index;  // assign current row index to recordIndex variable

    console.log("index: " + index);

    let details = "/  ";

    $.ajax({
        url : "http://localhost:8085/order",   // request eka yanna one thana
        type: "GET", // request eka mona vageda - type eka
        success : function (results) {

            // get items 1 by 1 from an order and show them
            results[orderRecordIndex].itemsOfOrder.map((item) => {
                details += " " + item.code + "  -  " + item.name + "  -  " + item.qty + "  /  ";
            });

            // show the items of an order
            Swal.fire({
                title: 'Item Details',
                text: details,
                background: '#fff1e0',
                width: '35em',
                confirmButtonColor: '#eac237',
                color: '#167216'
            });

        },
        error : function (error) {
            console.log(error)
        }
    })
});*/
// -------------------------- The end - when click a row of order history table --------------------------