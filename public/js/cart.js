$(() => {

    $(".add-to-cart").click(OuterAddToCart);

    cart = []

    // Add item to cart from main html card
    function OuterAddToCart(event) {

        // Gets the data needed
        var movie_title = $(this).data('name')
        var short_movie_title = movie_title.split(" ").join("")
        var price = Number($(this).data('price'))


        // Define a new ite
        var new_item = { "title": movie_title, "shortTitle": short_movie_title, "price": price, count: 1 }

        // Run on the cart
        for (var item in cart) {

            // Checks if we found the right item
            if (cart[item].title === movie_title) {

                // Increases the count and saves the cart
                cart[item].count++
                saveCart()
                displayCart()
                return;
            }
        }

        // The item is a new one so adds it ot the cart
        cart.push(new_item)
        saveCart()
        displayCart()

    }


    // Add item to cart from cart modal
    function InnerAddToCart(movie_title) {

        // Run on the cart
        for (var item in cart) {

            // Checks if we found the right item
            if (cart[item].shortTitle === movie_title) {

                // Increases the count and saves the cart
                cart[item].count++
                saveCart()
                displayCart()
                return;
            }
        }
    }

    // Saves the cart
    function saveCart() {
        sessionStorage.setItem("shoppingCart", JSON.stringify(cart))
    }


    // Gets the total number of items in the cart
    function cartCount() {
        var cart_count = 0

        // Run on the cart
        for (var item in cart) {

            // Add each item count to the total count
            cart_count += cart[item].count
        }

        // return the cart count
        return cart_count
    }

    // Gets the total cart price
    function totalCartPrice() {
        var total_price = 0

        // run on the cart
        for (var item in cart) {

            // Adds the total price of each item to the total price
            total_price += cart[item].count * cart[item].price
        }

        // Returns the cart price (until two digits after the decimel point)
        return total_price.toFixed(2)
    }

    // Sets the count of an item to a spesific amount
    function setItemCount(name, count) {

        // Run on the cart
        for (var item in cart) {

            // Checks if we found the right item
            if (cart[item].shortTitle === name) {

                // Sets the new item count
                cart[item].count = count

                // Checks if the item need to be removed from the cart
                if (cart[item].count === 0) {
                    cart.splice(item, 1)
                    break
                }
            }

        }

        // Saves the new cart
        saveCart()
    }

    // Decreas one from the count of the given item
    function deleteOneItem(name) {

        // Run on the cart
        for (var item in cart) {

            // Checks if we found the right item
            if (cart[item].shortTitle === name) {

                // Decrease the amount of the item by 1
                cart[item].count--

                // Checks if the item need to be removed from the cart
                if (cart[item].count === 0) {
                    cart.splice(item, 1)
                    break
                }
            }

        }

        // Saves the new cart
        saveCart()
    }

    // Delete all the occurences of a given item
    function deleteAllItems(name) {

        // Run on the cart
        for (var item in cart) {

            // Checks if we found the right item
            if (cart[item].shortTitle === name) {
                cart.splice(item, 1)
                break
            }

        }

        // Saves the new cart
        saveCart()
    }


    // Clear the cart
    function clearCart() {
        cart = []
        saveCart()
    }

    // Function to load the cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem("shoppingCart"))
    }

    // Function to get all the titles in the cart
    function getAllTitles() {
        title_arr = []
        for (var item in cart) {
            title_arr.push(cart[item].title)
        }
        
        // Returns the title aray
        return title_arr
    }


    // Function to display the cart
    function displayCart() {
        var output = "";

        // Runs on the cart
        for (var i in cart) {

            // Define the item output html
            output += "<tr>"
                + "<td name='title'>" + cart[i].title + "</td>"
                + "<td name='price'>(" + cart[i].price + ")</td>"
                + "<td><div class='input-group'><button type='button' class='minus-item input-group-addon btn btn-outline-primary' data-name=" + cart[i].shortTitle + ">-</button>"
                + "<input type='number' class='item-count form-control' data-name='" + cart[i].shortTitle + "' value='" + cart[i].count + "'>"
                + "<button type='button' class='plus-item btn btn-outline-primary input-group-addon' data-name=" + cart[i].shortTitle + ">+</button></div></td>"
                + "<td><button type='button' class='delete-item btn btn-outline-danger' data-name=" + cart[i].shortTitle + ">X</button></td>"
                + " = "
                + "<td>" + Number(cart[i].count * cart[i].price).toFixed(2) + "</td>"
                + "</tr>";
        }

        // Saves all the titles and the total price of the cart (in order to save the order in the right way)
        document.getElementById("all_titles").setAttribute("value", getAllTitles())
        document.getElementById("total_price").setAttribute("Value", Number(totalCartPrice()))
        
        // Displays the cart
        $('.show-cart').html(output);

        // Dislays the total cost of the cart
        $('.total-cart').html(totalCartPrice());

        // Displays the number of items in the cart
        document.getElementById("cart_counter").innerHTML = "(" + cartCount() + ")"
    }

    // Define the action taken in order to delete an item from the cart
    $('.show-cart').on("click", ".delete-item", function (event) {
        var name = $(this).data('name')
        deleteAllItems(name);
        displayCart();
    })

    // Define the action taken in order to decrease one occurence of an item from the cart
    $('.show-cart').on("click", ".minus-item", function (event) {
        var name = $(this).data('name')
        deleteOneItem(name);
        displayCart();
    })

    // Define the action taken in order to add one occurence of an item from the cart
    $('.show-cart').on("click", ".plus-item", function (event) {
        var name = $(this).data('name')
        InnerAddToCart(name);
        displayCart();
    })

    // Define the action taken in order to set a new count for an item
    $('.show-cart').on("change", ".item-count", function (event) {
        var name = $(this).data('name');
        var count = Number($(this).val());
        setItemCount(name, count);
        displayCart();
    });

    // Define the action taken in order to delete all items from the cart
    $('#clear_cart').click(function (event) {
        clearCart();
        displayCart();
    });

    // Checks if the cart has value in it
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart()
    }
    displayCart();

    $("#order").click(() => {
        displayCart()
        clearCart()
    })
});