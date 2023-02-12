import { resetSearchInput, renderFilms } from "./search";

const searchForm = document.getElementById("searchForm");

const events = (function () {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    renderFilms();
    resetSearchInput();
  });
})();

export default events;
