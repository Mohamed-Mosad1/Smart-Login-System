var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var signUpBtn = document.getElementById("signUp");
var errorInput = document.querySelector(".errorInput");
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var loginBtn = document.querySelector("#loginBtn");
var signUpLink = document.querySelector("#signUpLink");
var signInLink = document.querySelector("#signInLink");
var logoutBtn = document.querySelector("#logoutBtn");
var userNameWelcome = localStorage.getItem("sessionUserName");

var userInfo = [];

if (localStorage.getItem("user") != null) {
  userInfo = JSON.parse(localStorage.getItem("user"));
}
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
var passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g;

function signUp() {
  var user = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };

  if (checkSignUpEmpty() == false) {
    errorInput.innerHTML = `input is required`;
    return false;
  }
  if (checkExistsEmail() == false) {
    errorInput.classList.replace("text-success", "text-danger");
    errorInput.innerHTML = `This email already exists`;
    clearLogUpForm();
  } else if (
    emailRegex.test(userEmail.value) &&
    passwordRegex.test(userPassword.value)
  ) {
    userInfo.push(user);
    localStorage.setItem("user", JSON.stringify(userInfo));
    errorInput.classList.replace("text-danger", "text-success");
    errorInput.innerHTML = `Success`;
    window.location.href = "./index.html";
  } else {
    errorInput.innerHTML = `***** invalid validate Email Or Password ***** <br>
    email example (mmmmmm@gmail.com) <br>
    password must be includes (uppercase letter, lowercase letter, special character, number, Min 8 char and Max 30 char)`;
    clearLogUpForm();
  }
}
if (signUpBtn) {
  signUpBtn.addEventListener("click", signUp);
}
function checkExistsEmail() {
  for (var i = 0; i < userInfo.length; i++) {
    if (userEmail.value.toLowerCase() == userInfo[i].email.toLowerCase()) {
      return false;
    }
  }
}

function checkSignUpEmpty() {
  if (
    userName.value == "" ||
    userEmail.value == "" ||
    userPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function checkSignInEmpty() {
  if (loginEmail.value == "" || loginPassword.value == "") {
    document.querySelector(".invalid").innerHTML = `All inputs is required`;
    return false;
  } else {
    return true;
  }
}
function clearLogUpForm() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
function clearLogInForm() {
  loginEmail.value = "";
  loginPassword.value = "";
}

function login() {
  if (!checkSignInEmpty()) {
    return false;
  }
  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
      userInfo[i].password.toLowerCase() == loginPassword.value.toLowerCase()
    ) {
      localStorage.setItem("sessionUserName", userInfo[i].name);
      window.location.href = "./home.html";
    } else {
      document.querySelector(
        ".invalid"
      ).innerHTML = `incorrect email or password`;
    }
  }
}
if (userNameWelcome) {
  document.getElementById("userLogin").innerHTML = "Welcome " + userNameWelcome;
}
if (loginBtn) {
  loginBtn.addEventListener("click", login);
}
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
function logout() {
  localStorage.removeItem("sessionUserName");
  window.location.href = "./index.html";
}
