// Instantiate constants and global variables
const API_KEY = "2bc0bfedf2889bc7dfd1db360b7b6f27"
// https://api.themoviedb.org/3/movie/550?api_key=2bc0bfedf2889bc7dfd1db360b7b6f27
// https://api.themoviedb.org/3/search/movie?api_key=2bc0bfedf2889bc7dfd1db360b7b6f27&language=en-US&query=dog&page=1&include_adult=false
let page = 1
let searchTerm = ""

// Create DOM references

movieGridElement = document.querySelector("#movies-grid")
submitButtonElement = document.querySelector("#submit-button")
searchInputElement = document.querySelector("#search-input")

// Create event listeners

submitButtonElement.addEventListener("click", handleSearchSubmit)

async function getMovies(event, searchTerm) {
    console.log("*** Calling getMovies***")
    event.preventDefault() // override submit button behavior (refresh page)
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    const response = await fetch(url)
    const data = await response.json()
    console.log("*** Getting Data ***")
    console.log(data)
    movieGridElement.innerHTML = ``  // clear existing results on api call
    return data
}

function displayMovies(data) {
    console.log("*** Calling displayMovies ***")
    data.results.forEach(movie => {
        if (movie.poster_path === null) {
            movieGridElement.innerHTML += `
            <img src="./assets/placeholder_img.jpg">
            `
        }
        movieGridElement.innerHTML += `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        `
    });
}

async function handleSearchSubmit(event) {
    console.log("*** Calling handleSearchSubmit ***")
    searchTerm = searchInputElement.value
    const data = await getMovies(event, searchTerm)
    displayMovies(data)
    searchInputElement.value = ""  // clear search bar after query

}

