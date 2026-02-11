export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const link = row.querySelector('a');
    if (link) {
      // Mark the current page link as active
      const currentPath = window.location.pathname;
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (currentPath === linkPath || currentPath.includes(linkPath)) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
      li.append(link);
    } else {
      li.textContent = row.textContent.trim();
    }
    ul.append(li);
  });
  block.replaceChildren(ul);
}
