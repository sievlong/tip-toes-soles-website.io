const colorSelect = document.getElementById('color-select');
const productImg = document.getElementById('product-img');

window.addEventListener('DOMContentLoaded', () => {
    const defaultColor = colorSelect.value;
    const defaultImg = colorSelect.options[colorSelect.selectedIndex].getAttribute('data-img');
    productImg.setAttribute('src', defaultImg);
});

colorSelect.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const newImg = selectedOption.getAttribute('data-img');
    productImg.setAttribute('src', newImg);
});

const addToCartButton = document.getElementById('add-to-cart');
addToCartButton.addEventListener('click', () => {
    const selectedColor = colorSelect.value;
    const selectedSize = document.getElementById('size-select').value;
    const productName = document.querySelector('.product-details h1').textContent;
    const productPriceText = document.querySelector('.product-price').textContent;
    const productPrice = parseFloat(productPriceText.replace('$', '').trim());

    const product = {
        name: productName,
        price: productPrice,
        color: selectedColor,
        size: selectedSize,
    };

    addToCart(product);
    alert(`${productName} in ${selectedColor}, Size ${selectedSize} added to cart!`);
});

function getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartIcon();
}

function updateCartIcon() {
    const cart = getCart();
    document.getElementById('cart-count').textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartIcon);
