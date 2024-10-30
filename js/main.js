/*  Side Bar */

const hamburgerMenu = document.getElementById("hamburgerMenu");
const sideBar = document.getElementById("sideBar");
hamburgerMenu.addEventListener("click", function () {
  if (hamburgerMenu.classList.contains("fa-x")) {
    hamburgerMenu.classList.remove("fa-x");
    sideBar.style.transform = "translateX(-75%)";
  } else {
    hamburgerMenu.classList.add("fa-x");
    sideBar.style.transform = "translateX(0)";
  }
});
/*  End Side Bar */

/* Main Page */
const mainContainer = document.getElementById("mainContainer");

async function mainPage() {
  const url = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const data = await url.json();
  const meals = data.meals;
  let temp = "";
  for (let i = 0; i < meals.length; i++) {
    temp += `<div
    class="meal col-md-3   cursor-pointer"
  >
  <div class = "align-items-center overflow-hidden position-relative rounded-3">
    <img class="w-100" src="${meals[i].strMealThumb}" alt="" />
    <div
      class="white__layer bg-white opacity-75 w-100 h-100 position-absolute px-2 d-flex align-items-center"
    >
      <h2 class="meal__title fw-semibold text-black">${meals[i].strMeal}</h2>
    </div>
    </div>
  </div>`;
  }
  mainContainer.innerHTML = temp;
  console.log(data);
}
mainPage();

/* End Main Page */

/* Contact */
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const ageInput = document.getElementById("ageInput");
const passwordInput = document.getElementById("passwordInput");
const repasswordInput = document.getElementById("repasswordInput");
const nameRegex = /^[A-Za-z]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+20|20)?(10|11|12|15)\d{8}$/;
const ageRegex = /^(?:[5-9]|[1-9]\d|100)$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const nameAlert = document.getElementById("nameAlert");
const emailAlert = document.getElementById("emailAlert");
const phoneAlert = document.getElementById("phoneAlert");
const ageAlert = document.getElementById("ageAlert");
const passwordAlert = document.getElementById("passwordAlert");
const repasswordAlert = document.getElementById("repasswordAlert");
const submitButton = document.getElementById("submitButton");

function formValidation(regexCode, input, invalidAlert) {
  if (regexCode.test(input.value) == true && input.value != "") {
    invalidAlert.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    invalidAlert.classList.remove("d-none");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function repasswordValidation() {
  if (repasswordInput.value == passwordInput.value) {
    repasswordAlert.classList.add("d-none");
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
    return true;
  } else {
    repasswordAlert.classList.remove("d-none");
    repasswordInput.classList.remove("is-valid");
    repasswordInput.classList.add("is-invalid");
    return false;
  }
}

function updateButtonState() {
  const isFormValid =
    formValidation(nameRegex, nameInput, nameAlert) &&
    formValidation(emailRegex, emailInput, emailAlert) &&
    formValidation(phoneRegex, phoneInput, phoneAlert) &&
    formValidation(ageRegex, ageInput, ageAlert) &&
    formValidation(passwordRegex, passwordInput, passwordAlert) &&
    repasswordValidation();

  if (isFormValid) {
    submitButton.classList.remove("disabled");
  } else {
    submitButton.classList.add("disabled");
  }
}

function resetForm() {
  // Reset form fields
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  ageInput.value = "";
  passwordInput.value = "";
  repasswordInput.value = "";

  // Reset alerts
  nameAlert.classList.add("d-none");
  emailAlert.classList.add("d-none");
  phoneAlert.classList.add("d-none");
  ageAlert.classList.add("d-none");
  passwordAlert.classList.add("d-none");
  repasswordAlert.classList.add("d-none");
}

nameInput.addEventListener("change", function () {
  formValidation(nameRegex, nameInput, nameAlert);
  updateButtonState();
});

emailInput.addEventListener("change", function () {
  formValidation(emailRegex, emailInput, emailAlert);
  updateButtonState();
});

phoneInput.addEventListener("change", function () {
  formValidation(phoneRegex, phoneInput, phoneAlert);
  updateButtonState();
});

ageInput.addEventListener("change", function () {
  formValidation(ageRegex, ageInput, ageAlert);
  updateButtonState();
});

passwordInput.addEventListener("change", function () {
  formValidation(passwordRegex, passwordInput, passwordAlert);
  updateButtonState();
});

repasswordInput.addEventListener("change", function () {
  repasswordValidation();
  updateButtonState();
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission for this example
  submitContact();
});

// Initialize the form on page load
updateButtonState();
/* End Contact */

/* Categories */
const categoryContainer = document.getElementById("categoryContainer");
async function categoriesDisplay() {
  const url = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await url.json();
  const categoryList = data.categories;
  let temp = "";

  for (let i = 0; i < data.categories.length; i++) {
    const description = categoryList[i].strCategoryDescription;
    const truncatedDescription = truncateAfterWords(description, 20);
    const categoryName = categoryList[i].strCategory;
    temp += ` <div
      class="meal col-md-3 "
    >
    <div class="align-items-center overflow-hidden position-relative rounded-3 cursor-pointer" onclick="getCategoryItems('${categoryName}')">
    <img class="w-100" src="${categoryList[i].strCategoryThumb}" alt="" />
      <div
        class="white__layer bg-white opacity-75 w-100 h-100 position-absolute p-2 text-center"
      >
        <h2 class="meal__category fw-medium text-black">${categoryName}</h2>
        <p class="meal__category text-black">${truncatedDescription}</p>
      </div>
      </div>
    </div>`;
  }

  categoryContainer.innerHTML = temp;

  function truncateAfterWords(text, numWords) {
    const words = text.split(" ");
    if (words.length > numWords) {
      const truncatedWords = words.slice(0, numWords);
      return truncatedWords.join(" ") + "...";
    }
    return text;
  }
}
categoriesDisplay();
async function getCategoryItems(categoryName) {
  const url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  const data = await url.json();
  const meals = data.meals;
  console.log(data);

  let temp = "";
  for (let i = 0; i < meals.length; i++) {
    temp += `<div
    class="meal col-md-3   cursor-pointer"
  >
  <div class = "align-items-center overflow-hidden position-relative rounded-3">
    <img class="w-100" src="${meals[i].strMealThumb}" alt="" />
    <div
      class="white__layer bg-white opacity-75 w-100 h-100 position-absolute px-2 d-flex align-items-center"
    >
      <h2 class="meal__title fw-semibold text-black">${meals[i].strMeal}</h2>
    </div>
    </div>
  </div>`;
  }
  categoryContainer.innerHTML = temp;
}
/* End Categories */

/* Areas */
const areasContainer = document.getElementById("areasContainer");

async function areasDisplay() {
  const url = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a");
  const data = await url.json();
  const areaList = data.meals;
  let temp = "";
  for (let i = 0; i < areaList.length; i++) {
    const areaName = areaList[i].strArea;
    temp += `<div
    class="area col-lg-3 justify-content-center d-flex "
    onclick="getAreaItems('${areaName}')"
  >
  <div class = "text-decoration-none d-flex flex-column align-items-center cursor-pointer w-50">
    <i class="fa-solid fa-house-laptop fa-4x text-light"></i>
    <h3 class="text-light">${areaName}</h3>
    </div>
  </div>`;
  }
  areasContainer.innerHTML = temp;
}
areasDisplay();

async function getAreaItems(areaName) {
  const url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  const data = await url.json();
  const meals = data.meals;
  console.log(data);

  let temp = "";
  for (let i = 0; i < meals.length; i++) {
    temp += `<div
    class="meal col-md-3   cursor-pointer"
  >
  <div class = "align-items-center overflow-hidden position-relative rounded-3">
    <img class="w-100" src="${meals[i].strMealThumb}" alt="" />
    <div
      class="white__layer bg-white opacity-75 w-100 h-100 position-absolute px-2 d-flex align-items-center"
    >
      <h2 class="meal__title fw-semibold text-black">${meals[i].strMeal}</h2>
    </div>
    </div>
  </div>`;
  }
  areasContainer.innerHTML = temp;
}

/* End Areas */
