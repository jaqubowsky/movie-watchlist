import { resetSearchInput, renderFilmData, getFilmsArray } from "./search";

import {
  getLocalStorageArray,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "./watchlist";

const searchForm = document.getElementById("searchForm");
const filmGrid = document.getElementById("filmGrid");
const watchlistBtn = document.getElementById("watchlistBtn");
let SEARCH_INPUT_BEFORE;

const events = (function () {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("filmSearchInput");
    SEARCH_INPUT_BEFORE = searchInput.value;

    const filmArray = getFilmsArray(searchInput.value);
    renderFilmData(filmArray);

    resetSearchInput();
  });

  filmGrid.addEventListener("click", (e) => {
    const target =
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".film-element__title"
      ).textContent;

    if (
      e.target.id === "filmAddBtn" ||
      e.target.classList.contains("btn-icon-add")
    ) {
      setLocalStorageItem(target);

      const filmArray = getFilmsArray(SEARCH_INPUT_BEFORE);

      renderFilmData(filmArray);
    }

    if (
      e.target.id === "filmRemoveBtn" ||
      e.target.classList.contains("btn-icon-remove")
    ) {
      let filmArray;

      removeLocalStorageItem(target);

      if (!SEARCH_INPUT_BEFORE) {
        filmArray = getLocalStorageArray();
      } else {
        filmArray = getFilmsArray(SEARCH_INPUT_BEFORE);
      }

      renderFilmData(filmArray);
    }
  });

  watchlistBtn.addEventListener("click", () => {
    SEARCH_INPUT_BEFORE = "";

    const filmArray = getLocalStorageArray();

    renderFilmData(filmArray);
  });
})();
export default events;
