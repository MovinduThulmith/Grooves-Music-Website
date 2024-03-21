document.addEventListener("DOMContentLoaded", function () {

   // Retrieve cart data from local storage
   var cartDataJSON = localStorage.getItem("cartItems");
   var cartData = JSON.parse(cartDataJSON);

   // Check if cartData exists and it's an array
   if (Array.isArray(cartData)) {

      // Display cart items in the checkout page
      var cartItemsContainer = document.getElementById("cartContent");
      var totalPrice = 0;
      var totalQuantity = 0;

      cartData.forEach((item) => {
         var itemContainer = document.createElement("div");
         itemContainer.classList.add("cartBox");
         itemContainer.innerHTML = `
            <img src="${item.image}" alt="" class="cartImage"/>
            <div class="detailBox">
               <div class="cartProductTitle">${item.title}</div>
               <div class="cartPrice">$${item.price}</div>
            </div>
            <div class="productQuantity">${item.quantity}</div>
            `;
         cartItemsContainer.appendChild(itemContainer);

         totalPrice += item.price * item.quantity;
         totalQuantity += item.quantity;
      });

      // Display the amount of products
      var fullQuantity = document.getElementById("totalQuantity");
      fullQuantity.innerHTML = `<p class="subTitle">Item Amount</p><p>${totalQuantity}</p>`;

      // Display total price
      var totalPriceElement = document.getElementById("totalPrice");
      totalPriceElement.innerHTML = `<p class="subTitle">Total Price</p><p>$${totalPrice}</p>`;

      // Clear cart data from local storage after displaying it
      localStorage.removeItem("cartItems");

   } else {
      // Cart data not found or invalid, display a message or take appropriate action
      console.log("Cart data not found or invalid.");
   }

   // Submit Form
   var checkoutForm = document.getElementById("checkoutForm");
   checkoutForm.addEventListener("submit", validation);

});

// Input Validation
function validation(event) {
   event.preventDefault(); // Prevent form submission until all fields are validated

   var cardholderNameInput = document.getElementById("name");
   var cardNumberInput = document.getElementById("cardNumber");
   var cardMonthInput = document.getElementById("cardMonth");
   var cardYearInput = document.getElementById("cardYear");
   var cardCvnInput = document.getElementById("cardCVN");
   var phoneNumberInput = document.getElementById("phoneNumber");
   var emailInput = document.getElementById("email");
 
   var cardholderNameValue = cardholderNameInput.value;
   var cardNumberValue = cardNumberInput.value;
   var cardMonthValue = cardMonthInput.value;
   var cardYearValue = cardYearInput.value;
   var cardCvnValue = cardCvnInput.value;
   var phoneNumberValue = phoneNumberInput.value;
   var emailValue = emailInput.value;

   let isValid = true; // A flag to track overall form validity

   // Validate cardholder's name
   if (cardholderNameValue.trim() === "") {
      isValid = false;
      showErrorMessage("* Please enter the cardholder's name.", cardholderNameInput);
   } else {
      clearErrorMessage(cardholderNameInput);
   }

   // Validate card number
   if (!/^\d{16}$/.test(cardNumberValue)) {
      isValid = false;
      showErrorMessage("* Card number must be exactly 16 digits", cardNumberInput);
   } else {
      clearErrorMessage(cardNumberInput);
   }

   // Validate card expiry month
   if (!/^\d{1,2}$/.test(cardMonthValue) || parseInt(cardMonthValue) < 1 || parseInt(cardMonthValue) > 12) {
      isValid = false;
      showErrorMessage("* Invalid expiry month", cardMonthInput);
   } else {
      clearErrorMessage(cardMonthInput);
   }

   // Validate card expiry year (current year onwards)
   var currentYear = new Date().getFullYear();
   if (!/^\d{4}$/.test(cardYearValue) || parseInt(cardYearValue) < currentYear) {
      isValid = false;
      showErrorMessage("* Invalid expiry year.", cardYearInput);
   } else {
      clearErrorMessage(cardYearInput);
   }

   // Validate CVN
   if (!/^\d{3}$/.test(cardCvnValue)) {
      isValid = false;
      showErrorMessage("* CVN must be exactly 3 digits.", cardCvnInput);
   } else {
      clearErrorMessage(cardCvnInput);
   }

   // Validate phone number
   if (!/^\d{10}$/.test(phoneNumberValue)) {
      isValid = false;
      showErrorMessage("* Phone number must be exactly 10 digits", phoneNumberInput);
   } else {
      clearErrorMessage(phoneNumberInput);
   }

   // Validate email
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      isValid = false;
      showErrorMessage("* Please enter a valid email address.", emailInput);
   } else {
      clearErrorMessage(emailInput);
   }

   if (isValid) {
      alert("Checkout Successful");
      checkoutForm.submit();
   }

}

// Helper function to show the error message
function showErrorMessage(message, inputElement) {
   const errorElement = inputElement.nextElementSibling;
   errorElement.textContent = message;
}

// Helper function to clear the error message
function clearErrorMessage(inputElement) {
   const errorElement = inputElement.nextElementSibling;
   errorElement.textContent = "";
}

