# Editing the academic homepage

The website is intentionally plain HTML, CSS, and JavaScript. It can be published directly with GitHub Pages; no build command is required.

## Main files

- `index.html` — Home
- `research.html` — Research and expandable publication abstracts
- `life.html` — Life
- `assets/site.css` — Colours, layout, typography, and responsive styles
- `assets/site.js` — Publication expand/collapse interaction

## Replace the placeholders

Search for `First Last`, `[institution]`, or text in square brackets such as `[field one]`. Replace those directly in the relevant HTML file.

## Add a publication

In `research.html`, duplicate one complete `<article class="research-card"> ... </article>` block. Give the new abstract a unique ID (for example `abstract-4`) and use that same ID in the button's `aria-controls` attribute. Add the article's keywords to `data-tags`, separated by commas. They will then work with the filter automatically.

## Add personal images

The portrait on `index.html` and photo tiles on `life.html` are deliberately visual placeholders. Replace the portrait block or gallery tiles with your own `<img>` tags once you have photos, ideally saved inside `assets/images/`.

## Preview and publish

Open `index.html` in a browser to preview it locally. To publish, upload this folder to a GitHub repository and enable GitHub Pages from the repository's main branch and root folder. GitHub will use `index.html` as the homepage automatically.
