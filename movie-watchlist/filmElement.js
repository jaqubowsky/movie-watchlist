function createFilmElement(
  filmImg,
  filmTitle,
  filmRating,
  filmDuration,
  filmType,
  filmDescription
) {
  const filmElement = document.createElement("div");
  filmElement.classList.add("film-grid__film-element");

  const picture = document.createElement("picture");
  picture.classList.add("film-element__img-container");

  const img = document.createElement("img");
  img.classList.add("img-container__poster");
  img.src = filmImg;
  img.alt = "film poster image";

  picture.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("film-element__info");

  const header = document.createElement("div");
  header.classList.add("film-element__header");

  const title = document.createElement("p");
  title.classList.add("film-element__title");
  title.id = "filmTitle";
  title.innerText = filmTitle;

  const rating = document.createElement("span");
  rating.classList.add("film-element__rating");
  rating.id = "filmRating";
  rating.innerText = `⭐ ${filmRating}`;

  header.appendChild(title);
  header.appendChild(rating);
  info.appendChild(header);

  const utils = document.createElement("div");
  utils.classList.add("film-element__utils");

  const duration = document.createElement("span");
  duration.classList.add("film-element__duration");
  duration.id = "filmDuration";
  duration.innerText = `${filmDuration}`;

  const type = document.createElement("p");
  type.classList.add("film-element__type");
  type.id = "filmType";
  type.innerText = filmType;

  const btn = document.createElement("button");
  btn.classList.add("film-element__watchlist-add-btn", "btn");
  btn.id = "filmAddBtn";
  btn.innerHTML = `<i class="fas fa-plus-circle"></i> Watchlist`;

  utils.appendChild(duration);
  utils.appendChild(type);
  utils.appendChild(btn);
  info.appendChild(utils);

  const description = document.createElement("div");
  description.classList.add("film-element__description");

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("description__text");
  descriptionText.id = "filmDescription";
  descriptionText.textContent = filmDescription;

  description.appendChild(descriptionText);
  info.appendChild(description);

  filmElement.appendChild(picture);
  filmElement.appendChild(info);

  return filmElement;
}

export default createFilmElement;
