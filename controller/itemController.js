// import array
import {items} from "../db/db.js";

// import class
import {ItemModel} from "../model/itemModel.js";

// import method
import {showErrorAlert} from "./customerController.js";


var itemRecordIndex;



// -------------------------- The start - item table loading --------------------------
export function loadItemTable() {

    $("#item-tbl-tbody").empty();

    items.map((item, index) => {

        // want to wrap => use ` mark

        let record = `<tr>
            <td class="item-code-value">${item.code}</td>    <!-- <td> = table data -->
            <td class="item-name-value">${item.name}</td>
            <td class="item-price-value"> Rs: ${item.price}</td>
            <td class="item-qty-value">${item.qty}</td>
        </tr>`;

        $("#item-tbl-tbody").append(record);
        $("#item-tbl-tbody").css("font-weight", 600);

    });
}
// -------------------------- The end - item table loading --------------------------




// ---------------- The start - when first time order page is loaded, want to generate item id  ----------------
autoGenerateItemId();
// --------------- The end - when first time order page is loaded, want to generate item id  ----------------




// -------------------------- The start - auto generate item id --------------------------
function autoGenerateItemId() {

    var itemLength = items.length;

    if(itemLength !== 0 ) {

        var currentItemCode = items[items.length-1].code;
        var split = [];
        split = currentItemCode.split("I0");
        var id = parseInt(split[1]);
        id++;
        if(id < 10) {
            $("#codeItem").val("I00" + id);
        }else{
            $("#codeItem").val("I0" + id);
        }

    } else {
        $("#codeItem").val("I001");
    }

}
// -------------------------- The end - auto generate item id --------------------------




// -------------------------- The start - when click item save button --------------------------
$("#item-save").on('click', () => {

    // get values from inputs
    var codeOfItem = $("#codeItem").val();      // item code value
    var nameOfItem = $("#nameItem").val();      // item name value
    var priceOfItem = $("#priceItem").val();        // item price value
    var qtyOfItem = $("#qtyItem").val();        // item qty value

    // check whether print those values
    console.log("code: " , codeOfItem);
    console.log("name: " , nameOfItem);
    console.log("price: " , priceOfItem);
    console.log("qty: " , qtyOfItem);


    let itemValidated = checkItemValidation(codeOfItem,nameOfItem,priceOfItem,qtyOfItem);


    if(itemValidated) {

        // Check for duplicate item Codes
        if (isDuplicateItemCode(codeOfItem)) {

            // Show error message for duplicate item code
            showErrorAlert("Item code already exists. Please enter a different ID.");

        } else {

            // create an object - Object Literal
            /*let item = {
                code: codeOfItem,
                name: nameOfItem,
                price: priceOfItem,
                qty: qtyOfItem
            }*/


            // create an object - Class Syntax
            let item = new ItemModel(codeOfItem,nameOfItem,priceOfItem,qtyOfItem);


            // push to the array
            items.push(item);

            // load the table
            loadItemTable();

            // clean the inputs values
            $("#codeItem").val("");
            $("#nameItem").val("");
            $("#priceItem").val("");
            $("#qtyItem").val("");

            // generate next item id
            autoGenerateItemId();

            // show item saved pop up
            Swal.fire({
                icon: 'success',
                title: 'Item saved successfully!',
                showConfirmButton: false,
                timer: 1500,
                iconColor: '#4dc94d'
            });

            // update the home page's item card
            $("#item-count").html(items.length);

        }

    }

});
// -------------------------- The end - when click item save button --------------------------




// -------------------------- The start - function to check for duplicate item codes --------------------------
function isDuplicateItemCode(code) {
    return items.some(item => item.code === code);
}
// -------------------------- The end - function to check for duplicate item codes --------------------------




// -------------------------- The start - when click item update button --------------------------
$("#item-update").on('click', () => {

    // get values from inputs
    var codeOfItem = $("#codeItem").val();      // item code value
    var nameOfItem = $("#nameItem").val();      // item name value
    var priceOfItem = $("#priceItem").val();        // item price value
    var qtyOfItem = $("#qtyItem").val();        // item qty value


    if (items.length !== 0) {

        items.map((item) => {

            if (item.code === codeOfItem) {

                // get current item object relevant to clicked row, using itemRecordIndex
                let itemObj = items[itemRecordIndex];


                let itemValidated = checkItemValidation(codeOfItem,nameOfItem,priceOfItem,qtyOfItem);


                if(itemValidated) {

                    // assign new values to relevant item object's values
                    itemObj.code = codeOfItem;
                    itemObj.name = nameOfItem;
                    itemObj.price = priceOfItem;
                    itemObj.qty = qtyOfItem;

                    // load the table
                    loadItemTable();

                    // clean the inputs values
                    $("#codeItem").val("");
                    $("#nameItem").val("");
                    $("#priceItem").val("");
                    $("#qtyItem").val("");

                    // generate next item id
                    autoGenerateItemId();

                    // show item updated pop up
                    Swal.fire({
                        icon: 'success',
                        title: 'Item updated successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#4dc94d'
                    });

                }

            } else {
                showErrorAlert("This item is not added yet !")
            }

        });

    } else {
        showErrorAlert("First you need to add items ! Then you can update...");
    }


    // ********** special **********
    // the clicked table's row index must equal to the customer object's index of array

});
// -------------------------- The end - when click item update button --------------------------




// -------------------------- The start - when click item delete button --------------------------
$("#item-delete").on('click', () => {


    var itemCode = $("#codeItem").val();

    if (items.length !== 0) {

        items.map((item) => {

            if (item.code === itemCode) {

                Swal.fire({

                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#6da959',
                    cancelButtonColor: '#dcba65',
                    background: '#fff1e0',
                    width: '35em',
                    confirmButtonText: 'Yes, delete item!'

                }).then((result) => {

                    if (result.isConfirmed) {

                        items.splice(itemRecordIndex, 1);

                        // load the table
                        loadItemTable();

                        // clean the inputs values
                        $("#codeItem").val("");
                        $("#nameItem").val("");
                        $("#priceItem").val("");
                        $("#qtyItem").val("");

                        // generate next item id
                        autoGenerateItemId();

                        // show item deleted pop up
                        Swal.fire({
                            icon: 'success',
                            title: 'Item deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500,
                            iconColor: '#4dc94d'
                        });
                    }
                })

            } else {
                showErrorAlert("This item is not added yet !")
            }
        });

    } else {
        showErrorAlert("First you need to add items ! Then you can delete...");
    }

});
// -------------------------- The end - when click item delete button --------------------------




// -------------------------- The start - when click item clear button --------------------------
$("#item-clear").on('click', () => {

    // clean the inputs values
    $("#nameItem").val("");
    $("#priceItem").val("");
    $("#qtyItem").val("");

});
// -------------------------- The end - when click item clear button --------------------------




//-------------------------- The start - check item validations --------------------------
function checkItemValidation(code, name, price, qty) {

    if(!code){    //check code field is empty or not
        showErrorAlert("Code field is required!")
        return false;
    } else {
        if(!/^I\d{3,10}$/.test(code)){
            showErrorAlert("Please enter a valid Code!  Pattern - 'I000'")
            return false;
        }
    }

    if(!name){ //check name field is empty or not
        showErrorAlert("Name field is required!");
        return false;
    } else {
        if(!/^[A-Za-z\d\s\-']{2,30}$/.test(name)){
            showErrorAlert("Please enter a valid Name!  Pattern - 'Toffee / Lux Soap - 150g'")
            return false;
        }
    }

    if(!price){ //check price field is empty or not
        showErrorAlert("Price field is required!");
        return false;
    } else {
        if(!/^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/.test(price)){
            showErrorAlert("Please enter a valid Price! Pattern - '560 / 560.25'")
            return false;
        }
    }

    if(!qty || qty === "0"){ //check qty field is empty or not
        showErrorAlert("Quantity field is required!");
        return false;
    } else {
        if(!/^\d{1,10}$/.test(qty)){
            showErrorAlert("Please enter a valid Quantity! Pattern - '10'")
            return false;
        }
    }

    return true;

}
//-------------------------- The end - check item validations --------------------------




// -------------------------- The start - when click an item table row --------------------------
$("#item-tbl-tbody").on( 'click', 'tr', function () {

    let index = $(this).index();
    itemRecordIndex = index;    // assign current row index to recordIndex variable

    console.log("index" + index);

    let code = $(this).find(".item-code-value").text();
    let name = $(this).find(".item-name-value").text();
    let price = $(this).find(".item-price-value").text().slice(5);
    let qty = $(this).find(".item-qty-value").text();

    $("#codeItem").val(code);
    $("#nameItem").val(name);
    $("#priceItem").val(price);
    $("#qtyItem").val(qty);

});
// -------------------------- The end - when click an item table row --------------------------




// -------------------------- The start - when click view all item button --------------------------
$("#viewAllItem").on('click', function () {

    $("#all-items-tbl-tbody").empty();

    items.map((item, index) => {

        // want to wrap => use ` mark

        let record = `<tr>
            <td>${item.name}</td>  <!-- <td> = table data -->
        </tr>`;

        $("#all-items-tbl-tbody").append(record);
        $("#all-items-tbl-tbody").css("font-weight", 600);

    });

});
// -------------------------- The end - when click view all item button --------------------------



// -------------------------- The start - when click item search button --------------------------
$("#item-search-btn").on('click', function () {

    var itemDetail = $("#searchItem").val();

    if (items.length !== 0) {

        for (let i=0; i<items.length; i++) {

            if (items[i].code === itemDetail || items[i].name === itemDetail) {

                $("#searchedItemCode").val(items[i].code);
                $("#searchedItemName").val(items[i].name);
                $("#searchedItemPrice").val(items[i].price);
                $("#searchedItemQty").val(items[i].qty);

                $("#itemDetailsModalLabel").html("Item Details");

                return;
            }

        }

        if(itemDetail !== "") {

            showErrorAlert("Can't find item ! Try again...");

            $("#searchedItemCode").val("");
            $("#searchedItemName").val("");
            $("#searchedItemPrice").val("");
            $("#searchedItemQty").val("");

            $("#itemDetailsModalLabel").html("Item Details");

        } else {

            showErrorAlert("Please enter item code or name to search !");

            $("#searchedItemCode").val("");
            $("#searchedItemName").val("");
            $("#searchedItemPrice").val("");
            $("#searchedItemQty").val("");

            $("#itemDetailsModalLabel").html("Item Details");

        }

    } else {

        showErrorAlert("First you need to add items ! Then you can search...");

        $("#searchedItemCode").val("");
        $("#searchedItemName").val("");
        $("#searchedItemPrice").val("");
        $("#searchedItemQty").val("");

        $("#itemDetailsModalLabel").html("Item Details");

    }

});
// -------------------------- The end - when click item search button --------------------------




// -------------------------- The start - clear the item search bar's value --------------------------
$("#item-search-modal-close").on('click', function () {

    $("#searchItem").val("");

});
// -------------------------- The end - clear the item search bar's value --------------------------

