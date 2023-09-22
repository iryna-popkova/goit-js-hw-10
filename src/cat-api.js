
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_9ZD2TQX2QKLus1Y8wIzEJaT6YqXtRqwgygQUSwYpqKJNfP95y1L7SL3pWp624OxV";

export function fetchBreeds() {

return fetch("https://api.thecatapi.com/v1/breeds?x-api-key").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );

};

export function fetchCatByBreed(breedId) {
return fetch("https://api.thecatapi.com/v1/images/search?x-api-key&breed_ids").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );

};