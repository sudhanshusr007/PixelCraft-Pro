const accessKey = "Zb6S6Me3HlYQaKuV9xhNOYQgUjXaXILW1IQG31bLRx8";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("searchInput");
const searchResults = document.querySelector(".searchResults");
const showMore = document.getElementById("showMore");

var inputData = "";
var page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("Result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;
    imgWrapper.appendChild(image);
    imgWrapper.appendChild(imgLink);
    searchResults.appendChild(imgWrapper);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (e) => {
  searchImages();
});
