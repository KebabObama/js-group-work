import { createStore } from "./reactive.js";

/**
 * Deviation from date by minutes
 */
export const delta = createStore({ current: 0, prev: 0 });
const clocks = new Set();

/**
 * Update all clock containers
 */
export const setTimeAndDate = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + delta.get().prev);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const DAYS = [
    "neděle",
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
    "pátek",
    "sobota",
  ];
  const MONTHS = [
    "leden",
    "únor",
    "březen",
    "duben",
    "květen",
    "červen",
    "červenec",
    "srpen",
    "září",
    "říjen",
    "listopad",
    "prosinec",
  ];

  clocks.forEach((container) => {
    const [timeEl, dateEl] = container.children;
    if (!timeEl || !dateEl) return;

    timeEl.textContent = `${hours}:${minutes}:${seconds}`;
    dateEl.textContent = `${DAYS[date.getDay()]} ${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  });
};

/**
 * Creates a clock inside the given container
 * @param {string | HTMLElement} containerQuery
 */
export const createClock = (containerQuery) => {
  const container =
    typeof containerQuery === "string"
      ? document.querySelector(containerQuery)
      : containerQuery;

  if (!container) {
    console.error("Container not found");
    return null;
  }

  if (container.children.length !== 2) {
    container.innerHTML = "";
    const timeEl = document.createElement("div");
    timeEl.className = "text-6 font-bold";
    const dateEl = document.createElement("div");
    dateEl.className = "text-2 font-bold";
    container.append(timeEl, dateEl);
  }

  clocks.add(container);
  setTimeAndDate();

  return container;
};

/**
 * Creates reader for delta
 * @param {string} query
 * @param {"prev" | "current"} key
 */
export const createReader = (query, key = "current") => {
  const elements = document.querySelectorAll(query);
  delta.subscribe((val) => {
    elements.forEach((e) => (e.textContent = val[key]));
  });
};

/**
 * Creates control for modifying delta
 * @param {string} query
 * @param {(event, delta) => object} callback
 * @param {string} event
 */
export const createControl = (query, callback, event) => {
  const elements = document.querySelectorAll(query);
  elements.forEach((element) => {
    element.addEventListener(event, (ev) => {
      delta.set(callback(ev, delta.get()));
      setTimeAndDate();
    });
  });
};

setInterval(setTimeAndDate, 1000);
