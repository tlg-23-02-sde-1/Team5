
//------------Nav Bar Background------------

const navbar = document.querySelector('nav');

window.onscroll = function() {
  if (window.pageYOffset > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
//------------------------------------------

let cart = document.getElementById('cart')
let add = document.getElementById('cartbtn')
let remove = document.getElementById('remove')

let cart = document.getElementById("cart");
let add = document.getElementById("cartbtn");
let remove = document.getElementById("remove");


let cartButtons = document.querySelectorAll(".cart");

async function addToCart(plantID) {
  try {
    const response = await fetch(`/cart/${plantID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Plant added to cart");
      closebox();
    } else {
      console.error("Failed to add product to cart");
    }
  } catch (error) {
    console.error(error.message);
  }
}

// For the trash-can button have to link it
async function removeFromCart(plantID) {
  try {
    const response = await fetch(`/cart/${plantID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Plant removed from cart");
    } else {
      console.error("Failed to remove product to cart");
    }
  } catch (error) {
    console.error(error.message);
  }
}

cartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let plantId = button.getAttribute("data-id");
    addToCart(plantId);
  });
});

// To open the cart on click
add.addEventListener("click", () => cart.classList.add("active"));

// To close the cart on click
remove.addEventListener("click", () => cart.classList.remove("active"));

function stepUp(button) {
  const input = button.parentNode.querySelector("input[type=number]");
  input.stepUp();
}

function stepDown(button) {
  const input = button.parentNode.querySelector("input[type=number]");
  input.stepDown();
}

//Landing page product modals
let previewContainer = document.querySelector(".products-preview");
let previewBox = previewContainer.querySelectorAll(".preview");

document.querySelectorAll(".products-container .product").forEach((product) => {
  product.onclick = () => {
    previewContainer.style.display = "flex";
    let name = product.getAttribute("data-name");
    previewBox.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (name == target) {
        preview.classList.add("active");
      }
    });
  };
});

function closebox() {
  previewBox.forEach((close) => {
    if (close.classList.contains("active")) {
      close.classList.remove("active");
      previewContainer.style.display = "none";
    }
  });
}

previewBox.forEach((close) => {
  close.querySelector(".fa-times").onclick = () => {
    close.classList.remove("active");
    previewContainer.style.display = "none";
  };
});

document.getElementById("checkout").addEventListener("click", () => {
  console.log("Checkout");
});
