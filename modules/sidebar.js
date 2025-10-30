/**
 * Sidebar initialization
 * @param {string} s_query
 * @param {string} t_query
 * @param {string} action
 */
export const sidebar = (s_query, t_query, action = "b") => {
  const sidebar_element = document.querySelector(s_query);
  const toggle_elements = document.querySelectorAll(t_query);
  const tgl = () => sidebar_element.classList.toggle("sidebar--active");
  document.onkeydown = (e) => e.key === action && tgl();
  toggle_elements.forEach((e) => e.onclick = tgl);
};
