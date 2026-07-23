# Identifying *Ludwigia* spp. — research portfolio site

A single-page website presenting the M.S. research paper *Identifying Ludwigia spp.
using maximum likelihood classification: a case study for the Smith and Bybee Wetland
Natural Area, Oregon* (Anthony Fowler, Northwest Missouri State University, 2024).

It is a static site with no build step, so it can be served directly from GitHub Pages.

## Files

```
index.html      The page (structure + all text)
styles.css      Styling
script.js       Contents nav, scroll behavior, and the Figure 7 chart
images/         All figures, optimized for web
.nojekyll       Tells GitHub Pages to serve files as-is
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub (public).
2. Put the contents of this folder in the repository root and push:
   ```bash
   git init
   git add .
   git commit -m "Add Ludwigia research site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait about a minute. The site will be live at
   `https://<your-username>.github.io/<repo-name>/`.

To use a folder instead of the root (for example if this lives alongside other
projects), place these files in a `/docs` folder and select `/docs` as the Pages
folder in step 4.

## Notes

- Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) load from Google Fonts.
- Figure 7 was a placeholder in the original paper; here it is rendered as a live
  chart built from the Table 3 values.
- Images were downscaled and recompressed from the source document for faster loading.
