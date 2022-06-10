// Instantiate constants and global variables
const API_KEY = "2bc0bfedf2889bc7dfd1db360b7b6f27"

let page = 1
let searchTerm = ""

// Create DOM references

const bodyElement = document.body
const titleElement = document.querySelector("h1")
const contentTitleElement = document.querySelector("#content-title")
const movieGridElement = document.querySelector("#movies-grid")
const submitButtonElement = document.querySelector("#submit-button")
const closeSearchButtonElement = document.querySelector("#close-search-btn")
const searchInputElement = document.querySelector("#search-input")
const seeMoreButtonElement = document.querySelector("#load-more-movies-btn")
const movieCardElements = document.querySelectorAll("movie-card")


// Create event listeners

submitButtonElement.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("Submit Button Registered")
    contentTitleElement.classList.add("hidden")  // clear header on new search query
    movieGridElement.innerHTML = ``  // clear existing results on new search query
    page = 1
    handleSearchSubmit(event, page)
})

searchInputElement.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        console.log("Enter Key Registered")
        contentTitleElement.classList.add("hidden")
        movieGridElement.innerHTML = ``  // clear existing results on new search query
        page = 1
        handleSearchSubmit(event, page)
    }
})

closeSearchButtonElement.addEventListener("click", (event) => {
    console.log("Close Search Registered")
    event.preventDefault()
    searchInputElement.value = ""
    contentTitleElement.classList.remove("hidden")
    page = 1
    loadMainPage(event, page)
})

seeMoreButtonElement.addEventListener("click", (event) => {
    console.log("See More Button Registered")
    page += 1
    console.log("*** calling handleSearchSubmit for Page: " + page)
    handleSearchSubmit(event, page)
})

// why doesn't this work
// movieCardElements.forEach(card => {
//     card.addEventListener("click", () => {
//         console.log("Clicking movie card")
//     })
// })


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
            <div class="movie-card" onclick="showPopUp(${movie.id})">
              <img class="movie-poster" src="./assets/placeholder_img.jpg" alt="placeholder image">
              <span class="movie-title">${movie.original_title}</span>
              <span class="movie-votes">${ratingToStars(movie.vote_average)}</span>
            </div>
            `
        } else {
        movieGridElement.innerHTML += `
        <div class="movie-card" onclick="showPopUp(${movie.id})">
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
        page = 1
        loadMainPage(page)
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


async function fetchMovieDetails(movie_id) {
    console.log(`*** Calling fetchMovieDetails for: ${movie_id}***`)
    url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    response = await fetch(url)
    data = await response.json()
    console.log(data)
    return data
}

async function displayMovieDetails(data) {
    console.log(`*** Calling displayMovieDetails`)
    // PopUp Tutorial: https://www.youtube.com/watch?v=iE_6pQ3RlZU
    bodyElement.innerHTML += `
    <div class="pop-up" id="pop-up-div">
      <div class="overlay"></div>
      <div class="content">
        <div id="close-pop-up-btn" onclick="togglePopUp()">&times;</div>
        <h3>${data.original_title}</h3>
        <img src="https://image.tmdb.org/t/p/w500${data.backdrop_path}">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </div>
    </div>
    `
}

// do I need async here?
async function showPopUp(movie_id) {
    data = await fetchMovieDetails(movie_id)
    displayMovieDetails(data)
}


window.onload = function() {
    page = 1
    loadMainPage(page);
}
