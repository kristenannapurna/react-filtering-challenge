import axios from 'axios';


// enter your api key here 
const key = `46d336733a4e6a29747db20a40885435`;


// base request to get movies
const movieRequest = (page) => {
  return (
          axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: key,
              page: page
            }
          })
          )
}


//build array of 10 random pages to request from movie database
let nums = [];

while (nums.length < 10){
   let randomPage = Math.floor( Math.random() * 1000 );
        if (nums.indexOf(randomPage) > -1) continue;
        nums[nums.length] = randomPage;
    }


// build array of promises for movie requests 
export const getRandomMovies = nums.map((pagenum) => {
      return movieRequest(pagenum)
    });

export const getGenres = function(){
  return axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: key,
        }
      })
}
  

