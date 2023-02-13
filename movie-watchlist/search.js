import createFilmElement from "./filmElement";

const filmGrid = document.getElementById("filmGrid");

async function getFilmsData(title) {
  try {
    const request = await fetch(
      `http://www.omdbapi.com/?apikey=6bc8a76a&&s=${title}`
    );

    const data = await request.json();

    return searchForUnique(data.Search);
  } catch (err) {
    console.error(err);
    alert(
      "Wystąpił błąd podczas pobierania danych o filmach. Spróbuj ponownie później."
    );
  }
}

function searchForUnique(data) {
  const uniqueData = data.reduce((finalArray, current) => {
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
    console.error(err);
    alert("Wystąpił błąd podczas pobierania danych o filmach.");
  }
}

function resetSearchInput() {
  const searchForm = document.getElementById("searchForm");

  searchForm.reset();
}

async function getFilmsArray(data) {
  if (!data) filmGrid.innerHTML = "";

  const filmsArray = await getFilmsData(data);

  return filmsArray;
}

async function renderFilmArray(data) {
  filmGrid.innerHTML = "";
  let filmDetails;

  for (let film of data) {
    if (Object.keys(film).length === 5) {
      filmDetails = await getFilmDetails(film.Title);
    } else {
      filmDetails = film;
    }

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
}

function renderFilm(img, title, rating, time, genre, plot, container) {
  const newFilm = createFilmElement(img, title, rating, time, genre, plot);

  container.appendChild(newFilm);
}

async function renderFilmData(callbackArray) {
  const filmArray = callbackArray;

  filmArray.then((array) => {
    renderFilmArray(array);
  });
}

export {
  resetSearchInput,
  renderFilmArray,
  getFilmsArray,
  getFilmDetails,
  renderFilm,
  renderFilmData,
};
