$(() => {
    $(".dropbtn").click(showDropDown)
    $(".add-to-cart").click(OuterAddToCart);

    cart = []

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

    // Functions of the shopping cart


    // Add item to cart from main html card
    function OuterAddToCart(event) {
        var movie_title = $(this).data('name')
        var price = Number($(this).data('price'))

        var new_item = { "title": movie_title, "price": price, count: 1 }
        for (var item in cart) {
            if (cart[item].title === movie_title) {
                cart[item].count++
                saveCart()
                displayCart()
                return;
            }
        }
        cart.push(new_item)
        saveCart()
        displayCart()

    }


    // Add item to cart from cart modal
    function InnerAddToCart(movie_title) {
        for (var item in cart) {
            if (cart[item].title === movie_title) {
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
        for (var item in cart) {
            cart_count += cart[item].count
        }
        return cart_count
    }

    // Gets the total cart price
    function totalCartPrice() {
        var total_price = 0
        for (var item in cart) {
            total_price += cart[item].count * cart[item].price
        }

        return total_price.toFixed(2)
    }

    // Sets the count of an item to a spesific amount
    function setItemCount(name, count) {
        for (var item in cart) {
            if (cart[item].title === name) {
                cart[item].count = count
                if (cart[item].count === 0) {
                    cart.splice(item, 1)
                }
            }
            break
        }
        saveCart()
    }

    // Decreas one from the count of the given item
    function deleteOneItem(name) {
        for (var item in cart) {
            if (cart[item].title === name) {
                cart[item].count--
                if (cart[item].count === 0) {
                    cart.splice(item, 1)
                }
            }
            break
        }
        saveCart()
    }

    // Delete all the occurences of a given item
    function deleteAllItems(name) {
        for (var item in cart) {
            if (cart[item].title === name) {
                cart.splice(item, 1)
            }
            break
        }
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

    function getAllTitles() {
        title_arr = []
        for (var item in cart) {
            title_arr.push(cart[item].title)
        }

        return title_arr
    }
    // Function to display the cart
    function displayCart() {
        var output = "";
        for (var i in cart) {
            output += "<tr>"
                + "<td name='title'>" + cart[i].title + "</td>"
                + "<td name=>(" + cart[i].price + ")</td>"
                + "<td><div class='input-group'><button type='button' class='minus-item input-group-addon btn btn-outline-primary' data-name=" + cart[i].title + ">-</button>"
                + "<input type='number' class='item-count form-control' data-name='" + cart[i].title + "' value='" + cart[i].count + "'>"
                + "<button type='button' class='plus-item btn btn-outline-primary input-group-addon' data-name=" + cart[i].title + ">+</button></div></td>"
                + "<td><button type='button' class='delete-item btn btn-outline-danger' data-name=" + cart[i].title + ">X</button></td>"
                + " = "
                + "<td>" + Number(cart[i].count * cart[i].price).toFixed(2) + "</td>"
                + "</tr>";
        }
        document.getElementById("all_titles").setAttribute("value", getAllTitles())
        document.getElementById("total_price").setAttribute("Value", Number(totalCartPrice()))
        $('.show-cart').html(output);
        $('.total-cart').html(totalCartPrice());
        document.getElementById("cart_counter").innerHTML = "(" + cartCount() + ")"
    }


    
    $('.show-cart').on("click", ".delete-item", function (event) {
        var name = $(this).data('name')
        deleteAllItems(name);
        displayCart();
    })

    $('.show-cart').on("click", ".minus-item", function (event) {
        var name = $(this).data('name')
        deleteOneItem(name);
        displayCart();
    })

    $('.show-cart').on("click", ".plus-item", function (event) {
        var name = $(this).data('name')
        InnerAddToCart(name);
        displayCart();
    })

    $('.show-cart').on("change", ".item-count", function (event) {
        var name = $(this).data('name');
        var count = Number($(this).val());
        setItemCount(name, count);
        displayCart();
    });
    $('#clear_cart').click(function (event) {
        clearCart();
        displayCart();
    });

    // Checks if the cart has value in it
    if(sessionStorage.getItem("shoppingCart") != null) {
        loadCart()
    }
    displayCart();

    $("#order").click(clearCart())

})