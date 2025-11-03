const card = document.querySelector(".card");
const img = document.querySelector("#animal-image");
const buttons = document.querySelector(".buttons");
const heart = document.getElementById("heart");
const dislike = document.getElementById("dislike");
let cats = JSON.parse(localStorage.getItem("cats")) || [];
let container = document.querySelector(".container");
let fav = document.querySelector("#fav");

async function getcat() {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    img.src = data[0].url;
  } catch {
    console.error("error");
  }
}

getcat();
heart.addEventListener("click", () => {
  cats.push(img.src);
  localStorage.setItem("cats", JSON.stringify(cats));
  getcat();
})
dislike.addEventListener("click", getcat);

function getLikedAnimals(){
  cats = JSON.parse(localStorage.getItem("cats")) || [];
  let catimg;
  cats.forEach(cat => {
    catimg = document.createElement("img");
    catimg.src = cat;
    container.append(catimg);
  });
}
getLikedAnimals();
 container.style.display = "none";
fav.addEventListener("click",() => {
  let h1 = document.createElement("h1");
  h1.innerText = "My Favourites";
  h1.style.gridColumn = "1 / -1";
  container.prepend(h1);
  card.style.display = "none";
  container.style.display = "grid";
})