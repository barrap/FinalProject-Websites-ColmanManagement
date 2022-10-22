$(() => {
    $("#submitBtn").click(validateBeforeSubmit);

    function validateBeforeSubmit(event) {

        // Check the validity of the password
        var password = $("#password").val()
        var password_conf = $("#password_conf").val()
        var password_message = document.getElementById("password_message")
        if( password.length < 10 ) {
            password_message.innerHTML = "Password must be longer than 10 chars, your password is " + password.length + " chars long"
            document.getElementById("password").style.borderColor = "red";
            password_valid = false
        }
        else if (password != password_conf) {
            password_message.innerHTML = "passwords don't match"
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password_conf").style.borderColor = "red";
            password_valid = false
        }
        else {
            document.getElementById("password").style.borderColor = "green";
            document.getElementById("password_conf").style.borderColor = "green";
            password_valid = true
        }

        // Checks the validity of the phone number
        var phone_num = $("#phone").val()
        var phone_message = document.getElementById("phone_message")
        if(phone_num.length != 10) {
            phone_message.innerHTML = "Phone number length must be 10 digits exectly"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
        }
        else if (phone_num[0] != 0) {
            phone_message.innerHTML = "Phone number must start with 0"
            document.getElementById("phone").style.borderColor = "red";
            phone_valid = false
        }
        else {
            document.getElementById("phone").style.borderColor = "green";
            phone_valid = true
        }

        // Checks the full name validity
        var fullname = $("#fullname").val()
        if(!isNaN(fullname)) {
            document.getElementById("fullname_message").innerHTML = "Only characters are allowed"
        }

        // Checks that all input is valid
        if(phone_valid && password_valid) {
            return true
        }
        else {
            return false
        }
    }
})

function showPass(event) {
    var password =  document.getElementById("password")
    var password_conf = document.getElementById("password_conf")
    if(password.type === "password") {
        password.type = "text"
        password_conf.type = "text"
    }
    else {
        password.type = "password"
        password_conf.type = "password"
    }
}