import { getFilmDetails } from "./search";

async function getLocalStorageArray() {
  const filmArray = [];

  for (let key in localStorage) {
    if (localStorage.getItem(key) === null) continue;

    const title = localStorage.getItem(key);

    try {
      const filmData = await getFilmDetails(title);
      filmArray.push(filmData);
    } catch (error) {
      console.error(error);
    }
  }

  return filmArray;
}

function removeLocalStorageItem(target) {
  const currentFilmTitle = target;

  localStorage.removeItem(currentFilmTitle);
}

function setLocalStorageItem(target) {
  const currentFilmTitle = target;

  console.log(currentFilmTitle);

  localStorage.setItem(currentFilmTitle, currentFilmTitle);
}
export { getLocalStorageArray, setLocalStorageItem, removeLocalStorageItem };
