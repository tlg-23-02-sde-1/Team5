let cart = document.getElementById('cart')
let add = document.getElementById('cartbtn')
let remove = document.getElementById('remove')

// To open the cart on click
add.addEventListener('click', () => cart.classList.add("active"))

// To close the cart on click
remove.addEventListener('click', () => cart.classList.remove("active"))

function stepUp(button) {
    const input = button.parentNode.querySelector('input[type=number]');
    input.stepUp();
  }
  
function stepDown(button) {
    const input = button.parentNode.querySelector('input[type=number]');
    input.stepDown();
}