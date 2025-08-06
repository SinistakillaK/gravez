
const loginForm = document.getElementById("loginForm");
const profileSection = document.getElementById("profileSection");
const authSection = document.getElementById("authSection");
const profilePic = document.getElementById("profilePic");
const displayName = document.getElementById("displayName");
const uploadPic = document.getElementById("uploadPic");

let pageViews = localStorage.getItem("pageViews") || 0;
let toggles = localStorage.getItem("profileToggles") || 0;
document.getElementById("pageViews").textContent = ++pageViews;
localStorage.setItem("pageViews", pageViews);

function logout() {
  localStorage.removeItem("sessionUser");
  location.reload();
}

function showProfile(user) {
  authSection.style.display = "none";
  profileSection.style.display = "block";
  displayName.textContent = `Welcome, ${user.username}`;
  if (user.picture) {
    profilePic.src = user.picture;
  }
}

const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
if (sessionUser) {
  showProfile(sessionUser);
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username && password) {
    const user = { username, picture: null };
    localStorage.setItem("sessionUser", JSON.stringify(user));
    showProfile(user);
  } else {
    alert("Please enter valid credentials.");
  }
});

uploadPic.addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function () {
    profilePic.src = reader.result;
    const user = JSON.parse(localStorage.getItem("sessionUser"));
    user.picture = reader.result;
    localStorage.setItem("sessionUser", JSON.stringify(user));
  };
  reader.readAsDataURL(e.target.files[0]);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && profileSection.style.display === "block") {
    toggles++;
    localStorage.setItem("profileToggles", toggles);
    document.getElementById("toggles").textContent = toggles;
  }
});
document.getElementById("toggles").textContent = toggles;
