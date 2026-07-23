/* ============================================================
   projects.js — the only file you edit to add a project.

   Each entry renders as a card on the homepage, in order.

   Fields:
     title     (required) Plain-text project title.
     titleHtml (optional) HTML title, e.g. to italicize species
                names. Falls back to `title` if omitted.
     url       (required) Link target. Relative for pages in
                this repo ("ludwigia-project/") or absolute.
     year      (optional) Display year or range, e.g. "2025".
     type      (optional) Short category label shown in the
                card header, e.g. "Remote sensing".
     summary   (optional) One or two sentences.
     tags      (optional) Array of tool/method labels.
     accent    (optional) Card accent color, one of:
                "lud" (green), "water" (teal),
                "soil" (ochre), "veg" (rust).
                Defaults to "lud".
   ============================================================ */

window.PROJECTS = [
  {
    title: "Identifying Ludwigia spp.",
    titleHtml: "Identifying <em>Ludwigia</em> spp.",
    url: "ludwigia-project/",
    year: "2026",
    type: "Remote sensing · Land cover",
    summary:
      "Supervised land cover classification to map invasive water primrose " +
      "across aquatic habitat, with accuracy assessment against field reference data.",
    tags: ["Classification", "Accuracy assessment", "Invasive species"],
    accent: "lud"
  }

  /* To add a project, copy the block above, paste it after a comma,
     and edit the fields. Example:

  ,{
    title: "Willamette Basin EDH",
    url: "willamette-edh/",
    year: "2026",
    type: "Hydrography",
    summary: "Elevation-derived flowline delineation from lidar DEMs.",
    tags: ["Lidar", "ArcPy", "PostGIS"],
    accent: "water"
  }
  */
];
