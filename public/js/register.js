$(() => {
    $("#submitBtn").click(validateBeforeSubmit);

    function validateBeforeSubmit(event) {

        // Check the validity of the password
        var password = $("#password").val()
        var password_conf = $("#password_conf").val()
        var password_message = document.getElementById("password_message")
        password_counter = 0
        if (password.length < 10) {
            password_message.innerHTML = "Password must be longer than 10 chars, your password is " + password.length + " chars long<br>"
            document.getElementById("password").style.borderColor = "red";
            password_valid = false
            password_counter++
        }
        if (password != password_conf) {
            password_message.innerHTML = "passwords don't match<br>"
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password_conf").style.borderColor = "red";
            password_valid = false
            password_counter++
        }
        console.log(password_counter)
        if (password_counter == 0) {
            password_message.innerHTML = ""
            document.getElementById("password").style.borderColor = "green";
            document.getElementById("password_conf").style.borderColor = "green";
            password_valid = true
        }

        // Checks the validity of the phone number
        var phone_num = $("#phone").val()
        phone_counter = 0;
        var phone_message = document.getElementById("phone_message")
        if (phone_num.length != 10) {
            phone_message.innerHTML = "Phone number length must be 10 digits exectly<br>"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
            phone_counter++;
        }
        if (phone_num[0] != 0) {
            phone_message.innerHTML += "Phone number must start with 0<br>"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
            phone_counter++;
        }
        if (isNaN(phone_num)) {
            phone_message.innerHTML += "Only numbers are allowed<br>"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
            phone_counter++
        }
        if (phone_counter == 0) {
            phone_message.innerHTML = ""
            document.getElementById("phone").style.borderColor = "green";
            phone_valid = true
        }

        // Checks the full name validity
        var fullname = $("#fullname").val()
        var fullname_message = document.getElementById("fullname_message")
        fullname_counter = 0
        if (!(/^[a-zA-z ]+$/.test(fullname))) {
            fullname_message.innerHTML = "Only Letters are allowed<br>";
            document.getElementById("fullname").style.borderColor = "red";
            fullname_valid = false
            fullname_counter++
        }
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

        // Checks the username validity
        var username = $("#username").val()
        var username_message = document.getElementById("username_message")
        var username_counter = 0
        if (username.length == 0) {
            username_message.innerHTML = "Username can not be empty<br>";
            document.getElementById("username").style.borderColor = "red";
            username_valid = false
            username_counter++
        }
        if(username_counter == 0) {
            username_message.innerHTML = ""
            document.getElementById("username").style.borderColor = "green";
            username_valid = true
        }

        // Checks that all input is valid
        if (phone_valid && password_valid && fullname_valid && username_valid) {
            return true
        }
        else {
            return false
        }
    }
})

function showPass(event) {
    var password = document.getElementById("password")
    var password_conf = document.getElementById("password_conf")
    if (password.type === "password") {
        password.type = "text"
        password_conf.type = "text"
    }
    else {
        password.type = "password"
        password_conf.type = "password"
    }
}