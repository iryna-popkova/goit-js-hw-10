
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_9ZD2TQX2QKLus1Y8wIzEJaT6YqXtRqwgygQUSwYpqKJNfP95y1L7SL3pWp624OxV";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      return response.data;
      }
    )
    .catch((error) => {
      return new Error('Oops! Something went wrong! Try reloading the page!');
    }
  )
}


export function fetchCatByBreed(breedId) {
  return axios.get( `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      return response.data[0];
      }
    )
    .catch((error) => {
      return new Error('Oops! Something went wrong! Try reloading the page!');
    }
  )
}