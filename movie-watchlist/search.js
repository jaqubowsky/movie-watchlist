import createFilmElement from "./filmElement";

const searchInput = document.getElementById("filmSearchInput");
const filmGrid = document.getElementById("filmGrid");

async function getFilmsArray(title) {
  try {
    const request = await fetch(
      `http://www.omdbapi.com/?apikey=6bc8a76a&&s=${title}`
    );

    const data = await request.json();

    return searchForUnique(data.Search);
  } catch (err) {
    console.log(err);
  }
}

function searchForUnique(data) {
  const uniqueData = data.reduce((finalArray, current) => {
    console.log(finalArray, current);
    let obj = finalArray.find((film) => film.Title === current.Title);

    if (obj) return finalArray;

    return finalArray.concat([current]);
  }, []);

  return uniqueData;
}

async function getFilmDetails(title) {
  try {
    const request = await fetch(
      `http://www.omdbapi.com/?apikey=6bc8a76a&&plot=short&t=${title}&page=1`
    );

    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

function resetSearchInput() {
  const searchForm = document.getElementById("searchForm");

  searchForm.reset();
}

async function renderFilms() {
  try {
    filmGrid.innerHTML = "";

    const filmsArray = await getFilmsArray(searchInput.value);

    for (let film of filmsArray) {
      const filmDetails = await getFilmDetails(film.Title);

      if (filmDetails.Response === "False") continue;
      if (filmDetails.Poster === "N/A") continue;

      renderFilm(
        filmDetails.Poster,
        filmDetails.Title,
        filmDetails.imdbRating,
        filmDetails.Runtime,
        filmDetails.Genre,
        filmDetails.Plot,
        filmGrid
      );
    }
  } catch (err) {
    console.log(err);
  }
}

function renderFilm(img, title, rating, time, genre, plot, container) {
  const newFilm = createFilmElement(img, title, rating, time, genre, plot);

  container.appendChild(newFilm);
}

export { resetSearchInput, renderFilms };
