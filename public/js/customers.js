$(() => {

    // Gets all admin statuses
    var admin_statuses = document.getElementsByClassName("isAdmin")

    // Run on all the customers
    for (var i = 0; i < admin_statuses.length; i++) {

        // Gets the username of each customer
        username = document.getElementById("username_" + (i + 1)).innerText

        // Saves the admin status for each customer
        admin_status = admin_statuses[i].innerText

        // Checks if a user is an admin
        if (admin_status === "True") {
            $("#admin_status_" + (i + 1)).html("<form action='/removeAdmin' method='post'>\
                <input readonly class='d-none' name='username'\
                value='"+ username + "'>\
                <button type='submit' class='btn btn-outline-warning'>\
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-dash-circle' viewBox='0 0 16 16'>\
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>\
                    <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'/>\
                    </svg ></button>\
            </form >")
        }
        else {
            $("#admin_status_" + (i + 1)).html("<form action='/addAdmin' method='post'>\
            <input readonly class='d-none' name='username'\
                value='"+ username + "'>\
            <button type='submit' class='btn btn-outline-primary'>\
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi - plus - circle' viewBox='0 0 16 16'>\
            <path d = 'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>\
                <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/>\
              </svg ></button>\
        </form>")
        }
    }
})