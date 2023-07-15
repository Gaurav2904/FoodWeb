// This is a placeholder data. You should replace this with actual API calls
var restaurants = [
    { id: 1, name: 'Restaurant 1' },
    { id: 2, name: 'Restaurant 2' },
    // ...
];

var menu = [
    { id: 1, name: 'Food 1', price: 100, restaurantId: 1 },
    { id: 2, name: 'Food 2', price: 200, restaurantId: 1 },
    { id: 3, name: 'Food 3', price: 150, restaurantId: 2 },
    { id: 4, name: 'Food 4', price: 250, restaurantId: 2 },
    { id: 5, name: 'Food 5', price: 300, restaurantId: 2 },
    // ...
];

var cart = [];

// Load restaurants
function loadRestaurants() {
    var restaurantsDiv = document.getElementById('restaurants');
    restaurants.forEach(function(restaurant) {
        var button = document.createElement('button');
        button.textContent = restaurant.name;
        button.onclick = function() {
            // Load the restaurant menu page
            window.location.href = 'restaurant.html?id=' + restaurant.id;
        };
        restaurantsDiv.appendChild(button);
    });
}

// Load menu
function loadMenu(restaurantId) {
    var menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = ''; // Clear previous menu
    menu.forEach(function(item) {
        if (item.restaurantId === restaurantId) {
            var button = document.createElement('button');
            button.textContent = item.name + ' - ₹' + item.price;
            button.onclick = function() {
                addToCart(item.id);
            };
            menuDiv.appendChild(button);
        }
    });
}

// Add to cart
function addToCart(itemId) {
    var item = menu.find(function(item) {
        return item.id === itemId;
    });
    cart.push(item);
    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart
function loadCart() {
    var cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Clear previous cart
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(function(item) {
        var p = document.createElement('p');
        p.textContent = item.name + ' - ₹' + item.price;
        cartDiv.appendChild(p);
    });
}

// Go to cart
document.getElementById('goToCart').onclick = function() {
    window.location.href = 'cart.html';
};

// Initialize
loadRestaurants();
loadMenu();
loadCart();
