/* ============================================================
   Interaction: contents rail, scrollspy, reveals, Figure 7 chart
   No external dependencies — safe for GitHub Pages.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile contents drawer ---------- */
  var toggle = document.getElementById("menuToggle");
  var rail = document.getElementById("rail");
  var backdrop = document.getElementById("railBackdrop");

  function setDrawer(open) {
    rail.classList.toggle("open", open);
    backdrop.classList.toggle("open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle) toggle.addEventListener("click", function () {
    setDrawer(!rail.classList.contains("open"));
  });
  if (backdrop) backdrop.addEventListener("click", function () { setDrawer(false); });
  rail.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setDrawer(false);
  });

  /* ---------- Scrollspy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll("#toc a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id;
          links.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".section__head, .prose, figure.fig, .table-wrap, .chart-card, .summary-grid, .stats__inner"
  );
  revealTargets.forEach(function (el) { if (!reduce) el.classList.add("reveal"); });

  if (!reduce && "IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    revealTargets.forEach(function (el) { revObs.observe(el); });
  }

  /* ---------- Figure 7: grouped bar chart (Table 3 data) ---------- */
  var LAYERS = ["L1 Red", "L2 Grn", "L3 Blu", "L4 NIR", "L5 RTx", "L6 GTx", "L7 BTx", "L8 NTx"];
  var CLASSES = [
    { key: "Ludwigia",  color: "var(--c-ludwigia)", vals: [104.16, 145.45, 94.15, 222.63, 64.78, 48.31, 25.55, 8.27] },
    { key: "Other veg", color: "var(--c-veg)",      vals: [68.42, 106.52, 76.68, 223.95, 56.15, 98.52, 19.81, 6.21] },
    { key: "Bare soil", color: "var(--c-soil)",     vals: [165.23, 151.69, 139.03, 193.48, 28.74, 26.71, 19.01, 7.89] },
    { key: "Water",     color: "var(--c-water)",    vals: [86.71, 91.77, 87.54, 54.23, 53.72, 48.13, 46.44, 70.76] }
  ];

  function buildChart() {
    var host = document.getElementById("chart");
    if (!host) return;
    host.innerHTML = "";

    var mobile = window.innerWidth < 640;
    var W = 760, H = mobile ? 320 : 380;
    var m = { top: 16, right: 8, bottom: mobile ? 54 : 42, left: 38 };
    var iw = W - m.left - m.right;
    var ih = H - m.top - m.bottom;
    var maxV = 240;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "chart-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label",
      "Grouped bar chart of mean spectral and textural values for each land-cover class across eight layers. Ludwigia shows notably lower green-band texture than other vegetation.");

    function el(name, attrs) {
      var e = document.createElementNS("http://www.w3.org/2000/svg", name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    // gridlines + y axis labels
    var grid = el("g", { class: "grid" });
    var axis = el("g", { class: "axis" });
    [0, 60, 120, 180, 240].forEach(function (t) {
      var y = m.top + ih - (t / maxV) * ih;
      grid.appendChild(el("line", { x1: m.left, y1: y, x2: m.left + iw, y2: y }));
      var lab = el("text", { x: m.left - 6, y: y + 3, "text-anchor": "end" });
      lab.textContent = t;
      axis.appendChild(lab);
    });
    svg.appendChild(grid);

    // subtle band behind the texture layers (L5-L8) to separate spectral vs texture
    var groupW = iw / LAYERS.length;
    var bandX = m.left + groupW * 4;
    svg.appendChild(el("rect", { class: "band", x: bandX, y: m.top, width: groupW * 4, height: ih }));

    // bars
    var pad = groupW * 0.18;
    var barsW = groupW - pad * 2;
    var bw = barsW / CLASSES.length;

    LAYERS.forEach(function (layer, gi) {
      var gx = m.left + gi * groupW + pad;
      CLASSES.forEach(function (c, ci) {
        var v = c.vals[gi];
        var bh = (v / maxV) * ih;
        var x = gx + ci * bw;
        var y = m.top + ih - bh;
        var r = el("rect", {
          x: x + 0.5, y: y, width: bw - 1, height: bh,
          fill: c.color, rx: 1
        });
        var title = el("title");
        title.textContent = c.key + " · " + layer + " = " + v;
        r.appendChild(title);
        svg.appendChild(r);
      });
      // x label
      var lx = m.left + gi * groupW + groupW / 2;
      var parts = layer.split(" ");
      var t1 = el("text", { x: lx, y: m.top + ih + 16, "text-anchor": "middle", class: "glabel" });
      t1.textContent = parts[0];
      svg.appendChild(t1);
      var t2 = el("text", { x: lx, y: m.top + ih + 28, "text-anchor": "middle", class: "axis" });
      t2.setAttribute("style", "font-size:9px;fill:var(--ink-soft)");
      t2.textContent = parts[1] || "";
      svg.appendChild(t2);
    });

    // divider label: spectral | texture
    var divA = el("text", { x: m.left + groupW * 2, y: m.top + ih + (mobile ? 46 : 40), "text-anchor": "middle" });
    divA.setAttribute("style", "font-size:9px;letter-spacing:.08em;text-transform:uppercase;fill:var(--ink-soft)");
    divA.textContent = "spectral";
    svg.appendChild(divA);
    var divB = el("text", { x: m.left + groupW * 6, y: m.top + ih + (mobile ? 46 : 40), "text-anchor": "middle" });
    divB.setAttribute("style", "font-size:9px;letter-spacing:.08em;text-transform:uppercase;fill:var(--ink-soft)");
    divB.textContent = "texture";
    svg.appendChild(divB);

    host.appendChild(svg);
  }

  buildChart();
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(buildChart, 180);
  });
})();
