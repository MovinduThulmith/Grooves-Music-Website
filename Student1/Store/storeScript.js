// Cart
let cartIcon = document.querySelector("#cartIcon");
let cartCard = document.querySelector(".cartCard");
let closeCart = document.querySelector("#closeCart");

// Open cart
cartIcon.onclick = () => {
   cartCard.classList.add("active");
}

// Close cart
closeCart.onclick = () => {
   cartCard.classList.remove("active");
}

// Cart's functionality
if (document.readyState == "loading") {
   document.addEventListener("DOMContentLoaded", ready);
} else {
   ready();
}

function ready() {
   // Remove items from cart
   var removeCartButtons = document.getElementsByClassName("cartRemove");
   for (var i = 0; i < removeCartButtons.length; i++) {
      var button = removeCartButtons[i];
      button.addEventListener("click", removeCartItem);
   }
   // Quantity changes
   var quantityInputs = document.getElementsByClassName("cartQuantity");
   for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
   }
   // Add to cart
   var addCart = document.getElementsByClassName("addCart");
   for (var i = 0; i < addCart.length; i++) {
      var button = addCart[i];
      button.addEventListener("click", addCartClicked);
   }
   // Buy button
   document.getElementsByClassName("buttonBuy")[0].addEventListener("click", buyButtonClicked);   
}

// Buy button functionality
function buyButtonClicked() {

   // If the cart is empty
   var cartContent = document.getElementsByClassName("cartContent")[0];
   var cartBoxes = cartContent.getElementsByClassName("cartBox");
   var productCount = cartBoxes.length;

   if (productCount === 0) {
      alert("Your cart is empty");
      return;
   } 

   for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var quantityElement = cartBox.querySelector(".cartQuantity");
      var quantity = parseInt(quantityElement.value);
      if (quantity > 10) {
         alert("You cannot order more than 10 items from one product")
         return;
      }
   }

   alert("Your can checkout your order in next window");
   
   // Get cart data from the DOM
   var cartContent = document.getElementsByClassName("cartContent")[0];
   var cartBoxes = cartContent.getElementsByClassName("cartBox");
   var cartData = [];

   for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var imageElement = cartBox.querySelector(".cartImage");
      var titleElement = cartBox.querySelector(".cartProductTitle");
      var priceElement = cartBox.querySelector(".cartPrice");
      var quantityElement = cartBox.querySelector(".cartQuantity");

      var image = imageElement.src;
      var title = titleElement.innerText;
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = parseInt(quantityElement.value);

      // Store the cart item details in an object
      var cartItem = {
         image: image,
         title: title,
         price: price,
         quantity: quantity
      };

      // Add the cart item object to the cartData array
      cartData.push(cartItem);
   }

   // Store cart data in local storage
   localStorage.setItem("cartItems", JSON.stringify(cartData));

   // Redirecting to checkout page
   window.location.href = "checkout.html";

}


// Remove items from cart
function removeCartItem(event) {
   var buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
}

// Quantity changes
function quantityChanged(event) {
   var input = event.target;
   if (isNaN(input.value) || input.value <= 0 || input.value >= 10) {
      input.value = 1;
   }
   updateTotal();
}

// Add to cart
function addCartClicked(event) {
   var button = event.target;
   var productBox = button.parentElement;
   var title = productBox.getElementsByClassName("productTitle")[0].innerText;
   var price = productBox.getElementsByClassName("productPrice")[0].innerText;
   var image = productBox.getElementsByClassName("productImage")[0].src;
   addProductsToCart(title, price, image);
   updateTotal();
}

// Add product to the cart
function addProductsToCart(title, price, image) {
   var cartBox = document.createElement("div");
   cartBox.classList.add("cartBox");
   var cartItems = document.getElementsByClassName("cartContent")[0];
   var cartItemsNames = cartItems.getElementsByClassName("cartProductTitle");
   var quantity = document.getElementsByClassName("cartQuantity");

   for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText === title) {
         quantity[i].value = parseInt(quantity[i].value) + 1;         
         return;
      }
   }
   var cartBoxContent = `
   <img src="${image}" alt="" class="cartImage"/>
   <div class="detailBox">
      <div class="cartProductTitle">${title}</div>
      <div class="cartPrice">${price}</div>
      <input type="number" value="1" min="1" max="9" class="cartQuantity" />
   </div>
   <!-- Remove from cart -->
   <i class="bx bxs-trash-alt cartRemove"></i>`;
   cartBox.innerHTML = cartBoxContent;
   cartItems.append(cartBox);
   cartBox.getElementsByClassName("cartRemove")[0].addEventListener("click", removeCartItem);
   cartBox.getElementsByClassName("cartQuantity")[0].addEventListener("change", quantityChanged);
}


// Update total
function updateTotal() {
   var cartContent = document.getElementsByClassName("cartContent")[0];
   var cartBoxes = cartContent.getElementsByClassName("cartBox");
   var total = 0;

   // Setting cart quantity (amount of products)
   var productCount = cartBoxes.length;
   document.getElementsByClassName("quantity")[0].innerText = productCount;

   for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cartPrice")[0];
      var quantityElement = cartBox.getElementsByClassName("cartQuantity")[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
   }

   // If there is cent values...
   // total = Math.round(total * 100) / 100;
   
   document.getElementsByClassName("totalPrice")[0].innerText = "$" + total;
   
}

