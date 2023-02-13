(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) i(r);
  new MutationObserver((r) => {
    for (const l of r)
      if (l.type === "childList")
        for (const a of l.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && i(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const l = {};
    return (
      r.integrity && (l.integrity = r.integrity),
      r.referrerpolicy && (l.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (l.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function i(r) {
    if (r.ep) return;
    r.ep = !0;
    const l = n(r);
    fetch(r.href, l);
  }
})();
function F(t, e, n, i, r, l) {
  const a = document.createElement("div");
  a.classList.add("film-grid__film-element");
  const c = document.createElement("picture");
  c.classList.add("film-element__img-container");
  const f = document.createElement("img");
  f.classList.add("img-container__poster"),
    (f.src = t),
    (f.alt = "film poster image"),
    c.appendChild(f);
  const s = document.createElement("div");
  s.classList.add("film-element__info");
  const u = document.createElement("div");
  u.classList.add("film-element__header");
  const p = document.createElement("p");
  p.classList.add("film-element__title"),
    (p.id = "filmTitle"),
    (p.innerText = e);
  const h = document.createElement("span");
  h.classList.add("film-element__rating"),
    (h.id = "filmRating"),
    (h.innerText = `⭐ ${n}`),
    u.appendChild(p),
    u.appendChild(h),
    s.appendChild(u);
  const d = document.createElement("div");
  d.classList.add("film-element__utils");
  const g = document.createElement("span");
  g.classList.add("film-element__duration"),
    (g.id = "filmDuration"),
    (g.innerText = `${i}`);
  const y = document.createElement("p");
  y.classList.add("film-element__type"), (y.id = "filmType"), (y.innerText = r);
  const o = document.createElement("button");
  localStorage.getItem(e) === null
    ? ((o.innerHTML =
        '<i class="fas fa-plus-circle btn-icon-add" id="filmAddBtn"></i> Watchlist'),
      o.classList.add("film-element__watchlist-add-btn", "btn"),
      (o.id = "filmAddBtn"))
    : ((o.innerHTML =
        '<i class="fas fa-minus-circle btn-icon-remove" id="filmRemoveBtn"></i> Remove'),
      o.classList.add("film-element__watchlist-remove-btn", "btn"),
      (o.id = "filmRemoveBtn")),
    d.appendChild(g),
    d.appendChild(y),
    d.appendChild(o),
    s.appendChild(d);
  const b = document.createElement("div");
  b.classList.add("film-element__description");
  const E = document.createElement("p");
  return (
    E.classList.add("description__text"),
    (E.id = "filmDescription"),
    (E.textContent = l),
    b.appendChild(E),
    s.appendChild(b),
    a.appendChild(c),
    a.appendChild(s),
    a
  );
}
const _ = document.getElementById("filmGrid");
async function I(t) {
  try {
    const n = await (
      await fetch(`http://www.omdbapi.com/?apikey=6bc8a76a&&s=${t}`)
    ).json();
    return A(n.Search);
  } catch (e) {
    console.error(e),
      alert(
        "Wystąpił błąd podczas pobierania danych o filmach. Spróbuj ponownie później."
      );
  }
}
function A(t) {
  return t.reduce(
    (n, i) => (n.find((l) => l.Title === i.Title) ? n : n.concat([i])),
    []
  );
}
async function T(t) {
  try {
    return await (
      await fetch(
        `http://www.omdbapi.com/?apikey=6bc8a76a&&plot=short&t=${t}&page=1`
      )
    ).json();
  } catch (e) {
    console.error(e),
      alert("Wystąpił błąd podczas pobierania danych o filmach.");
  }
}
function B() {
  document.getElementById("searchForm").reset();
}
async function v(t) {
  return t || (_.innerHTML = ""), await I(t);
}
async function C(t) {
  _.innerHTML = "";
  let e;
  for (let n of t)
    Object.keys(n).length === 5 ? (e = await T(n.Title)) : (e = n),
      e.Response !== "False" &&
        e.Poster !== "N/A" &&
        S(e.Poster, e.Title, e.imdbRating, e.Runtime, e.Genre, e.Plot, _);
}
function S(t, e, n, i, r, l, a) {
  const c = F(t, e, n, i, r, l);
  a.appendChild(c);
}
async function L(t) {
  t.then((n) => {
    C(n);
  });
}
function D() {
  _.innerHTML = "";
}
async function w() {
  const t = [];
  for (let e in localStorage) {
    if (localStorage.getItem(e) === null) continue;
    const n = localStorage.getItem(e);
    try {
      const i = await T(n);
      t.push(i);
    } catch (i) {
      console.error(i);
    }
  }
  return t;
}
function R(t) {
  const e = t;
  localStorage.removeItem(e);
}
function q(t) {
  const e = t;
  console.log(e), localStorage.setItem(e, e);
}
const x = document.getElementById("searchForm"),
  j = document.getElementById("filmGrid"),
  k = document.getElementById("watchlistBtn"),
  H = document.getElementById("headerTitle");
let m;
(function (t) {
  x.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = document.getElementById("filmSearchInput");
    m = n.value;
    const i = v(n.value);
    L(i), B();
  }),
    H.addEventListener("click", () => D()),
    j.addEventListener("click", (e) => {
      const n =
        e.target.parentElement.parentElement.parentElement.querySelector(
          ".film-element__title"
        ).textContent;
      if (
        e.target.id === "filmAddBtn" ||
        e.target.classList.contains("btn-icon-add")
      ) {
        q(n);
        const i = v(m);
        L(i);
      }
      if (
        e.target.id === "filmRemoveBtn" ||
        e.target.classList.contains("btn-icon-remove")
      ) {
        let i;
        R(n), m ? (i = v(m)) : (i = w()), L(i);
      }
    }),
    k.addEventListener("click", () => {
      m = "";
      const e = w();
      L(e);
    });
})();
