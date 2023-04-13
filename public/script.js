//------------Nav Bar Background------------

const navbar = document.querySelector("nav");

window.onscroll = function () {
  if (window.pageYOffset > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};
//------------------------------------------

let cart = document.getElementById("cart");
let add = document.getElementById("cartbtn");
let remove = document.getElementById("remove");

let cartButtons = document.querySelectorAll(".cart");
let buyNowButton = document.querySelectorAll(".buy");
let removeButton = document.querySelector('.remove-item');

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

      /*       const cartResponse = await fetch('/cart')
      const cartItems = await cartResponse.json()

      updateSideCart(cartItems); */

      closebox();
      location.reload();
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
      location.reload();
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

// removeButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();
//     let plantId = button.getAttribute("data-id");
//     removeFromCart(plantId);
//   });
// });

removeButton.addEventListener("click", (e) => {
  e.preventDefault();
  let plantId = removeButton.getAttribute("data-id");
  removeFromCart(plantId);
});

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
add.addEventListener("click", () => cart.classList.add("active"));

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

/* function updateSideCart(cartItems) {
  // Clear the existing sidecart content
  const sidecart = document.querySelector(".sidecart .products");
  sidecart.innerHTML = "";

  // Render the updated cart items
  cartItems.forEach((item) => {
    const cartItemHtml = `
      <div class="product">
        <img src="${item.plant.image}" alt="${item.plant.name}" />
        <div class="product-info">
          <h4>${item.plant.name}</h4>
          <p>Price: $ ${item.plant.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
      </div>
    `;
    sidecart.innerHTML += cartItemHtml;
  });
} */

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

//increment the qty
async function incrementItem(plantID) {
  try {
    const response = await fetch(`/cart/${plantID}/increment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Item quantity incremented");
      location.reload();
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
      location.reload();
    } else {
      console.error("Failed to decrement item quantity");
    }
  } catch (error) {
    console.error(error.message);
  }
}

previewBox.forEach((close) => {
  close.querySelector(".fa-times").onclick = () => {
    close.classList.remove("active");
    previewContainer.style.display = "none";
  };
});

document.getElementById("checkout").addEventListener("click", async () => {
  try {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if(response.ok) {
      const url = await response.json()
      window.location.href = url.url;
    }
    else{
      console.error('Failed to create checkout session')
    }
  } catch (error) {
    console.error(error.message);
  }
  console.log("Checkout");
});
