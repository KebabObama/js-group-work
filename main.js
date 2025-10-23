import { createClock, createControl, createReader } from "./modules/clock.js";
import { sidebar } from "./modules/sidebar.js";
import { toast } from "./modules/sonner.js";

// Swiper initialization
new Swiper(".swiper", {
  spaceBetween: 0,
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

sidebar(".sidebar", ".sidebar_toggle");

createClock(".clock-container");

createReader(".time-delta-show", "current");
createReader(".time-delta-prev", "prev");

createControl(
  ".time-delta-up",
  (_, val) => ({ prev: val.prev, current: val.current + 1 }),
  "click",
);
createControl(
  ".time-delta-down",
  (_, val) => ({ prev: val.prev, current: val.current - 1 }),
  "click",
);
createControl(
  ".time-delta-cancel",
  (_, val) => ({ prev: val.prev, current: val.prev }),
  "click",
);
createControl(
  ".time-delta-accept",
  (_, val) => {
    toast(`Nastavení uloženo: ${val.current}`);
    return { prev: val.current, current: val.current };
  },
  "click",
);
