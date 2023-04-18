//Sets up a rotating review card-------------------------
const intervalTime = 8000; // 10 seconds
let currentReviewIndex = 0;

//Array of objects
const reviews = [
  {
    id: 1,
    name: "Susan Smith",
    img: "https://images2.imgbox.com/e0/57/qI5bbwvg_o.jpeg",
    text: " I visited this plant shop last weekend and was blown away by the variety of plants they had. The staff was very helpful and knowledgeable, and they helped me pick out some great plants for my home. Prices were a bit on the high side, but the quality of the plants was worth it.",
  },
  {
    id: 2,
    name: "Anna Johnson",
    img: "https://images2.imgbox.com/2e/6e/JAMvTZ56_o.jpeg",
    text: "This online plant shop is my go-to for ordering plants online. Their website is easy to use, and they have a great selection of plants to choose from. The plants always arrive well-packaged and healthy, and I've never been disappointed with a purchase from Plants a Plenty.",
  },
  {
    id: 3,
    name: "Peter Jones",
    img: "https://images2.imgbox.com/56/88/oJvFN3l5_o.jpeg",
    text: "I recently visited Plants a Plenty, and was impressed by the beautiful displays and wide selection of plants. The prices were reasonable for the quality of the plants, and the staff was friendly and helpful. I ended up purchasing a few plants for my apartment and they have been thriving.",
  },
  {
    id: 4,
    name: "Bill Anderson",
    img: "https://images2.imgbox.com/8b/1c/vwWNTsCd_o.jpeg",
    text: "Plants A Plenty has a great selection of plants. Prices are reasonable and they often have good deals on larger plants. I've purchased several fruit trees from them and have been very happy with the quality.",
  },
];

//access dynamic elements in a div
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

// //to pause the review on hover (not implemented yet)
// // Hover pause
// hoverBox.addEventListener("mouseover", () => {
//   isPaused = true;
// });

// // Resume autoplay on mouseout
// hoverBox.addEventListener("mouseout", () => {
//   isPaused = false;
// });

// const prevBtn = document.querySelector(".prev-btn");
// const nextBtn = document.querySelector(".next-btn");
// const randomBtn = document.querySelector(".random-btn");

//set starting array item
let currentItem = 0;

//load initial item after the document has been completely loaded
window.addEventListener("DOMContentLoaded", function () {
  showPerson(currentItem); //reuse showPerson
});

//show person based on item

function showPerson(person) {
  //access first item
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job; // from array key "job"
  info.textContent = item.text;
}

function showNextReview() {
  currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
  const review = reviews[currentReviewIndex];
  author.innerText = review.name;
  info.innerText = review.text;
  img.src = review.img;
}

let intervalId = setInterval(showNextReview, intervalTime);

//set up event listener with button

// nextBtn.addEventListener("click", function () {
//   currentItem++;
//   if (currentItem > reviews.length - 1) {
//     //selects last item in array then loops to 0
//     currentItem = 0;
//   }
//   showPerson(currentItem);
// });
// prevBtn.addEventListener("click", function () {
//   currentItem--;
//   if (currentItem < 0) {
//     currentItem = reviews.length - 1; //selects last item in array then loops to last item in array
//   }
//   showPerson(currentItem);
// });

// //randomize the reviews
// randomBtn.addEventListener("click", function () {
//   const randomNumber = getRandomNumber();
//   showPerson(randomNumber);
// });

// function getRandomNumber() {
//   return Math.floor(Math.random() * reviews.length);
// }
