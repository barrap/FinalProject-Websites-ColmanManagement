$(() => {
    $(".dropbtn").click(showDropDown)
    $("#showpass").click(showPass)
    $("#submitBtn").click(validateBeforeSubmit);

    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    function showDropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function showPass(event) {
        var password = document.getElementById("password")
        var password_conf = document.getElementById("password_conf")

        // Checks if the type of the input for password is password
        if (password.type === "password") {

            // Changes the type to text (in order to display it)
            password.type = "text"
            password_conf.type = "text"
        }
        else {

            // Changes the type to password (in order to hide it)
            password.type = "password"
            password_conf.type = "password"
        }
    }

    function validateBeforeSubmit() {

        // Check the validity of the password
        var password = $("#password").val()
        var password_conf = $("#password_conf").val()
        var password_message = document.getElementById("password_message")
        password_counter = 0

        // Makes sure the password is longer than 10 charecters
        if (password.length < 10) {
            password_message.innerHTML = "Password must be longer than 10 chars, your password is " + password.length + " chars long<br>"
            document.getElementById("password").style.borderColor = "red";
            password_valid = false
            password_counter++
        }

        // Makes sure the passwords match
        if (password != password_conf) {
            password_message.innerHTML = "passwords don't match<br>"
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password_conf").style.borderColor = "red";
            password_valid = false
            password_counter++
        }
        if (password_counter == 0 || password.length == 0) {
            password_message.innerHTML = ""
            document.getElementById("password").style.borderColor = "green";
            document.getElementById("password_conf").style.borderColor = "green";
            password_valid = true
        }

        // Checks the validity of the phone number
        var phone_num = $("#phone").val()
        phone_counter = 0;
        var phone_message = document.getElementById("phone_message")

        // Makes sure the phone number is exectly 10 digits long
        if (phone_num.length != 10) {
            phone_message.innerHTML = "Phone number length must be 10 digits exectly<br>"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
            phone_counter++;
        }

        // Makes sure the phone number start with 0 (for israeli numbers)
        if (phone_num[0] != 0) {
            phone_message.innerHTML += "Phone number must start with 0<br>"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
            phone_counter++;
        }

        // Makes sure the phone number is composed only from numbers
        if (isNaN(phone_num)) {
            phone_message.innerHTML += "Only numbers are allowed<br>"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
            phone_counter++
        }
        if (phone_counter == 0 || phone_num.length == 0) {
            phone_message.innerHTML = ""
            document.getElementById("phone").style.borderColor = "green";
            phone_valid = true
        }

        // Checks that all input is valid
        if (phone_valid && password_valid) {
            return true
        }
        else {
            return false
        }
    }

})