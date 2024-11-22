function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    const cart = getCart();
    const cartCount = cart.length;
    const cartIcon = document.querySelector('#cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount > 0 ? cartCount : '';
    }
}

function removeItemFromCart(productName, productSize, productColor) {
    let cart = getCart();

    const indexToRemove = cart.findIndex(item => item.name === productName && item.size === productSize && item.color === productColor);

    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
        saveCart(cart);
        displayCartItems();
    }
}

function displayCartItems() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    let totalPrice = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <div class="cart-item-info">
                <p><strong>${item.name}</strong></p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Size: ${item.size}</p>
                <p>Color: ${item.color}</p> <!-- Show color -->
            </div>
            <button class="remove-item-btn" data-product="${item.name}" data-size="${item.size}" data-color="${item.color}">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        totalPrice += item.price;
    });

    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            const productSize = e.target.getAttribute('data-size');
            const productColor = e.target.getAttribute('data-color');
            removeItemFromCart(productName, productSize, productColor);
        });
    });
}

function clearCart() {
    saveCart([]);
    displayCartItems();
}

const clearCartButton = document.getElementById('clear-cart');
if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        clearCart();
    });
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let checkoutSummary = "Checkout Summary:\n\n";

    cart.forEach(item => {
        checkoutSummary += `Product: ${item.name}\n`;
        checkoutSummary += `Size: ${item.size}\n`;
        checkoutSummary += `Color: ${item.color}\n`;
        checkoutSummary += `Price: $${item.price.toFixed(2)}\n`;
        checkoutSummary += `------------------------\n`;
    });

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price;
    });

    checkoutSummary += `Total Price: $${totalPrice.toFixed(2)}\n`;

    alert(checkoutSummary);

}

const checkoutButton = document.getElementById('checkout');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        checkout();
    });
}


document.addEventListener('DOMContentLoaded', updateCartIcon);

if (document.getElementById('cart-items')) {
    displayCartItems();
}
