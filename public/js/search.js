$(() => {
    $("#inp_search").keyup(function () {
            $.ajax({
                url: "/search?"+$("#search_parameters").val() + "=" + $("#inp_search").val(),
            }).done(function (res) {
                $(".results").html("")
                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    let template = $("#search_template").html()
                    for (const key in element) {
                        template = template.replaceAll('{' + key + '}', element[key])
                    }
                    $(".results").append(template)

                }

            });
    })
})