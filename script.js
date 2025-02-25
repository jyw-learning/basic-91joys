const btn = document.querySelector(".btn");
const card = document.querySelector(".card");

btn.addEventListener("click", () => {
  card.classList.toggle("flip");
});
