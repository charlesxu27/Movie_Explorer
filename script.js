// Instantiate constants and global variables
const API_KEY = "2bc0bfedf2889bc7dfd1db360b7b6f27"

let page = 1
let searchTerm = ""

// Create DOM references

titleElement = document.querySelector("h1")
contentTitleElement = document.querySelector("#content-title")
movieGridElement = document.querySelector("#movies-grid")
submitButtonElement = document.querySelector("#submit-button")
closeSearchButtonElement = document.querySelector("#close-search-btn")
searchInputElement = document.querySelector("#search-input")
seeMoreButtonElement = document.querySelector("#load-more-movies-btn")
movieCardElements = document.querySelectorAll(".movie-card img")

// Create event listeners

submitButtonElement.addEventListener("click", (event) => {
    event.preventDefault()
    contentTitleElement.classList.add("hidden")  // clear header on new search query
    movieGridElement.innerHTML = ``  // clear existing results on new search query
    page = 1
    handleSearchSubmit(event, page)
})

searchInputElement.addEventListener("keydown", (event) => {
    contentTitleElement.classList.add("hidden")
    movieGridElement.innerHTML = ``  // clear existing results on new search query
    page = 1
    if (event.key === "Enter") {
        submitButtonElement.click() // trigger button click
    }
})

closeSearchButtonElement.addEventListener("click", (event) => {
    event.preventDefault()
    searchInputElement.value = ""
    contentTitleElement.classList.remove("hidden")
    page = 1
    loadMainPage(event, page)
})

seeMoreButtonElement.addEventListener("click", (event) => {
    page += 1
    console.log("*** calling handleSearchSubmit for Page: " + page)
    handleSearchSubmit(event, page)
})

movieCardElements.addEventListener("click", (event) => {
    console.log("Img was clicked")
})

// Main functions
async function getMovies(event, searchTerm, page) {
    console.log("*** Calling getMovies***")
    event.preventDefault() // override submit button behavior (refresh page)
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    console.log("API URL: " + url)
    const response = await fetch(url)
    const data = await response.json()
    console.log("*** Getting Data ***")
    console.log(data)
    return data
}


function displayMovies(data) {
    console.log("*** Calling displayMovies ***")
    data.results.forEach(movie => {
        if (movie.poster_path === null) {
            movieGridElement.innerHTML += `
            <div class="movie-card">
              <img class="movie-poster" src="./assets/placeholder_img.jpg" alt="placeholder image">
              <span class="movie-title">${movie.original_title}</span>
              <span class="movie-votes">${ratingToStars(movie.vote_average)}</span>
            </div>
            `
        } else {
        movieGridElement.innerHTML += `
        <div class="movie-card">
          <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}">
          <span class="movie-title">${movie.original_title}</span>
          <span class="movie-votes">${ratingToStars(movie.vote_average)}</span>
        </div>
        `
        }
    })
}


async function handleSearchSubmit(event, page) {
    console.log("*** Calling handleSearchSubmit ***")
    searchTerm = searchInputElement.value

    if (searchTerm === "") {
        alert("Please search for a movie.")
        loadMainPage(1)
        seeMoreButtonElement.classList.remove("hidden")  // reveal seeMoreButton after results load
        contentTitleElement.classList.remove("hidden")
        return;
    }

    const data = await getMovies(event, searchTerm, page)
    seeMoreButtonElement.classList.remove("hidden")  // reveal seeMoreButton after results load
    
    displayMovies(data)
    // searchInputElement.value = ""  // clear search bar after query
}


function ratingToStars(rating) {
    if (rating === null || rating == 0) {
        return "N/A"
    }
    result = ""
    rating = Math.ceil(rating/2)
    for (let i = 0; i < rating; i++) {
        result += "&#11088; "
    }
    return result
}

async function loadMainPage(event, page) {
    console.log("*** Calling loadMainPage ***")
    movieGridElement.innerHTML = ``
    url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    response = await fetch(url)
    data = await response.json()
    displayMovies(data)
    seeMoreButtonElement.classList.add("hidden")  // hide seeMoreButton on main page
}


window.onload = function() {
    searchInputElement.value = ""
    loadMainPage(1)
}