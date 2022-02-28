const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav__link");

hamburger.addEventListener("click", () => {
  navLink.classList.toggle("hide");
});

/////////////////////////////////////////

const courses = [];
const cart = [];

class Course {
  constructor(object) {
    this.kursnummer = object.kursnummer;
    this.kurstitel = object.kurstitel;
    this.kursbeskrivning = object.kursbeskrivning;
    this.kurslängd = object.kurslängd;
    this.kurspris = object.kurspris;
    this.kursbild = object.kursbild;
  }
}

fetch("courses.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const course = new Course(data[i]);
      courses.push(course);
    }
    showCourses();
  });

function showCourses() {
  const courseContainer = document.getElementById("course-container");
  courseContainer.innerHTML = "";
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    const div1 = document.createElement("div");
    div1.classList.add("course");

    const img = document.createElement("img");
    img.src = course.kursbild;

    const div2 = document.createElement("div");
    div2.classList.add("title");
    div2.innerText = course.kurstitel;

    const pDetails = document.createElement("p");
    pDetails.classList.add("details");
    pDetails.innerText = course.kursbeskrivning;

    const pLength = document.createElement("p");
    pLength.classList.add("length");
    pLength.innerText = course.kurslängd;

    const price = document.createElement("p");
    price.classList.add("price");
    price.innerText = course.kurspris;

    const btn = document.createElement("a");
    btn.classList.add("add-btn");
    btn.onclick = function () {
      addCourseToCart(course.kursnummer);
    };
    //Den här raden gör samma sak som 66-67
    // btn.setAttribute("onclick", `addCourseToCart(${course.kursnummer})`);
    btn.innerText = "Lägg till";

    div1.appendChild(img);
    div1.appendChild(div2);
    div2.appendChild(pDetails);
    div2.appendChild(pLength);
    div2.appendChild(price);
    div2.appendChild(btn);
    courseContainer.appendChild(div1);
  }
}

function showCart() {
  const cart = document.getElementById("shopping-menu");
  if (cart.style.display == "block") {
    cart.style.display = "none";
  } else {
    cart.style.display = "block";
  }
}

function addCourseToCart(nr) {
  if (!cart.includes(nr)) {
    cart.push(nr);
    const shoppingList = document.getElementById("shoppinglist");
    let currentCourse = courses.find((object) => object.kursnummer === nr);
    const li = document.createElement("li");
    li.setAttribute("id", `${nr}`);

    const div = document.createElement("div");

    const pDetails = document.createElement("p");
    pDetails.innerText = currentCourse.kurstitel;

    const price = document.createElement("p");
    price.innerText = `${currentCourse.kurspris} kr`;

    const btn = document.createElement("button");
    btn.classList.add("remove");
    btn.innerText = "Ta bort";

    btn.setAttribute("onclick", `removeCourse(${nr})`);
    li.appendChild(div);
    div.appendChild(pDetails);
    div.appendChild(price);
    li.appendChild(btn);
    shoppingList.appendChild(li);
  } else {
    window.alert("Kursen finns i din varukorg");
  }
}

function removeCourse(nr) {
  const cartList = document.getElementById("shoppinglist");
  let li = document.getElementById(`${nr}`);
  cartList.removeChild(li);
  //find- hittar element som uppnår ett villkor.
  const elementRemove = cart.find((element) => element.kursnummer === nr);
  //splice raderar från ett index man anger och antal som man vill ta bort. Om man vill ta bort en specifik index
  //så hittar man en indexet på det man vill ta bort sen skriver 1.
  cart.splice(cart.indexOf(elementRemove), 1);
}

//Slides
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

//kod för slides +
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//kod för autoslide

// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(showSlides, 2000); // byta bild  efter 2 sekunder
// }
