$(() => {

    $("#show_pass").click(showPass)

    function showPass() {
        var password = document.getElementById("password")

        // Checks if the type of the input for password is password
        if (password.type === "password") {

            // Changes the type to text (in order to display it)
            password.type = "text"
        }
        else {

            // Changes the type to password (in order to hide it)
            password.type = "password"
        }
    }
    
});