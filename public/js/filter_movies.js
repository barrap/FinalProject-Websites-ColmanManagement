$(() => {

    $("#filterbtn").click(function () {

        $.ajax({
            url: "/filter_movies?" + $("#year").val() + "+" + $("#genre").val() + "+" + $("#price").val()
                + "+" + $("#dir").val() + "+" + $("#len").val()
        }).done(function (res) {
            $(".results").html("")

            if (res.length >= 0 && res.length < 5) {
                $(".footer").css('position', 'fixed')
            }
            else if (res.length >= 5) {
                $(".footer").css('position', 'relative')
            }
            // Runs on all the results
            for (let i = 0; i < res.length; i++) {
                const element = res[i];

                // Gets the template for the results
                let template = $("#show_template").html()

                // Runs on all the data in the element
                for (const key in element) {

                    // Saves the data in the information
                    template = template.replaceAll('{' + key + '}', element[key])
                }
                template = template.replaceAll("{i}", i)

                // Append the new template
                $(".results").append(template)

            }

        });
    })

    $("#clear").click(function () {
        $.ajax({
            url: "/allMovies"
        }).done(function (res) {
            $(".results").html("")
            $(".footer").css('position', 'relative')
            // Runs on all the results
            for (let i = 0; i < res.length; i++) {
                const element = res[i];

                // Gets the template for the results
                let template = $("#show_template").html()

                // Runs on all the data in the element
                for (const key in element) {

                    // Saves the data in the information
                    template = template.replaceAll('{' + key + '}', element[key])
                }
                template = template.replaceAll("{i}", i)

                // Append the new template
                $(".results").append(template)

            }
        })
    })
})

function validateMovieUpdateBeforeSubmitAfterFilter(index) {

    // Gets all the values
    var trailer = $("#link" + index).val()

    // gets all the input elements
    var trailer_html = document.getElementById("link" + 1)

    // gets all the span elements (for the error messages)
    var trailer_message = document.getElementById("link_message" + 1)

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