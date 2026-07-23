# Anthony Fowler — Geospatial Portfolio

Static portfolio site served with GitHub Pages at
`https://ajfowler91.github.io/portfolio/`.

## Structure

```
portfolio/
├── index.html          Homepage shell (hero, projects, capabilities, contact)
├── styles.css          Homepage stylesheet (shares the Ludwigia page design tokens)
├── projects.js         Project list — the only file to edit when adding a project
├── _config.yml         GitHub Pages config
└── ludwigia-project/   Project page (self-contained, has its own styles.css)
```

The homepage reuses the Ludwigia page design system (palette, Fraunces /
IBM Plex type stack, grid texture, legend chips) so navigating between the
homepage and project pages feels continuous.

## Adding a project

1. Add the project page in its own folder, e.g. `willamette-edh/index.html`.
2. Open `projects.js` and append an entry to the `window.PROJECTS` array:

```js
{
  title: "Willamette Basin EDH",
  url: "willamette-edh/",          // relative folder, or absolute URL
  year: "2026",
  type: "Hydrography",
  summary: "Elevation-derived flowline delineation from lidar DEMs.",
  tags: ["Lidar", "ArcPy", "PostGIS"],
  accent: "water"                  // lud | water | soil | veg
}
```

3. Commit and push. No other file needs to change; cards render in array
   order.

Field notes:

- `titleHtml` is optional and only needed when the title requires markup
  (e.g. italicized species names): `titleHtml: "Identifying <em>Ludwigia</em> spp."`
  Keep `title` as the plain-text version regardless.
- `accent` maps to the four functional palette colors: `lud` green,
  `water` teal, `soil` ochre, `veg` rust. Pick whichever matches the
  project's domain.
- All fields except `title` and `url` are optional.

## Local preview

Open `index.html` directly in a browser, or run a local server from the
repo root:

```
python -m http.server 8000
```

then visit `http://localhost:8000/`.
