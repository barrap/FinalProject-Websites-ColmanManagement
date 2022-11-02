$(() => {

    $("#submitBtn").click(validateBeforeSubmit);
    $("#upload-button").click(uploadFile)

    function validateBeforeSubmit(event) {
        
        // Gets all the values
        var movie_title = $("#title").val()
        var movie_year = $("#year").val()
        var director = $("#director").val()
        var length = $("#length").val()
        var actors = $("#actors").val()
        var genre = $("#genre").val()
        var preview = $("#preview").val()
        var trailer = $("#link").val()
        var cost = $("#cost").val()

        // gets all the input elements
        var movie_title_html = document.getElementById("title")
        var movie_year_html = document.getElementById("year")
        var director_html = document.getElementById("director")
        var length_html = document.getElementById("length")
        var actors_html = document.getElementById("actors")
        var genre_html = document.getElementById("genre")
        var preview_html = document.getElementById("preview")
        var trailer_html = document.getElementById("link")
        var cost_html = document.getElementById("cost")

        // gets all the span elements (for the error messages)
        var title_message = document.getElementById("title_message")
        var year_message = document.getElementById("year_message")
        var director_message = document.getElementById("director_message")
        var length_message = document.getElementById("length_message")
        var actors_message = document.getElementById("actors_message")
        var genre_message = document.getElementById("genre_message")
        var preview_message = document.getElementById("preview_message")
        var trailer_message = document.getElementById("link_message")
        var cost_message = document.getElementById("cost_message")

        // boolean variable declaration
        var movie_title_bool = false
        var year_bool = false
        var director_bool = false
        var length_bool = false
        var actors_bool = false
        var genre_bool = false
        var preview_bool = false
        var trailer_bool = false
        var cost_bool = false


        // Checks if a title was provided
        if (movie_title == "") {
            movie_title_html.style.borderColor = "red"
            title_message.innerHTML = "Movie title can't be empty"
            movie_title_bool = false
        }
        else {
            movie_title_html.style.borderColor = "green"
            title_message.innerHTML = ""
            movie_title_bool = true
        }

        // // Checks if a year was provided
        if (movie_year == "") {
            movie_year_html.style.borderColor = "red"
            year_message.innerHTML = "Movie year can't be empty"
            year_bool = false
        }
        else {
            movie_year_html.style.borderColor = "green"
            year_message.innerHTML = ""
            year_bool = true
        }

        // Checks if a director was provided
        if (director == "") {
            director_html.style.borderColor = "red"
            director_message.innerHTML = "Director can't be empty"
            director_bool = false
        }
        else {
            director_html.style.borderColor = "green"
            director_message.innerHTML = ""
            director_bool = true
        }

        // Checks if a movie length was provided
        if (length == "") {
            length_html.style.borderColor = "red"
            length_message.innerHTML = "Movie length can't be empty"
            length_bool = false
        }
        else {
            length_html.style.borderColor = "green"
            length_message.innerHTML = ""
            length_bool = true
        }

        // // Checks if actors were provided
        if (actors == "") {
            actors_html.style.borderColor = "red"
            actors_message.innerHTML = "You must enter at least one main actor"
            actors_bool = false
        }
        else {
            actors_html.style.borderColor = "green"
            actors_message.innerHTML = ""
            actors_bool = true
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
            trailer_message.innerHTML = "You must enter a trailer for the movie"
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
            cost_message.innerHTML = "You must enter a cost for the movie"
            cost_bool = false
        }
        else {
            cost_html.style.borderColor = "green"
            cost_message.innerHTML = ""
            cost_bool = true
        }


        // Checks if all the condition are met
        if (movie_title_bool & year_bool & director_bool & length_bool & actors_bool & genre_bool & preview_bool & trailer_bool & cost_bool) {
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