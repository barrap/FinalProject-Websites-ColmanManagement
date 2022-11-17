$(() => {

    $(".dropbtn").click(showDropDown)
    $("#submitBtn").click(validateBeforeSubmit);


    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    function showDropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {

            // Gets all the elements of the dropdown list
            var dropdowns = document.getElementsByClassName("dropdown-content");

            // Run on all the dropdown contents
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];

                // Checkf if the dropdown is show (if so, hides it)
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
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

        // Checks the validity of the expiration date
        var card_date = $("#date").val()
        var card_year = Number(card_date.split("-")[0])
        var card_month = Number(card_date.split("-")[1])
        var current_date = new Date()
        var current_year = current_date.getFullYear()
        var current_month = current_date.getMonth() + 1
        var card_date_valid = false
        var card_date_message = document.getElementById("date_message")

        // Checks that the card year not smaller then the current year
        if (card_year < current_year) {
            card_date_message.innerHTML = "The Card has expired"
            document.getElementById("date").style.borderColor = "red";
            card_date_valid = false
        }
        else if (card_month < current_month) {
            card_date_message.innerHTML = "The Card has expired"
            document.getElementById("date").style.borderColor = "red";
            card_date_valid = false
        }
        else {
            card_date_message.innerHTML = ""
            document.getElementById("date").style.borderColor = "green";
            card_date_valid = true
        }


        // Checks the validity of the card number
        var card_num = $("#cardNumber").val()
        card_counter = 0;
        var cardNumber_message = document.getElementById("cardNumber_message")


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
        if (id_valid && card_valid && secNum_valid && card_date_valid) {
            return true
        }
        else {
            return false
        }
    }




})

