document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', function(event) {
        // Get the entered username and password
        const username = document.getElementById('email').value.toLowerCase();
        const password = document.getElementById('pass').value.toLowerCase();
        event.preventDefault();

        // Check if the credentials match for customer or business
        if (username === 'customer@gmail' && password === 'password') {
            // Redirect to customer.html if credentials match for customer
            window.location.href = "customer.html";
        } else if (username === 'business@gmail' && password === 'password') {
            // Redirect to business_man.html if credentials match for business
            window.location.href = "bussiness_man.html";
        } else {
            // Display an error message or take appropriate action for invalid credentials
            alert('Invalid username or password');
        }

        // Prevent the default form submission

    });
});

document.addEventListener('DOMContentLoaded', function() {
    const radioCust = document.getElementById('cust');
    const radioBusMan = document.getElementById('bus-man');
    const bussinessManDiv = document.querySelector('.bussiness-man');
    const investmentDiv = document.getElementById('investmentDiv');
    const signupForm = document.getElementById('signup-form'); // Add this line

    radioCust.addEventListener('change', function() {
        bussinessManDiv.style.display = this.checked ? 'none' : 'block';
        investmentDiv.style.display = 'none'; // Hide investment field for customers
    });

    radioBusMan.addEventListener('change', function() {
        bussinessManDiv.style.display = this.checked ? 'block' : 'none';
    });

    // Additional event listener for form submission
    signupForm.addEventListener('submit', function(event) {
        // Check which radio button is selected
        if (radioCust.checked) {
            // Redirect to customer.html if Customer is selected
            window.location.href = "customer.html";
        } else {
            // Redirect to business.html if Business-man is selected
            window.location.href = "bussiness_man.html";
        }
        
        // Prevent the default form submission
        event.preventDefault();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const passwordField = document.querySelector('input[name="password"]');
    const confirmPasswordField = document.querySelector('input[name="confirm-password"]');
    const passwordMessage = document.getElementById('password-message');

    signupForm.addEventListener('submit', function(event) {
        if (passwordField.value.length < 8) {
            passwordMessage.textContent = "Password must be at least 8 characters.";
            event.preventDefault(); // Prevent form submission
        } else if (passwordField.value !== confirmPasswordField.value) {
            passwordMessage.textContent = "Passwords do not match.";
            event.preventDefault(); // Prevent form submission
        } else {
            passwordMessage.textContent = ""; // Clear the error message
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const categoriesBtn = document.getElementById('categories-btn');
    const sidebar = document.getElementById('sidebar');

    categoriesBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.header .search-bar button');
    const searchInput = document.querySelector('.header .search-bar input');
    const itemBoxes = document.querySelectorAll('.item-box');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        let found = false;

        itemBoxes.forEach(box => {
            const itemName = box.querySelector('.item-name').textContent.toLowerCase();
            if (itemName.includes(searchTerm) && !found) {
                box.scrollIntoView({ behavior: 'smooth', block: 'start' });
                found = true;
            }
        });

        if (!found) alert('No items found matching your search.');
    });
});


document.addEventListener('DOMContentLoaded', function() {

    function filterRows(rows, filter, section) {
        rows.forEach(row => {
            let stateSpan = row.querySelector('.state span');
            if (stateSpan) {
                if (section === 'orders') {
                    const stateText = stateSpan.textContent;
                    const className = stateText.replace(/\s+/g, '-').toLowerCase();
                    stateSpan.className = className;
                }

                if (filter === 'all' || stateSpan.classList.contains(filter)) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }

    // For the first table (Orders Section)
    const orderButtons = document.querySelectorAll('.orders .filters button');
    const orderRows = document.querySelectorAll('.orders .table tbody tr');

    function orderSortRowsByDate() {
        const sortedRows = Array.from(orderRows).sort((a, b) => {
            const dateA = new Date(a.querySelector('td:nth-child(5)').textContent);
            const dateB = new Date(b.querySelector('td:nth-child(5)').textContent);
            return dateB - dateA;
        });

        sortedRows.forEach(row => {
            row.parentNode.appendChild(row);
        });
    }

    orderSortRowsByDate(); // Sorting by date on page load

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            orderButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.textContent.toLowerCase().replace(/\s+/g, '-');
            filterRows(orderRows, filter, 'orders');
            orderSortRowsByDate();
        });
    });

    orderButtons[0].classList.add('active'); // Activate the "All" button by default
    filterRows(orderRows, 'all', 'orders'); // Initial filter on page load

    // For the second table (Stock Section)
    const stockButtons = document.querySelectorAll('.stock-filters button');
    const stockRows = document.querySelectorAll('#stockTable tbody tr');

    stockButtons.forEach(button => {
        button.addEventListener('click', function() {
            stockButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.textContent.toLowerCase().replace(/\s+/g, '-');
            filterRows(stockRows, filter, 'stock');
        });
    });

    stockButtons[0].classList.add('active'); // Activate the "All" button by default
    filterRows(stockRows, 'all', 'stock'); // Initial filter on page load
});



document.addEventListener('DOMContentLoaded', function() {
    // ... [your existing code]

    // Calculate total income from Completed orders
    function calculateTotalIncome() {
        const completedOrders = document.querySelectorAll('.orders tbody tr');
        let total = 0;
        completedOrders.forEach(order => {
            const state = order.querySelector('.state span').textContent;
            if (state === 'Completed') {
                const price = order.querySelector('td:nth-child(3)').textContent.replace('$', '');
                total += parseFloat(price);
            }
        });
        document.getElementById('totalIncome').textContent = `$${total.toFixed(2)}`;
    }
    

    // Calculate total stock value
    function calculateTotalStockValue() {
        const stockRows = document.querySelectorAll('#stockTable tbody tr');
        let total = 0;
        stockRows.forEach(row => {
            const value = row.querySelector('td:nth-child(4)').textContent.replace('$', '');
            total += parseFloat(value);
        });
        document.getElementById('totalStockValue').textContent = `$${total.toFixed(2)}`;
    }

    // Update totals initially
    calculateTotalIncome();
    calculateTotalStockValue();

    // Update totals when the filters change
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ... [your existing code]
            calculateTotalIncome();
        });
    });

    stockButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ... [your existing code]
            calculateTotalStockValue();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all comment forms
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const commentText = this.querySelector('textarea').value;

            // Create a new comment element
            const newComment = document.createElement('li');
            newComment.textContent = commentText;

            // Append the new comment to the comment list
            const commentList = this.closest('.item-box').querySelector('.comment-list');
            commentList.appendChild(newComment);

            // Clear the textarea
            this.querySelector('textarea').value = '';
        });
    });
});

// ...

document.addEventListener("DOMContentLoaded", function() {
    const addToFavButtons = document.querySelectorAll(".add-to-fav");
    const favoritesModal = document.getElementById("favoritesModal");
    const favourites = []; // Assuming you have an array to store favorite items

    addToFavButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            try {
                event.preventDefault();
                const iconElement = this.querySelector(".fa-heart-circle-plus, .fa-heart-circle-minus");                
                const itemBoxContent = this.closest(".item-box").outerHTML;
                if (!favourites.includes(itemBoxContent)) {
                    this.querySelector("span").textContent = "Remove from Favorites";
                    iconElement.className = "fa-solid fa-heart-circle-minus";
                    favourites.push(itemBoxContent);
                } else {
                    // Check for exact match to remove from favourites
                    const index = favourites.indexOf(itemBoxContent);
                    if (index > -1) {
                        favourites.splice(index, 1);
                        console.log("iam here");
                    }
                    this.querySelector("span").textContent = "Add to Favorites";
                    iconElement.className = "fa-solid fa-heart-circle-plus";
                }
                
                // Debugging: Print out the favourites array after each operation
                console.log("Favourites Array:", favourites);
                updateFavoritesModal();
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });
    
    
    function updateFavoritesModal() {
        const modalContent = favoritesModal.querySelector(".modal-content");
        
        // Clear existing content
        modalContent.innerHTML = "";
    
        // Populate modal with items from the favourites array
        favourites.forEach(item => {
            modalContent.innerHTML += item;
        });
    
        // If there's no content in modal, you can show a message or hide the modal
        if (favourites.length === 0) {
            modalContent.innerHTML = "<p>No items in favorites.</p>";
        }
    }

    const heartButton = document.querySelector(".fa-regular.fa-heart");
    heartButton.addEventListener("click", function() {
        if (favoritesModal.style.display === "none" || favoritesModal.style.display === "") {
            showFavoritesModal();
        } else {
            hideFavoritesModal();
        }
    });

    function showFavoritesModal() {
        const modalContent = favoritesModal.querySelector(".modal-content");
        modalContent.innerHTML = favourites.join("");
        favoritesModal.style.display = "block";
        document.querySelector(".cust-page").style.opacity = "0.5"; // Decrease opacity of the body
    }

    function hideFavoritesModal() {
        favoritesModal.style.display = "none";
        document.querySelector(".cust-page").style.opacity = "1"; // Restore opacity of the body
    }

    // Close modal when clicking outside of the content
    favoritesModal.addEventListener("click", function(e) {
        if (e.target === this) {
            hideFavoritesModal();
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartModal = document.getElementById("cartModal");
    const cartItems = []; // Assuming you have an array to store cart items

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            try {
                event.preventDefault();
                const iconElement = this.querySelector(".fa-cart-plus, fa-cart-arrow-down");
                const itemBoxContent = this.closest(".item-box").outerHTML;

                if (!cartItems.includes(itemBoxContent)) {
                    this.querySelector("span").textContent = "Remove from Cart";
                    iconElement.className = "fa-solid fa-cart-arrow-down";
                    cartItems.push(itemBoxContent);
                } else {
                    const index = cartItems.indexOf(itemBoxContent);
                    if (index > -1) {
                        cartItems.splice(index, 1);
                    }
                    this.querySelector("span").textContent = "Add to Cart";
                    iconElement.className = "fa-solid fa-cart-plus";
                }

                console.log("Cart Items Array:", cartItems);
                updateCartModal();
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });

    function updateCartModal() {
        const modalContent = cartModal.querySelector(".modal-content2");
        
        modalContent.innerHTML = "";
    
        cartItems.forEach(item => {
            modalContent.innerHTML += item;
        });
    
        if (cartItems.length === 0) {
            modalContent.innerHTML = "<p>No items in cart.</p>";
        }
    }

    const cartButton = document.getElementById("cartButton");
    cartButton.addEventListener("click", function() {
        if (cartModal.style.display === "none" || cartModal.style.display === "") {
            showCartModal();
        } else {
            hideCartModal();
        }
    });

    function showCartModal() {
        const modalContent = cartModal.querySelector(".modal-content2");
        modalContent.innerHTML = cartItems.join("");
        cartModal.style.display = "block";
        document.querySelector(".cust-page").style.opacity = "0.5";
    }

    function hideCartModal() {
        cartModal.style.display = "none";
        document.querySelector(".cust-page").style.opacity = "1";
    }

    cartModal.addEventListener("click", function(e) {
        if (e.target === this) {
            hideCartModal();
        }
    });

});
