
const date = new Date();

const toggle_element = document.querySelector(".sidebar_toggle");
toggle_element.onclick = () => {
  document.querySelector(".sidebar").classList.toggle("sidebar--active");
};

const date_element = document.querySelector(".date");
const clock_element = document.querySelector(".clock");

const setTimeAndDate = () => {
  clock_element.innerHTML =  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const day_of_week = () => {
    switch (date.getDay()) {
      case 0: return "neděle";
      case 1: return "pondělí";
      case 2: return "úterý";
      case 3: return "středa";
      case 4: return "čtvrtek";
      case 5: return "pátek";
      case 6: return "sobota";
    }
  };
  const month_of_year = () => {
    switch (date.getMonth()) {
      case 0: return "leden";
      case 1: return "únor";
      case 2: return "březen";
      case 3: return "duben";
      case 4: return "květen";
      case 5: return "červen";
      case 6: return "červenec";
      case 7: return "srpen";
      case 8: return "září";
      case 9: return "říjen";
      case 10: return "listopad";
      case 11: return "prosinec";
    }
  }
  date_element.innerHTML = `${day_of_week()} ${date.getDate()}. ${month_of_year()} ${date.getFullYear()}`; 
}

setInterval(() => {
  setTimeAndDate();
}, 1000);

const message = (msg) => {
  const sonner_body_element = document.querySelector("sonner");
  if (!sonner_body_element) return;
  const temp = document.createElement("div");
  temp.className = "sonner-toast";
  temp.textContent = msg;
  sonner_body_element.appendChild(temp);
  requestAnimationFrame(() => temp.classList.add("show"));
  setTimeout(() => {
    temp.classList.remove("show");
    temp.classList.add("hide");
    temp.addEventListener("transitionend", () => temp.remove(), { once: true });
  }, 3000);
};

const time_delta_show_element = document.querySelector(".time-delta-show");
const time_delta_prev_element = document.querySelector(".time-delta-prev");

let state = {
  time_delta: 0,
  prev_time_delta: 0,
};

const reactiveState = new Proxy(state, {
  set(target, key, value) {
    target[key] = value;
    if (key === "time_delta")
      time_delta_show_element.textContent = value;
    if (key === "prev_time_delta")
      time_delta_prev_element.textContent = value;
    return true;
  },
});

document.querySelector(".time-delta-up").onclick = () => {
  reactiveState.time_delta++;
};
document.querySelector(".time-delta-down").onclick = () => {
  reactiveState.time_delta--;
};
document.querySelector(".time-delta-cancel").onclick = () => {
  reactiveState.time_delta = reactiveState.prev_time_delta;
};
document.querySelector(".time-delta-accept").onclick = () => {
  date.setMinutes(date.getMinutes() + reactiveState.time_delta);
  reactiveState.prev_time_delta = reactiveState.time_delta;
  setTimeAndDate();
  message(`Nastavení uloženo: ${reactiveState.time_delta}`);
};

time_delta_show_element.textContent = reactiveState.time_delta;
time_delta_prev_element.textContent = reactiveState.prev_time_delta;