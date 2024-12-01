const API_KEY ="api_key=3bb2b92e646ca91af7c030babcd3c262";
const BASE_URL = "https://api.themoviedb.org/3/";
const SEARCHMOVIEURL = `${BASE_URL}search/movie?${API_KEY}`
const API_URL = `${BASE_URL}movie/popular?${API_KEY}`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieMainContainer = document.querySelector(".movieMainContainer");
console.log(movieMainContainer)

//https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
//http://api.themoviedb.org/3/movie/popular?api_key=3bb2b92e646ca91af7c030babcd3c262

console.log(API_URL)


// const getMovies = (url)=>{
//     fetch(url)
//     .then((respose)=> response.json())
//     .then ((data)=>{console.log(data)})
//     .catch((error)=> console.log(error))
    
//}

const getMovie = async (url)=>{
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results)
        showMovie(data.results)
    } catch (error) {
        console.log(error)
    }

}

getMovie(API_URL)

function showMovie(movies){
    movieMainContainer.innerHTML = '';

    movies.forEach(movie => {
        const{overview, title, vote_average, poster_path} = movie;
        const movieElement = document.createElement("div");
        movieElement.classList.add('movie')
        movieElement.innerHTML = ` 
            <div>
                <img src="${IMAGE_URL}${poster_path}" alt="movie images01">
            </div>
            <div class="titleRating">
                <span>${title}</span>
                <span>${vote_average}</span>
            </div>
            <div class="overview">
                <h2>${overview}</h2>
                <p>  </p>
            </div>
        `
        movieMainContainer.appendChild(movieElement)
    });
}


const searchMovieForm = document.querySelector('.search');

searchMovieForm.addEventListener('keyup', (event)=>{
    event.preventDefault();
    const  inputValue = event.target.value
    console.log(inputValue)

    if(inputValue){
        const searchUrl = SEARCHMOVIEURL + "&query=" + inputValue
        console.log(searchUrl)
        getMovie(searchUrl)
    }else{
        getMovie(API_URL)
    }

})