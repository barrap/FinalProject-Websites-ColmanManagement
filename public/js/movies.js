$(() => {
    $(".dropbtn").click(showDropDown)
    $(".add-to-cart").click(addToCart);

    var cart_counter = 0
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    function showDropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function addToCart(event) {
        var movie_title = $(this).data('name')
        var price = Number($(this).data('price'))
        cart_counter++

        document.getElementById("cart_counter").innerHTML = "(" + cart_counter + ")"

    }
})