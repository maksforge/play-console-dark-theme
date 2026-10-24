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
