import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cols = [...row.children];

    // Column 0: image
    const imageCol = cols[0];
    const picture = imageCol?.querySelector('picture');
    if (picture) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'podcast-card-image';

      // Add label if present in column 1
      const labelCol = cols[1];
      const labelText = labelCol?.textContent?.trim();
      if (labelText) {
        const label = document.createElement('span');
        label.className = 'podcast-card-label';
        label.textContent = labelText;
        imageDiv.append(label);
      }

      imageDiv.append(picture);
      li.append(imageDiv);
    }

    // Column 2: title + link
    const titleCol = cols[2];
    if (titleCol) {
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'podcast-card-body';
      const link = titleCol.querySelector('a');
      const h3 = document.createElement('h3');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        h3.append(a);
      } else {
        h3.textContent = titleCol.textContent.trim();
      }
      bodyDiv.append(h3);
      li.append(bodyDiv);
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]),
    );
  });

  block.replaceChildren(ul);
}
