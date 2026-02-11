export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  // Row 0: background image
  const bgRow = rows[0];
  const bgPicture = bgRow?.querySelector('picture');

  // Row 1: logo image
  const logoRow = rows[1];
  const logoPicture = logoRow?.querySelector('picture');

  // Row 2: heading text
  const headingRow = rows[2];
  const headingText = headingRow?.textContent?.trim() || '';

  // Row 3: CTA link
  const ctaRow = rows[3];
  const ctaLink = ctaRow?.querySelector('a');

  // Build hero structure
  if (bgPicture) {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'hero-bg';
    bgDiv.append(bgPicture);
    block.append(bgDiv);
  }

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  if (logoPicture) {
    const logoDiv = document.createElement('div');
    logoDiv.className = 'hero-logo';
    logoDiv.append(logoPicture);
    contentDiv.append(logoDiv);
  }

  if (headingText) {
    const h1 = document.createElement('h1');
    h1.textContent = headingText;
    contentDiv.append(h1);
  }

  if (ctaLink) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'hero-cta';
    ctaLink.classList.remove('button');
    ctaDiv.append(ctaLink);
    contentDiv.append(ctaDiv);
  }

  block.append(contentDiv);
}
