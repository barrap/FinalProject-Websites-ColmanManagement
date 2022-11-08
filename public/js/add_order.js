$(() => {

    $("#submitBtn").click(validateBeforeSubmit);
    $("#submitOpt").click(validateBeforeSubmitChoice);
    const cart = []
    function validateBeforeSubmitChoice(event)
    {
        shop_cart = sessionStorage.getItem("shoppingCart")
        var $input = $('<input>').attr(
            {
                type: 'hidden',
                id: 'cart',
                name: 'cart',
                value: shop_cart
            }).appendTo('#poll_form');
    
        sessionStorage.setItem("shoppingCart", JSON.stringify(cart))
    }

    function validateBeforeSubmit(event) {

        // Checks the validity of the ID number
        var id_num = $("#id").val()
        id_counter = 0;
        var id_message = document.getElementById("id_message")

        // Checks that an ID number was provided
        if (id == "") {
            id_message.innerHTML = "id number must be provided<br>"
            document.getElementById("id").style.borderColor = "red";
            id_valid = false
            id_counter++;
        }

        // Makes sure the id number is exectly 9 digits long
        if (id_num.length != 9) {
            id_message.innerHTML += "id number length must be 9 digits exectly<br>"
            document.getElementById("id").style.borderColor = "red";
            id_valid = false
            id_counter++;
        }

        // Makes sure the id number is composed only from numbers
        if (isNaN(id_num)) {
            id_message.innerHTML += "Only numbers are allowed<br>"
            document.getElementById("id").style.borderColor = "red";
            id_valid = false
            id_counter++
        }
        if (id_counter == 0) {
            id_message.innerHTML = ""
            document.getElementById("id").style.borderColor = "green";
            id_valid = true
        }

        // Checks the validity of the card number
        var card_num = $("#cardNumber").val()
        card_counter = 0;
        var cardNumber_message = document.getElementById("cardNumber")


        // Checks that a credit card number was provided
        if (card_num == "") {
            cardNumber_message.innerHTML = "card number must be provided<br>"
            document.getElementById("cardNumber").style.borderColor = "red";
            card_valid = false
            card_counter++;
        }

        // Makes sure the card number is between 8 to 19 digits long
        if (card_num.length < 8 | card_num.length > 19) {
            cardNumber_message.innerHTML += "card number length is invalid<br>"
            document.getElementById("cardNumber").style.borderColor = "red";
            card_valid = false
            card_counter++;
        }

        // Makes sure the card number is composed only from numbers
        if (isNaN(card_num)) {
            cardNumber_message.innerHTML += "Only numbers are allowed<br>"
            document.getElementById("cardNumber").style.borderColor = "red";
            card_valid = false
            card_counter++
        }
        if (card_counter == 0) {
            cardNumber_message.innerHTML = ""
            document.getElementById("cardNumber").style.borderColor = "green";
            card_valid = true
        }

        // Checks the validity of the security number
        var secNum = $("#secNum").val()
        secNum_counter = 0;
        var secNum_message = document.getElementById("secNum")


        // Checks that a cvv number was provided
        if (secNum == "") {
            secNum_message.innerHTML = "card number must be provided<br>"
            document.getElementById("secNum").style.borderColor = "red";
            card_valid = false
            card_counter++;
        }
        // Makes sure the secNum number is exactly 3 digits long
        if (secNum.length != 3) {
            secNum_message.innerHTML += "security number length is invalid<br>"
            document.getElementById("secNum").style.borderColor = "red";
            secNum_valid = false
            secNum_counter++;
        }

        // Makes sure the secNum number is composed only from numbers
        if (isNaN(secNum)) {
            secNum_message.innerHTML += "Only numbers are allowed<br>"
            document.getElementById("secNum").style.borderColor = "red";
            secNum_valid = false
            secNum_counter++
        }
        if (secNum_counter == 0) {
            secNum_message.innerHTML = ""
            document.getElementById("secNum").style.borderColor = "green";
            secNum_valid = true
        }



        // Checks the full name validity
        var fullname = $("#fullname").val()
        var fullname_message = document.getElementById("fullname_message")
        fullname_counter = 0

        // Checks that all input is valid
        if (id_valid && card_valid && secNum_valid) {
            shop_cart = sessionStorage.getItem("shoppingCart")
            var $input = $('<input>').attr(
            {
                type: 'hidden',
                id: 'cart',
                name: 'cart',
                value: shop_cart
            }).appendTo('#add_form');
            sessionStorage.setItem("shoppingCart", JSON.stringify(cart))
            return true
        }
        else {
            return false
        }
    }

})

