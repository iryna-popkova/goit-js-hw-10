import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import './styles.css';

const breedSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(breedsArray => {
    const markup = breedsArray.map(({ id, name }) => {
      return `<option value = "${id}">${name}</option>`
    }).join('');
    breedSelector.insertAdjacentHTML('afterbegin', markup);
  }
 )
  .catch(error => console.error(error));

breedSelector.addEventListener('change', onSelect);

function onSelect(event) {
  const breedId = event.target.value;
  fetchCatByBreed(breedId)
    .then(breedInfo => {
  const catDscr = `${breedInfo.breeds.name}+
${breedInfo.breeds.description}+
${breedInfo.breeds.temperament}`;
      catDscr.insertAdjacentHTML('afterbegin', catInfo )
    }

  )
}

