$(() => {

    $(".dropbtn").click(showDropDown)
    $("#findLatLng").click(FindCoordinates)
    $("#submitBtn").click(ValidateBeforeSubmission)


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

    function FindCoordinates(event) {
        document.getElementById("city_message").innerHTML = ""
        var city = $("#city").val()
        if (city == "") {
            document.getElementById("city_message").innerHTML = "You must provide a city name<br>"
            document.getElementById("city").style.borderColor = "red";
            return
        }
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode({ 'address': city }, function (results, status) {
            if (status == 'OK') {
                document.getElementById("latitude").setAttribute("value", results[0].geometry.location.lat())
                document.getElementById("longitude").setAttribute("Value", results[0].geometry.location.lng())
                document.getElementById("city_message").innerHTML = ""
                document.getElementById("city").style.borderColor = "green";
            }
            else {
                document.getElementById("city_message").innerHTML += "There was a problem with the name of the city that you've entered"
                document.getElementById("city").style.borderColor = "red";
            }
        })
    }

    function ValidateBeforeSubmission(event) {

        // get lat and lng values
        var lat = Number($("#latitude").val())
        var lng = Number($("#longitude").val())
        document.getElementById("city_message").innerHTML = ""

        if (document.getElementById("city").style.borderColor != "green") {
            document.getElementById("city_message").innerHTML = "There was a problem with the name of the city that you've entered"
            document.getElementById("city").style.borderColor = "red";
            return false;
        }
        else if (isNaN(lat)) {
            document.getElementById("latitude_message").innerHTML = "latitude must be a number"
            document.getElementById("latitude").style.borderColor = "red";
        }
        else if (isNaN(lng)) {
            document.getElementById("longitude_message").innerHTML = "longitude must be a number"
            document.getElementById("longitude").style.borderColor = "red";
            return false
        }
        else {
            return true
        }
    }

})