

// sidebar menu toggle

document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(".primary-menu-item");
  const menus = document.querySelectorAll(".secondary-menu");


  icons.forEach((icon, index) => {
  icon.addEventListener("click", function (event) {
    event.preventDefault();
    menus.forEach((menu => { 
      if (!menu.classList.contains("hidden") && menu !== menus[index]) {
        menu.classList.add("hidden");
      }
    }));
    menus[index].classList.toggle("hidden");
  });
});
  
});





// aloita alusta nappi refresh page func
function refreshPage() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}


//upload func & resize func//
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
let img = new Image();
let imageX = 100;
let imageY = 100;

// loading tshirt template on canvas

let TShirtImg = new Image();
TShirtImg.src = "imgs/t-shirt.png";
function loadTShirt() {
  canvas.width = TShirtImg.width;
  canvas.height = TShirtImg.height;
  c.drawImage(TShirtImg, 0, 0, canvas.width, canvas.height);
  if (img.src !== "") {
    c.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
};






// add event listener for file input change event

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];

  // filereader
  const reader = new FileReader();

  // defining the onload function
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Calculate the aspect ratio of the image
      const aspectRatio = img.width / img.height;
  
      // Define the maximum width and height of the image
      const maxWidth = 50;
      const maxHeight = 50;
  
      // Calculate the new width and height of the image
      let newWidth = maxWidth;
      let newHeight = newWidth / aspectRatio;
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }
  
      // Draw the image onto the canvas at the new size
      c.drawImage(img, 300, 200, newWidth, newHeight);
    };
    img.src = event.target.result;
  };

  // read the selected file using the FileReader instance
  reader.readAsDataURL(file);
});

// define the onload function for the image
TShirtImg.onload = function() {
  // set the canvas width and height to match the image
  canvas.width = TShirtImg.width;
  canvas.height = TShirtImg.height;



};

let text = "";
let dragging = false;
let dragOffsetX;
let dragOffsetY;
let isDragging = false;

// Add event listener to add text button
document.getElementById("addTextBtn").addEventListener("click", function() {
  // Get the text input value
  text = prompt("Lisää teksti:");

  // Draw the text on the canvas
  c.font = "30px poppins";
  c.fillStyle = "white";
  c.fillText(text, 430, 250);
});

// Add event listener to canvas for mousedown event

canvas.addEventListener("mousedown", function(e) {
  // Get the current mouse position
  const mouseX = e.clientX - canvas.offsetLeft;
  const mouseY = e.clientY - canvas.offsetTop;

  // Check if the mouse is within the bounds of the text object
  const textWidth = c.measureText(text).width;
  const textHeight = 30; // set the height to the font size for simplicity
  if (mouseX >= 430 && mouseX <= 430 + textWidth && mouseY >= 250 && mouseY <= 250 + textHeight) {
    // Calculate the drag offset values
    dragOffsetX = mouseX - 430;
    dragOffsetY = mouseY - 250;

    // Set the dragging flag
    dragging = true;

    // Set the cursor to the grabbing hand icon
    canvas.style.cursor = "grabbing";
  }
  
  // Check if the mouse is over the image
  if (mouseX >= imageX && mouseX <= imageX + img.width / 10 && mouseY >= imageY && mouseY <= imageY + img.height / 10) {
    // Set the dragging flag and update the drag offset values
    dragging = true;
    dragOffsetX = mouseX - imageX;
    dragOffsetY = mouseY - imageY;

    // Set the cursor to the grabbing hand icon
    canvas.style.cursor = "grabbing";
  }
});

// Add event listener to canvas for mouseup event
canvas.addEventListener("mouseup", function() {
  // Clear the dragging flags
  dragging = false;
  isDragging = false;

  // Set the cursor back to the default arrow icon
  canvas.style.cursor = "default";
});

// Add event listener to canvas for mousemove event
canvas.addEventListener("mousemove", function(e) {
  const mouseX = e.clientX - canvas.offsetLeft;
  const mouseY = e.clientY - canvas.offsetTop;
  if (mouseX >= imageX && mouseX <= imageX + img.width / 10 && mouseY >= imageY && mouseY <= imageY + img.height / 10) {
    // Set the cursor to the grabbing hand icon
    canvas.style.cursor = "grab";
  } else {
    // Reset the cursor to the default arrow icon
    canvas.style.cursor = "default";
  }
  if (dragging) {
    // Get the current mouse position
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    // Update the position of the text
    const textWidth = c.measureText(text).width;
    const textHeight = 30; // set the height to the font size for simplicity
    const newX = mouseX - dragOffsetX;
    const newY = mouseY - dragOffsetY;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(TShirtImg, 0, 0, canvas.width, canvas.height);
    c.font = "30px poppins";
    c.fillStyle = "white";
    c.fillText(text, newX, newY + textHeight);

    // Update the drag offset values
    dragOffsetX = mouseX - newX;
    dragOffsetY = mouseY - newY;
  } else if (isDragging) {
    // Get the current mouse position
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    // Update the position of the image
    imageX = mouseX - dragOffsetX;
    imageY = mouseY - dragOffsetY;

    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image and the text at the new position
    c.drawImage(TShirtImg, 0, 0, canvas.width, canvas.height);
    c.font = "30px poppins";
    c.fillStyle = "white";
    c.fillText(text, 430, 250);
    c.drawImage(img, imageX, imageY, img.width / 10, img.height / 10);
  }
});
