import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import './styles.css';


const breedSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');

fetchBreeds()
  .then(breedsArray => {
    const dataProvider = breedsArray.map(({ id, name }) => {
      return { value: id, text: name }
    })

    dataProvider.unshift({ value: "", text: '-- select a breed --', disabled: true })

    new SlimSelect({
      select: breedSelector,
      data: dataProvider
    })
  }
)
.catch(onFetchError);


breedSelector.addEventListener('change', onSelect);

function onSelect(event) {
  const breedId = event.target.value;

  if (breedId === "") {
    return;
  }

  loader.classList.replace('is-hidden', 'loader');
  catInfo.classList.add('is-hidden');

  fetchCatByBreed(breedId)
    .then(breedInfo => {
      loader.classList.replace('loader', 'is-hidden');
      catInfo.classList.remove('is-hidden');
      const breedContent = breedInfo.breeds[0]

catInfo.innerHTML = `<div class="cat-info">
<img src="${breedInfo.url}" alt="${breedContent.name}" width=800,height=450/>
<h2>${breedContent.name}</h2>
<p>${breedContent.description}</p>
<p>${breedContent.temperament}</p>
      </div>`}
  )
  .catch(onFetchError);
}


function onFetchError(errorInstance) {
  loader.classList.replace('loader', 'is-hidden');
  catInfo.innerHTML = ""

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      timeout: 5000,
    }
  );
}