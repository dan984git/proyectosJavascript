const menuBtn = document.querySelector(".menu-btn");
const aside = document.querySelector("#aside");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    aside.classList.toggle("desplegar");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    aside.classList.toggle("desplegar");
    menuOpen = false;
  }
});
