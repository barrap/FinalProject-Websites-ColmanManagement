$(() => {

    $("#show_pass").click(showPass)

    function showPass() {
        var password = document.getElementById("password")
        if (password.type === "password") {
            password.type = "text"
        }
        else {
            password.type = "password"
        }
    }
    
});