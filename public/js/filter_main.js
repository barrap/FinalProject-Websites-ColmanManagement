$(() => {

    $("#filterbtn").click(function () {
        $.ajax({
            url: "/filter?" + $("#year").val() + "+" + $("#genre").val() + "+" + $("#price").val()
        }).done(function (res) {
            $(".movies_results").html("")
            $(".tvs_results").html("")

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