// product card click
const productCards = document.querySelectorAll(".product-card");
const productModal = document.getElementById("productModal");

productCards.forEach(card => {
    card.addEventListener("click", function () {

        const image = card.querySelector("img");
        const name = card.querySelector("h3");
        const price = card.querySelector(".price");

        document.getElementById("modalProductImage").src = image.src;
        document.getElementById("modalProductName").textContent = name.textContent;
        document.getElementById("modalProductPrice").textContent = price.textContent;

        productModal.style.display = "flex";
    });
});


// CLOSE PRODUCT MODAL
const closeModal = document.querySelector(".closeModal");

closeModal.addEventListener("click", function () {
    productModal.style.display = "none";
});

productModal.addEventListener("click", function (event) {

    if (event.target === productModal) {
        productModal.style.display = "none";
    }

});


// =========================
// CART
// =========================

let cart = [];

const addToCartBtn = document.getElementById("addToCartBtn");
const productSize = document.getElementById("productSize");
const productColour = document.getElementById("productColour");

addToCartBtn.addEventListener("click", function () {

    if (productSize.value === "" || productColour.value === "") {

        alert("Please select a size and colour.");
        return;

    }

    const product = {

        name: document.getElementById("modalProductName").textContent,

        price: document.getElementById("modalProductPrice").textContent,

        image: document.getElementById("modalProductImage").src,

        size: productSize.value,

        colour: productColour.value,

        quantity: 1

    };

    cart.push(product);

    productModal.style.display = "none";

    displayCart();

});


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    let total = 0;

    cartItems.innerHTML = "";
    if (cart.length === 0) {

    cartItems.innerHTML = `
        <p class="empty-cart">
            YOUR CART IS EMPTY 🛒
        </p>
    `;

    document.getElementById("cartTotal").textContent = "0";
    document.getElementById("cartCount").textContent = "0";

    return;
}

    cart.forEach((item, index) => {

        const priceNumber = parseInt(
            item.price.replace(/[₦,]/g, "")
        );

        const quantity = item.quantity || 1;

        const itemTotal = priceNumber * quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h3>${item.name}</h3>

                    <p>₦${itemTotal.toLocaleString()}</p>

                    <p>Size: ${item.size}</p>

                    <p>Colour: ${item.colour}</p>


                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>${quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>


                    <button
                        class="removeItem"
                        onclick="removeFromCart(${index})"
                    >
                        REMOVE
                    </button>

                </div>

            </div>

        `;

    });


    document.getElementById("cartTotal").textContent =
         total.toLocaleString();


    // Total number of products in cart
    document.getElementById("cartCount").textContent =
        cart.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, amount) {

    cart[index].quantity =
        (cart[index].quantity || 1) + amount;


    // Don't allow quantity below 1
    if (cart[index].quantity < 1) {

        cart[index].quantity = 1;

    }


    displayCart();

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();

}


// =========================
// CART WINDOW
// =========================

const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");


cartButton.addEventListener("click", function () {

    cartModal.style.display = "flex";

});


closeCart.addEventListener("click", function () {

    cartModal.style.display = "none";

});


cartModal.addEventListener("click", function (event) {

    if (event.target === cartModal) {

        cartModal.style.display = "none";

    }

});

//CRZ CHECKOUT


const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutForm = document.getElementById("checkoutForm");
const placeOrderBtn = document.getElementById("placeOrderBtn");


// SHOW CHECKOUT FORM
checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    checkoutForm.style.display = "block";

});


// PLACE ORDER
placeOrderBtn.addEventListener("click", function () {

    const customerName =
        document.getElementById("customerName").value.trim();

    const customerPhone =
        document.getElementById("customerPhone").value.trim();

    const customerAddress =
        document.getElementById("customerAddress").value.trim();


    // CHECK CUSTOMER DETAILS
    if (
        customerName === "" ||
        customerPhone === "" ||
        customerAddress === ""
    ) {

        alert("Please fill in all your details.");

        return;
    }


    // CREATE ORDER MESSAGE
    let orderMessage =
        "🔥 CRZTRAIN ORDER 🔥\n\n";


    orderMessage +=
        "Customer: " + customerName + "\n";

    orderMessage +=
        "Phone: " + customerPhone + "\n";

    orderMessage +=
        "Address: " + customerAddress + "\n\n";


    orderMessage +=
        "ORDER DETAILS:\n";


    let orderTotal = 0;


    cart.forEach((item, index) => {

        const priceNumber = parseInt(
            item.price.replace(/[₦,]/g, "")
        );

        const quantity = item.quantity || 1;

        const itemTotal = priceNumber * quantity;

        orderTotal += itemTotal;


        orderMessage +=
            "\n" +
            (index + 1) + ". " +
            item.name + "\n" +
            "Size: " + item.size + "\n" +
            "Colour: " + item.colour + "\n" +
            "Quantity: " + quantity + "\n" +
            "Price: ₦" +
            itemTotal.toLocaleString() +
            "\n";
    });


    orderMessage +=
        "\nTOTAL: ₦" +
        orderTotal.toLocaleString();


    // WHATSAPP NUMBER
    const whatsappNumber = "2348156815699";


    // CREATE WHATSAPP LINK
    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(orderMessage);


    // OPEN WHATSAPP
    window.open(whatsappURL, "_blank");

});




console.log("CRZTRAIN JS IS WORKING");

