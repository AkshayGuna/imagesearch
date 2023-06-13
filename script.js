const accessKey = "gR0od6PzEy2AYktxi10uBhzEPn4xv4caVUeldbOqsgI";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value;

    // Check if input field is empty
    if (inputData.trim() === "") {
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = await data.results;

    if (page === 1) {
        searchResult.innerHTML = ""
    };

    results.map((result) => {
        let imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        let imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        let image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        let textLink = document.createElement("a");
        textLink.href = result.links.html;
        textLink.target = "_blank";
        textLink.textContent = result.alt_description;

        imageLink.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(textLink);
        searchResult.appendChild(imageWrapper);
    });
    page = page + 1;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});