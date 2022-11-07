$(() => {
    
    $("#filterbtn").click(function () {
        
            $.ajax({
                url: "/filter_movies?"+$("#year").val() + "+" + $("#genre").val()+ "+" + $("#price").val()
                + "+" + $("#dir").val() + "+" + $("#len").val()
            }).done(function (res) {
                $(".results").html("")

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

                    // Append the new template
                    $(".results").append(template)

                }

            });
    })
})