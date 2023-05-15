//------------Nav Bar Background------------

const navbar = document.querySelector("nav");

window.onscroll = function () {
  if (window.pageYOffset > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};



//----------Toggle responsive--------------
const toggleBtn = document.querySelector('.toggle-btn');
console.log(toggleBtn); // Add this line to check if toggleBtn is null
const toggleBtnIcon = document.querySelector('.toggle-btn i');
console.log(toggleBtnIcon); // Add this line to check if toggleBtnIcon is null
const dropDownMenu = document.querySelector('.dropdown_menu');
console.log(dropDownMenu); // Add this line to check if dropDownMenu is null

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen
  ? 'fa-solid fa-xmark'
  : 'fa-solid fa-bars';
}

function closeDropDownMenu() {
  dropDownMenu.classList.remove('open');
}


window.addEventListener('resize', function () {
  if (dropDownMenu.classList.contains('open') && window.innerWidth > 768) {
    closeDropDownMenu();
  }})



//------------------------------------------

let cart = document.getElementById("cart");
let add = document.getElementById("cartbtn");
let remove = document.getElementById("remove");
let cartButtons = document.querySelectorAll(".cart");
let buyNowButton = document.querySelectorAll(".buy");
let removeButton = document.querySelector(".remove-item");

async function fetchPlantDetails(plantID) {
  try {
    const response = await fetch(`/plants/${plantID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const plantData = await response.json();
      return plantData;
    } else {
      console.error("Failed to fetch plant details");
      return null;
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function fetchCart() {
  try {
    const response = await fetch("/cart", {
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const cartData = await response.json();

      // Fetch plant details for each cart item
      const plantDetailsPromises = cartData.map(async (item) => {
        const plantResponse = await fetch(`/plants/${item.plant}`);
        const plant = await plantResponse.json();
        return {
          ...item,
          plant,
        };
      });

      // Wait for all plant details to be fetched
      const cartDataWithDetails = await Promise.all(plantDetailsPromises);
      updateCartUI(cartDataWithDetails);
    } else {
      console.error("Failed to fetch cart data");
    }
  } catch (error) {
    console.error(error.message);
  }
}

function updateCartUI(cartData) {
  const cartContentElement = document.querySelector(".cart-content");
  cartContentElement.innerHTML = "";

  let totalQuantity = 0;
  let subtotal = 0;

  cartData.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("products");

    productDiv.innerHTML = `
      <img src="${item.plant.image}" alt="${item.plant.name}" />
      <div class="details">
        <h2>${item.plant.name}</h2>
        <h4>Price: $${item.plant.price}</h4>
        <div class="quantity-and-button">
          <button class="btn btn-link px-2" data-id="${item.plant._id}" onclick="stepDown(this)">
            <i class="fas fa-minus"></i>
          </button>
          <h4>Qty:</h4>
          <input type="number" value="${item.quantity}" min="1" name="quantity" readonly />
          <button class="btn btn-link px-2" data-id="${item.plant._id}" onclick="stepUp(this)">
            <i class="fas fa-plus"></i>
          </button>
          <button class="remove-item" onclick="removeFromCart('${item.plant._id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <h4>Total: $${item.plant.price * item.quantity}</h4>
      </div>
    `;
    cartContentElement.appendChild(productDiv);

    totalQuantity += item.quantity;
    subtotal += item.plant.price * item.quantity;
  });

  const subtotalElement = document.querySelector(".subtotal");
  const checkout = document.querySelector('#checkout');

  if (cartData.length === 0) {
    const emptyCartMessage = document.createElement("div");
    emptyCartMessage.classList.add("cart-empty");
    emptyCartMessage.innerHTML = "<h2>Your cart is empty</h2>";
    cartContentElement.appendChild(emptyCartMessage);
    subtotalElement.style.display = "none";
    checkout.style.display = "none";
  } else {
    subtotalElement.style.display = "block";
    subtotalElement.innerHTML = `<h2>Cart Subtotal: $${subtotal.toFixed(2)}</h2>`;
    checkout.style.display = "block";
  }

  // update the cart-notification total displayed
  const carttotalElement = document.querySelector('.cart-notification');
  carttotalElement.setAttribute('data-product-count', totalQuantity);
}

// Sends a post request for the item to be added to the user's cart
// Once you get a good response fetch the cart and grab the items and update the SideCart with the item.
async function addToCart(plantID) {
  try {
    const response = await fetch(`/cart/${plantID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Plant added to cart");
      closebox();
      await fetchCart();
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
      await fetchCart();
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

if (removeButton) {
  removeButton.addEventListener("click", (e) => {
    e.preventDefault();
    let plantId = removeButton.getAttribute("data-id");
    removeFromCart(plantId);
  });
}

async function buyNow(plantID) {
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

buyNowButton.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    let plantID = button.getAttribute("data-id");
    await buyNow(plantID);

    try {
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const url = await response.json();
        window.location.href = url.url;
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error(error.message);
    }
    console.log("Checkout");
  });
});

// To open the cart on click
add.addEventListener("click", async () => {
  await fetchCart(); // Fetch the latest cart data before opening the cart
  cart.classList.add("active");
});

// To close the cart on click
remove.addEventListener("click", () => cart.classList.remove("active"));

function stepUp(button) {
  const input = button.parentNode.querySelector("input[type=number]");
  const plantId = button.getAttribute("data-id"); // new code
  input.stepUp();
  incrementItem(plantId); // new code
}

function stepDown(button) {
  const input = button.parentNode.querySelector("input[type=number]");
  const plantId = button.getAttribute("data-id"); // new
  input.stepDown();
  decrementItem(plantId); // new
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

//increment the qty
async function incrementItem(plantID) {
  try {
    const response = await fetch(`/cart/${plantID}/increment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Item quantity incremented");
      await fetchCart();
    } else {
      console.error("Failed to increment item quantity");
    }
  } catch (error) {
    console.error(error.message);
  }
}

//decrement the qty
async function decrementItem(plantID) {
  try {
    const response = await fetch(`/cart/${plantID}/decrement`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Item quantity decremented");
      await fetchCart();
    } else {
      console.error("Failed to decrement item quantity");
    }
  } catch (error) {
    console.error(error.message);
  }
}

document.getElementById("checkout").addEventListener("click", async () => {
  try {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const url = await response.json();
      window.location.href = url.url;
    } else {
      console.error("Failed to create checkout session");
    }
  } catch (error) {
    console.error(error.message);
  }
  console.log("Checkout");
});

socket.on("cartUpdated", (cartData) => {
  updateCartUI(cartData);
});