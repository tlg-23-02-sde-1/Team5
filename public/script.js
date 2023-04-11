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

//Landing page product modals
let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});

document.getElementById('checkout').addEventListener("click", () => {
    console.log('Checkout')
})