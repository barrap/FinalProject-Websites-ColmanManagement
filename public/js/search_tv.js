$(() => {
    $("#inp_search").keyup(function () {
        $.ajax({
            url: "/searchTV?" + $("#search_parameters").val() + "=" + $("#inp_search").val(),
        }).done(function (res) {
            $(".results").html("")

            // Runs on all the results
            for (let i = 0; i < res.length; i++) {
                const element = res[i];

                // Gets the template for the results
                let template = $("#search_template").html()

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
})