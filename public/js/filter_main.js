$(() => {

    $("#filterbtn").click(function () {
        $.ajax({
            url: "/filter?" + $("#year").val() + "+" + $("#genre").val() + "+" + $("#price").val()
        }).done(function (res) {
            $(".movies_results").html("")
            $(".tvs_results").html("")

            if (res.movies.length == 0 || res.tv.length == 0) {
                $(".footer").css('position', 'fixed')
            }

            // Runs on all the movies
            for (let i = 0; i < res.movies.length; i++) {
                const element = res.movies[i];

                // Gets the template for the results
                let movie_template = $("#show_template_movies").html()

                // Runs on all the data in the element
                for (const key in element) {

                    // Saves the data in the information
                    movie_template = movie_template.replaceAll('{' + key + '}', element[key])
                }
                movie_template = movie_template.replaceAll("{i}", i)

                // Append the new template
                $(".movies_results").append(movie_template)

            }

            // Runs on all the tv shows
            for (let i = 0; i < res.tv.length; i++) {
                const element = res.tv[i];

                // Gets the template for the results
                let tv_template = $("#show_template_tvs").html()

                // Runs on all the data in the element
                for (const key in element) {

                    // Saves the data in the information
                    tv_template = tv_template.replaceAll('{' + key + '}', element[key])
                }
                tv_template = tv_template.replaceAll("{i}", i)

                // Append the new template
                $(".tvs_results").append(tv_template)
            }
        });
    })

    $("#clear").click(function () {
        $.ajax({
            url: "/allData"
        }).done(function (res) {
            $(".movies_results").html("")
            $(".tvs_results").html("")
            $(".footer").css('position', 'relative')

            // Runs on all the movies
            for (let i = 0; i < res.movies.length; i++) {
                const element = res.movies[i];

                // Gets the template for the results
                let movie_template = $("#show_template_movies").html()

                // Runs on all the data in the element
                for (const key in element) {

                    // Saves the data in the information
                    movie_template = movie_template.replaceAll('{' + key + '}', element[key])
                }
                movie_template = movie_template.replaceAll("{i}", i)

                // Append the new template
                $(".movies_results").append(movie_template)

            }

            // Runs on all the tv shows
            for (let i = 0; i < res.tv.length; i++) {
                const element = res.tv[i];

                // Gets the template for the results
                let tv_template = $("#show_template_tvs").html()

                // Runs on all the data in the element
                for (const key in element) {

                    // Saves the data in the information
                    tv_template = tv_template.replaceAll('{' + key + '}', element[key])
                }
                tv_template = tv_template.replaceAll("{i}", i)

                // Append the new template
                $(".tvs_results").append(tv_template)
            }
        })
    })
})

function validateMovieUpdateBeforeSubmitAfterFilter(index) {

    // Gets all the values
    var trailer = $("#movie_link" + index).val()

    // gets all the input elements
    var trailer_html = document.getElementById("movie_link" + index)

    // gets all the span elements (for the error messages)
    var trailer_message = document.getElementById("movie_link_message" + index)

    // boolean variable declaration
    var trailer_bool = false

    // Checks if a trailer link was provided
    if (trailer == "") {
        trailer_html.style.borderColor = "green"
        trailer_message.innerHTML = ""
        $(".UpdateMovieAfterFilterForm" + index).submit()
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
        $(".UpdateMovieAfterFilterForm" + index).submit()
    }
}

function validateTVUpdateBeforeSubmitAfterFilter(index) {

    // Gets all the values
    var trailer = $("#tv_link" + index).val()

    // gets all the input elements
    var trailer_html = document.getElementById("tv_link" + index)

    // gets all the span elements (for the error messages)
    var trailer_message = document.getElementById("tv_link_message" + index)

    // boolean variable declaration
    var trailer_bool = false

    // Checks if a trailer link was provided
    if (trailer == "") {
        trailer_html.style.borderColor = "green"
        trailer_message.innerHTML = ""
        $(".UpdateTVAfterFilterForm" + index).submit()
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
        $(".UpdateTVAfterFilterForm" + index).submit()
    }
}