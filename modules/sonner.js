/**
 * Displays a temporary message
 * @param {string} msg - The message text to display in the toast.
 */
export const toast = (msg, delay = 3000) => {
  const sonner = document.querySelector(".sonner");
  const temp = document.createElement("div");
  temp.className =
    "toast button-like font-bold text-1.5 border toast--show select-none";
  temp.textContent = msg;
  sonner.appendChild(temp);
  setTimeout(() => {
    temp.classList.remove("toast--show");
    temp.addEventListener("transitionend", () => temp.remove(), { once: true });
  }, delay);
};
