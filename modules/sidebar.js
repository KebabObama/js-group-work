/**
 * Sidebar initialization
 * @param {string} s_query
 * @param {string} t_query
 */
export const sidebar = (s_query, t_query) => {
  const sidebar_element = document.querySelector(s_query);
  const toggle_elements = document.querySelectorAll(t_query);
  toggle_elements.forEach((e) => {
    e.onclick = () => {
      sidebar_element.classList.toggle("sidebar--active");
    };
  });
};
