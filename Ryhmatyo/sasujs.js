// sidebar menu toggle

document.addEventListener("DOMContentLoaded", function () {
  const icon = document.querySelector(".primary-menu-item");
  const menu = document.querySelector(".secondary-menu");

  icon.addEventListener("click", function (event) {
    event.preventDefault();
    menu.classList.toggle("hidden");
  });
});

// aloita alusta nappi refresh page func
function refreshPage() {
  window.location.reload();
}

const secondMenuActive = document.querySelectorAll("anotherCo");

secondMenuActive.forEach((btn) => {
  btn.addEvenListener("click", (e) => {
    secondMenuActive.forEach(f => f.classList.remove('active'));
    e.target.classList.toggle('active');
  })
}
)