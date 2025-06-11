document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hovered");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("hovered");
  });
});

// Add shadow to header on scroll
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

//------------------------ // SCROLL TO TOP // ------------------------//
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    document.getElementById("scroll-to-top").classList.add("show");
  } else {
    document.getElementById("scroll-to-top").classList.remove("show");
  }
};

// Add smooth scrolling to the "scroll to top" button
document
  .getElementById("scroll-to-top")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor link behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
