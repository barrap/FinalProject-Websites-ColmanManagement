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
})