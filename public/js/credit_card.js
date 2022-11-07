$(() => {
    const CreditCardService = require('../services/creditCard');

    $("#submitBtn").click(validateBeforeSubmit);
    var flag = false
    function getChoice(value)
    {
        flag = true
    }
    function validateBeforeSubmit(event) {

        // Checks the validity of the ID number
        var id_num = $("#id").val()
        id_counter = 0;
        var id_message = document.getElementById("id_message")

        // Makes sure the id number is exectly 9 digits long
        if (id_num.length != 9) {
            id_message.innerHTML = "id number length must be 9 digits exectly<br>"
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

        // Makes sure the card number is between 8 to 19 digits long
        if (card_num.length < 8 | card_num.length > 19) {
            cardNumber_message.innerHTML = "card number length is invalid<br>"
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

        // Makes sure the secNum number is exactly 3 digits long
        if (secNum.length != 3) {
            secNum_message.innerHTML = "security number length is invalid<br>"
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

        // Makes sure the name is composed from the right characters
        if (!(/^[a-zA-z ]+$/.test(fullname))) {
            fullname_message.innerHTML = "Only Letters are allowed<br>";
            document.getElementById("fullname").style.borderColor = "red";
            fullname_valid = false
            fullname_counter++
        }

        // Makes sure a full name was provided
        if (fullname.length == 0) {
            fullname_message.innerHTML = "Full name can not be empty<br>";
            document.getElementById("fullname").style.borderColor = "red";
            fullname_valid = false
            fullname_counter++
        }
        if (fullname_counter == 0) {
            fullname_message.innerHTM = ""
            document.getElementById("fullname").style.borderColor = "green";
            fullname_valid = true
        }


        // Checks that all input is valid
        if ((phone_valid && password_valid && fullname_valid && username_valid) | flag == true) {
            // Defining the credit card details as the chosen one
            const card = CreditCardService.getCardByNumber(value)
            document.getElementById("cardNumber").value = card._id
            document.getElementById("fullname").value = card._username
            document.getElementById("id").value = "1234567890"
            document.getElementById("date").value = card._exp_date
            document.getElementById("secNum").value = card._digits
            return true
        }
        else {
            return false
        }
    }


    

})

