$(() => {
    title = (window.location.href).split("movie=")[1]
    title = title.replaceAll("%20"," ")
    title = title.trimStart().replaceAll(" ","%20")
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://imdb8.p.rapidapi.com/title/v2/find?title="+title+"&limit=20&sortArg=moviemeter%2Casc",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "ac1f79cbcbmsh9f4274bfdce4627p11dabcjsn17f24c92f5b3",
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        id = response.results[0].id;
        id = id.split('/')[2]
        const settings1 = {
            "async": true,
            "crossDomain": true,
            "url": "https://imdb8.p.rapidapi.com/title/get-ratings?tconst="+id,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "ac1f79cbcbmsh9f4274bfdce4627p11dabcjsn17f24c92f5b3",
                "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
            }
        };
        
        $.ajax(settings1).done(function (response) {
            rating = (response.rating);
            let template = $("#rate_template").html()
            template = template.replace('{rating}',rating)
            console.log((window.location.href).split("movie="))
    
            $(".results").append(template) 
        });
    
    });
    
})
