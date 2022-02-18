/*********************** BACKGROUND RECIPE **********************/
const icons = document.getElementsByClassName("icon-bg");

function randomIcon() {
  const ramdon_number = parseInt(Math.random() * icons.length);
  const ramdon_number2 = parseInt(Math.random() * icons.length);
  const ramdon_number3 = parseInt(Math.random() * icons.length);

  icons[ramdon_number].classList.add("hover-icon");
  icons[ramdon_number2].classList.add("hover-icon");
  icons[ramdon_number3].classList.add("hover-icon");

  setTimeout(() => {
    icons[ramdon_number].classList.remove("hover-icon");
    icons[ramdon_number2].classList.remove("hover-icon");
    icons[ramdon_number3].classList.remove("hover-icon");
  }, 1000);
}

setInterval(randomIcon, 200);

/*********************** RECIPE APP **********************/
const mealsCont = document.getElementById("meals");
const mealsSearched = document.getElementById("meals-search");
const favMeals = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const info = document.getElementById("info");
const home = document.getElementById("home");

getRandomMeal();
fetchFavMeals();
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  randomMeal = await resp.json();
  const respData = randomMeal.meals[0];
  console.log(respData);
  addMeal(respData, true);
}
async function getMealById(id) {
  const mealById = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await mealById.json();
  const data = respData.meals[0];
  return data;
}
async function getMealsBySearch(search) {
  const mealBySearch = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search
  );
  const respData = await mealBySearch.json();
  const data = respData.meals;
  showSearch(data, true);
}
function showSearch(mealsFound, random = false) {
  const meal = document.createElement("h5");
  const search = searchTerm.value;
  meal.innerHTML = "Search " + search.charAt(0).toUpperCase() + search.slice(1);
  mealsSearched.appendChild(meal);
  if (mealsFound === null || mealsFound === undefined) {
    const mealText = document.createElement("h6");
    const search = searchTerm.value;
    mealText.innerHTML =
      search.charAt(0).toUpperCase() + search.slice(1) + " not found";
    mealsSearched.appendChild(mealText);
  } else {
    mealsFound.forEach((mealData) => {
      const meal = document.createElement("div");
      meal.classList.add("meal");
      meal.innerHTML = `      
    <div class="meal-header btn-info2">
    ${
      random
        ? `
        <p class="ocultar">${mealData.idMeal}</p>
      <span class="random">${searchTerm.value}</span>`
        : ""
    }
        <img
          id="imgMeal"
          src="${mealData.strMealThumb}"
          alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
      <h4 class="btn-info3"><p class="ocultar">${mealData.idMeal}</p>${
        mealData.strMeal
      }</h4>
      <button class="fav-btn" id="favBtn">
        <i class="fa fa-heart"></i>
      </button>
    </div>`;

      const favBtn = meal.querySelector(".fav-btn");
      favBtn.addEventListener("click", () => {
        if (favBtn.classList.contains("fav")) {
          favBtn.classList.toggle("fav");
          removeMealFromLS(mealData.idMeal);
        } else {
          favBtn.classList.toggle("fav");
          addMealToLS(mealData.idMeal);
        }
        fetchFavMeals();
      });

      const btnInfo = meal.querySelector(".btn-info2");
      const btnInfo1 = meal.querySelector(".btn-info3");

      btnInfo.addEventListener("click", () => {
        addInfo(mealData);
      });
      btnInfo1.addEventListener("click", () => {
        addInfo(mealData);
      });

      mealsSearched.appendChild(meal);
    });
  }
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `      
      <div class="meal-header" id="btn-info">
      ${
        random
          ? `
          <p class="ocultar">${mealData.idMeal}</p>
        <span class="random">Random Recipe</span>`
          : ""
      }
          <img
            id="imgMeal"
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
          />
      </div>
      <div class="meal-body">
        <h4 id="btn-info1"><p class="ocultar">${mealData.idMeal}</p>${
    mealData.strMeal
  }</h4>
        <button class="fav-btn" id="favBtn">
          <i class="fa fa-heart"></i>
        </button>
      </div>`;

  const favBtn = meal.querySelector(".fav-btn");
  favBtn.addEventListener("click", () => {
    if (favBtn.classList.contains("fav")) {
      favBtn.classList.toggle("fav");
      removeMealFromLS(mealData.idMeal);
    } else {
      favBtn.classList.toggle("fav");
      addMealToLS(mealData.idMeal);
    }
    fetchFavMeals();
  });
  const btnInfo = meal.querySelector("#btn-info");
  const btnInfo1 = meal.querySelector("#btn-info1");

  btnInfo.addEventListener("click", () => {
    addInfo(mealData);
  });
  btnInfo1.addEventListener("click", () => {
    addInfo(mealData);
  });
  mealsCont.appendChild(meal);
}

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  if (mealIds.includes(mealId)) {
    console.log("Ya existe el item");
  } else {
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
  }
}

function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  favMeals.innerHTML = "";
  const mealIds = getMealsFromLS();
  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    meals.push(meal);
    printData(meal);
  }
}
function printData(mealData) {
  const mealContainer = document.createElement("li");
  mealContainer.innerHTML = `
      <div class="fav-div" id="btn-info4">
      <p class="ocultar">${mealData.idMeal}</p>
      <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
      />
      <span class="titleFav">${mealData.strMeal}</span>
      </div>
      <button class="btn-remove-fav clear"><i class="fa-solid fa-circle-xmark"></i></button>`;

  const btnRemove = mealContainer.querySelector(".clear");

  btnRemove.addEventListener("click", () => {
    removeMealFromLS(mealData.idMeal);
    fetchFavMeals();
  });

  const btnInfo = mealContainer.querySelector("#btn-info4");

  btnInfo.addEventListener("click", () => {
    addInfo(mealData);
  });

  favMeals.appendChild(mealContainer);
}

searchBtn.addEventListener("click", () => {
  mealsSearched.innerHTML = "";
  const search = searchTerm.value;
  if (search === "") {
    mealsSearched.classList.add("ocultar");
    getMealsBySearch(null);
  } else {
    mealsSearched.classList.remove("ocultar");
    const mealsSearch = getMealsBySearch(search);
  }
});
searchTerm.addEventListener("change", () => {
  mealsSearched.innerHTML = "";
  const search = searchTerm.value;
  if (search === "") {
    mealsSearched.classList.add("ocultar");
    getMealsBySearch(null);
  } else {
    mealsSearched.classList.remove("ocultar");
    const mealsSearch = getMealsBySearch(search);
  }
});

function addInfo(meal) {
  info.innerHTML = "";
  home.classList.add("ocultar");
  info.classList.remove("ocultar");
  const mealInfo = document.createElement("div");

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal["strIngredient" + i]) {
      ingredients.push(
        `${meal["strIngredient" + i]} / ${meal["strIngredient" + i]}`
      );
    } else {
      break;
    }
  }

  mealInfo.innerHTML = `
  <header class="info-header">
    <button class="return-btn" onclick="returnBtn()">
      <i class="fa-solid fa-angle-left"></i>
    </button>
    <h5 class="info-title">${meal.strMeal}</h5>
  </header>
  <div class="info-body">
    <img class="info-img"
    src="${meal.strMealThumb}"
    alt="${meal.strMeal}"
    />
    <h5>${meal.strMeal}</h5>
    <p class="info-text">
      ${meal.strInstructions}
    </p>
    <h5>Ingredients:</h5>
    <ul>
      ${ingredients
        .map(
          (ing) =>
            `<li>
          ${ing}
        </li>`
        )
        .join("")}
    </ul>
  </div>`;

  info.appendChild(mealInfo);
  console.log("Entro " + meal.idMeal);
}

function returnBtn() {
  info.classList.add("ocultar");
  home.classList.remove("ocultar");
}
