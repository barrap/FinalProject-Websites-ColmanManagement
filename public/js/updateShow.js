$(() => {

    $("#saveChangesBtn").click(validateUpdateBeforeSubmit);

    function validateUpdateBeforeSubmit(event) {
        
        // Gets all the values
        var trailer = $("#link").val()

        // gets all the input elements
        var trailer_html = document.getElementById("link")

        // gets all the span elements (for the error messages)
        var trailer_message = document.getElementById("link_message")

        // boolean variable declaration
        var trailer_bool = false

        // Checks if a trailer link was provided
        if (trailer == "") {
            trailer_html.style.borderColor = "green"
            trailer_message.innerHTML = ""
            return true
        }

        // Check if the trailer link is valid
        else if (!(/https?:\/\/www.youtube.com\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(trailer))) {
            trailer_html.style.borderColor = "red"
            trailer_message.innerHTML = "The trailer must be from youtube"
            return false
        }

        else {
            trailer_html.style.borderColor = "green"
            trailer_message.innerHTML = ""
            return true
        }
    }


})