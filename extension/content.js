// Play Console already ships a full dark palette behind the `acx-dark-theme`
// class (Google's own colour tokens). This script just switches it on.
const KEY = 'pcdEnabled';
const root = document.documentElement;
let enabled = true; // default: on

function apply() {
  const want = enabled;
  if (root.classList.contains('acx-dark-theme') !== want) root.classList.toggle('acx-dark-theme', want);
  if (root.classList.contains('pcd-on') !== want) root.classList.toggle('pcd-on', want);
}

// Apply immediately (before the page paints) to avoid a white flash.
apply();

chrome.storage.sync.get({ [KEY]: true }, (r) => {
  enabled = r[KEY];
  apply();
});

// React to the toolbar toggle.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes[KEY]) {
    enabled = changes[KEY].newValue;
    apply();
  }
});

// The console is a single-page app; if it ever rewrites <html> classes,
// put ours back.
new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['class'] });

// Some charts paint an opaque white canvas the theme can't recolour, while
// others are transparent and already dark. Mark the white ones for dark.css.
function isOpaqueWhite(canvas) {
  if (!canvas.width || !canvas.height) return false;
  try {
    const [r, g, b, a] = canvas.getContext('2d').getImageData(1, 1, 1, 1).data;
    return a === 255 && r > 245 && g > 245 && b > 245;
  } catch {
    return false;
  }
}

function markWhiteCharts() {
  if (!enabled) return;
  for (const canvas of document.querySelectorAll('.aplos-chart canvas:not(.pcd-invert)')) {
    if (isOpaqueWhite(canvas)) canvas.classList.add('pcd-invert');
  }
}

setInterval(markWhiteCharts, 1000);
