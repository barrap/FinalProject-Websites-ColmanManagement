$(() => {

    $("#submitBtn").click(validateBeforeSubmit);
    $("#upload-button").click(uploadFile)

    function validateBeforeSubmit(event) {
        
        // Gets all the values
        var show_title = $("#title").val()
        var show_year = $("#year").val()
        var episodes = $("#episodes").val()
        var genre = $("#genre").val()
        var preview = $("#preview").val()
        var trailer = $("#link").val()
        var cost = $("#cost").val()

        // gets all the input elements
        var show_title_html = document.getElementById("title")
        var show_year_html = document.getElementById("year")
        var episodes_html = document.getElementById("episodes")
        var genre_html = document.getElementById("genre")
        var preview_html = document.getElementById("preview")
        var trailer_html = document.getElementById("link")
        var cost_html = document.getElementById("cost")

        // gets all the span elements (for the error messages)
        var title_message = document.getElementById("title_message")
        var year_message = document.getElementById("year_message")
        var episodes_message = document.getElementById("episodes_message")
        var genre_message = document.getElementById("genre_message")
        var preview_message = document.getElementById("preview_message")
        var trailer_message = document.getElementById("link_message")
        var cost_message = document.getElementById("cost_message")

        // boolean variable declaration
        var show_title_bool = false
        var year_bool = false
        var episodes_bool = false
        var actors_bool = false
        var genre_bool = false
        var preview_bool = false
        var trailer_bool = false
        var cost_bool = false


        // Checks if a title was provided
        if (show_title == "") {
            show_title_html.style.borderColor = "red"
            title_message.innerHTML = "Show title can't be empty"
            show_title_bool = false
        }
        else {
            show_title_html.style.borderColor = "green"
            title_message.innerHTML = ""
            show_title_bool = true
        }

        // // Checks if a year was provided
        if (show_year == "") {
            show_year_html.style.borderColor = "red"
            year_message.innerHTML = "Show year can't be empty"
            year_bool = false
        }
        else {
            show_year_html.style.borderColor = "green"
            year_message.innerHTML = ""
            year_bool = true
        }

        

        // Checks if a number of episodes was provided
        if (episodes == "") {
            episodes_html.style.borderColor = "red"
            episodes_message.innerHTML = "Number of episodes can't be empty"
            episodes_bool = false
        }
        else {
            episodes_html.style.borderColor = "green"
            episodes_message.innerHTML = ""
            episodes_bool = true
        }


        // Checks if genres were provided
        if (genre == "") {
            genre_html.style.borderColor = "red"
            genre_message.innerHTML = "You must enter at least one genre"
            genre_bool = false
        }
        else {
            genre_html.style.borderColor = "green"
            genre_message.innerHTML = ""
            genre_bool = true
        }

        // Checks if a preview was provided
        if (preview == "") {
            preview_html.style.borderColor = "red"
            preview_message.innerHTML = "You must enter the movie synopsis"
            preview_bool = false
        }
        else {
            preview_html.style.borderColor = "green"
            preview_message.innerHTML = ""
            preview_bool = true
        }

        // Checks if a trailer link was provided
        if (trailer == "") {
            trailer_html.style.borderColor = "red"
            trailer_message.innerHTML = "You must enter a trailer for the show"
            trailer_bool = false
        }

        // Check if the trailer link is valid
        else if (!(/https?:\/\/www.youtube.com\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(trailer))) {
            trailer_html.style.borderColor = "red"
            trailer_message.innerHTML = "The trailer must be from youtube"
            trailer_bool = false
        }
        else {
            trailer_html.style.borderColor = "green"
            trailer_message.innerHTML = ""
            trailer_bool = true
        }

        // Checks if a cost was provided
        if (cost == "") {
            cost_html.style.borderColor = "red"
            cost_message.innerHTML = "You must enter a cost for the show"
            cost_bool = false
        }
        else {
            cost_html.style.borderColor = "green"
            cost_message.innerHTML = ""
            cost_bool = true
        }


        // Checks if all the condition are met
        if (show_title_bool & year_bool & episodes_bool & genre_bool & preview_bool & trailer_bool & cost_bool) {
            return true
        }
        else {
            return false
        }
    }

    // Function to upload the file
    async function uploadFile() {
        var file = document.getElementById('fileupload').files[0]; //Files[0] = 1st file
        var reader = new FileReader();
        var data = reader.readAsText(file, 'UTF-8');
        let datar= new FormData();      
        datar.append("file", data);
        await fetch('/upload', {
            method: "POST", 
            body: datar
          });     
    }


})