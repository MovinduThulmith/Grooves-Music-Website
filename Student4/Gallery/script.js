const filterContainer = document.querySelector(".gallery-filter"),
 galleryItems = document.querySelectorAll(".gallery-item");

 filterContainer.addEventListener("click", (event) =>{
   if(event.target.classList.contains("filter-item")){
   	 // deactivate existing active 'filter-item'
   	 filterContainer.querySelector(".active").classList.remove("active");
   	 // activate new 'filter-item'
   	 event.target.classList.add("active");
   	 const filterValue = event.target.getAttribute("data-filter");
   	 galleryItems.forEach((item) =>{
       if(item.classList.contains(filterValue) || filterValue === 'all'){
       	item.classList.remove("hide");
       	 item.classList.add("show");
       }
       else{
       	item.classList.remove("show");
       	item.classList.add("hide");
       }
   	 });
   }
 });

 

// Get a reference to the color dropdown
const colorDropdown = document.getElementById('colorSelect');

// Add an event listener to the dropdown to respond to changes
colorDropdown.addEventListener('change', function() {
  const selectedColor = colorDropdown.value;

  // Check the selected option and apply the corresponding background color to the gallery section and h1
  const gallerySection = document.querySelector('.gallery');
  const h1Element = document.querySelector('h1');
  switch (selectedColor) {
    case 'Default':
      gallerySection.style.background = '#28464B';
      h1Element.style.background = '#28464B';
      break;
    case 'Casal':
      gallerySection.style.background = '#326771';
      h1Element.style.background = '#326771';
      break;
    case 'Jelly Bean':
      gallerySection.style.background = '#2C8C99';
      h1Element.style.background = '#2C8C99';
      break;
    case 'random':
      // Generate a random color using RGB values
      const randomColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
      gallerySection.style.background = randomColor;
      h1Element.style.background = randomColor;
      break;
    default:
      gallerySection.style.background = '#28464B'; // Default background color
      h1Element.style.background = '#28464B'; // Default background color for h1
      break;
  }
});

// Helper function to generate a random number between 0 and 255
function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}


const fontSizeSelect = document.getElementById("fontSizeSelect");
const imageDescriptions = document.querySelectorAll(".image-description");

    fontSizeSelect.addEventListener("change", () => {
        const selectedFontSize = fontSizeSelect.value;
        imageDescriptions.forEach(description => {
            description.style.fontSize = selectedFontSize;
        });

        h1Element.style.fontSize = selectedFontSize;
    });
