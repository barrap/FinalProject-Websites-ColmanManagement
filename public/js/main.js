$(() => {
    $(".dropbtn").click(showDropDown)


    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    function showDropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {

            // Gets all the elements of the dropdown list
            var dropdowns = document.getElementsByClassName("dropdown-content");

            // Run on all the dropdown contents
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];

                // Checkf if the dropdown is show (if so, hides it)
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    var movies = document.getElementsByClassName("movie")
    if (movies) {
        for (var i = 0; i < movies.length; i++) {
            var movie_title = document.getElementById("movie" + i).innerHTML
            var movie_page_link = document.getElementById("movie_link" + i)
            movie_page_link.setAttribute("href", "/movie?movie=" + movie_title)
        }

    }


    var tv_shows = document.getElementsByClassName("tvshow")
    if (tv_shows) {
        for (var i = 0; i < tv_shows.length; i++) {
            var tv_show_title = document.getElementById("tvshow" + i).innerHTML
            var tv_show_page_link = document.getElementById("tv_link" + i)
            tv_show_page_link.setAttribute("href", "/tvshow?tvshow=" + tv_show_title.split(" ").join(""))
        }
    }

})
