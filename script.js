// --- Instantiate constants and global variables ---

const API_KEY = "2bc0bfedf2889bc7dfd1db360b7b6f27"
// TODO: two variables for pages (one for home and one for search)
let page = 1
let searchTerm = ""

// --- Create DOM references ---

const bodyElement = document.body
const titleElement = document.querySelector("h1")
const contentTitleElement = document.querySelector("#content-title")
const movieGridElement = document.querySelector("#movies-grid")
const submitButtonElement = document.querySelector("#submit-button")
const closeSearchButtonElement = document.querySelector("#close-search-btn")
const searchInputElement = document.querySelector("#search-input")
const seeMoreButtonElement = document.querySelector("#load-more-movies-btn")
const movieCardElements = document.querySelectorAll("movie-card")
const searchFormElement = document.querySelector("#search-form")

// --- Create event listeners ---

searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("Submit Button Registered")
    contentTitleElement.classList.add("hidden")  // clear header on new search query
    movieGridElement.innerHTML = ``  // clear existing results on new search query
    page = 1
    handleSearchSubmit(event, page)
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

// --- Main functions ---


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
    console.log(111, searchTerm)

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
}


function ratingToStars(rating) {
    if (rating === null || rating == 0) {
        return "&#10068;"
    }
    let result = ""
    let stars = Math.ceil(rating / 2)
    for (let i = 0; i < stars; i++) {
        result += "&#11088; "
    }
    return result + ` (${rating}/10)`
}


async function loadMainPage(event, page) {
    console.log("*** Calling loadMainPage ***")
    movieGridElement.innerHTML = ``
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    displayMovies(data)
    seeMoreButtonElement.classList.add("hidden")  // hide seeMoreButton on main page
}


async function fetchMovieDetails(movie_id) {
    console.log(`*** Calling fetchMovieDetails for: ${movie_id} ***`)
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
}


async function fetchMovieTrailer(movie_id) {
    console.log(`*** Calling fetchMovieTrailer for: ${movie_id} ***`)
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.results[0].key)
    return data.results[0].key
}


async function displayMovieDetails(data, key) {
    console.log(`*** Calling displayMovieDetails`)
    // PopUp Tutorial: https://www.youtube.com/watch?v=iE_6pQ3RlZU
    console.log(data)
    console.log(key)
    document.getElementById("pop-up-container").innerHTML += `
    <div class="pop-up" id="pop-up-div">
        <div class="overlay"></div>
        <div class="content">
            <div id="close-pop-up-btn" onclick="closePopUp()">&times;</div>
            <h3>${data.original_title}</h3>
            <iframe src="https://www.youtube.com/embed/${key}?autoplay=1&mute=1">
            </iframe>
            <div id="info-box">
                <img src="https://image.tmdb.org/t/p/w500${data.backdrop_path}">
                <div id="details">
                    <b>Rating: ${data.vote_average}</b><br>
                    <b>Release Date: ${data.release_date.slice(4)}</b><br>
                    <b>Genre: ${data.genres[0].name}</b><br>
                    <b>Runtime: ${data.runtime} minutes</b><br>
                    <b>Overview:</b>
                    <p>${data.overview}</p>
                </div>
            </div>
        </div>
    </div>
    `

}

// do I need async here?
async function showPopUp(movie_id) {
    console.log("*** Calling showPopUp for " + movie_id + " ***")
    // document.getElementById("pop-up-div").innerHTML = ``
    const data = await fetchMovieDetails(movie_id)
    const key = await fetchMovieTrailer(movie_id)

    console.log("HERE IS DATA:")
    console.log(data)
    console.log("HERE IS KEY:")
    console.log(key)

    displayMovieDetails(data, key)

    console.log(222, document.getElementById("pop-up-div").parentElement)
    document.getElementById("pop-up-div").classList.add("active")
}

function closePopUp() {
    console.log("*** Calling closePopUp ***")
    const popUp = document.getElementById("pop-up-div")
    popUp.parentElement.removeChild(popUp)  // remove entire div
}

window.onload = function () {
    console.log("*** Calling window.onload ***")
    page = 1
    loadMainPage(page);

}
