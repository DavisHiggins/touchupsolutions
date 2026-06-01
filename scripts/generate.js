/* Touch Up Solutions — static site generator.
   Defines shared head/header/mobile-nav/footer ONCE so every page is
   byte-identical, then emits each page with its unique <main> body.
   Run: node scripts/generate.js   (writes *.html to project root) */

const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..');
const SDS = require('./sds.json');   // { category: [ {label, url} ] } scraped from the live store

/* ---------- real demo videos (IDs from the Touch Up Solutions YouTube channel) ---------- */
const ytWatch = id => 'https://www.youtube.com/watch?v=' + id;
const ytThumb = id => 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
const YT_CHANNEL = 'https://www.youtube.com/user/touchupsolutions/featured';
const VIDEOS = [
  ['RVsN7LcczvY', 'Fill Stick Repair', 'Color-matched fill stick repair on a damaged wood surface.'],
  ['O6u7_13zcPA', 'Burn-In Stick Repair', 'Melt-in burn-in repair for deep gouges and chips.'],
  ['9hr1VkkOQMM', 'Solder Iron Burn-In &amp; Levelers', 'Using a soldering iron for burn-in fills, then leveling flush.'],
  ['-TGBHePm4N8', 'Felt Marker Touch-Up', 'Color matching wood surfaces with refillable felt markers.'],
  ['yvGtUrvuS30', 'Refillable Felt Markers', 'How the refillable felt marker system works.'],
  ['OfACm9QXK-s', 'Brush-Tip Graining Pen', 'Recreating wood grain with a brush-tip graining pen.'],
  ['1_CIO7D3B2k', 'Valve Marker Wood Graining', 'Valve marker repair and wood graining technique.'],
  ['YGQTvI7gj70', 'Dye Toner Blending', 'Blending finish color with aerosol dye toner.'],
  ['wNJCm2cFRdk', 'Pigmented Toner', 'Aerosol pigmented toner for opaque finish blending.'],
  ['-Jk6a3BEm6Y', 'Powder Putty Fill', 'Filling and color-matching damage with powder putty.'],
  ['KmlmuliBEw8', 'Powder Stick Application', 'Powder stick application for fast color fills.'],
  ['0PQQhtbSPeA', 'Powder Wood Graining', 'Recreating wood grain using repair powders.'],
  ['xzLNWG_-MSA', 'Color Flex II', 'Working with Color Flex II flexible repair putty.'],
  ['ccWSoHRTtEI', 'Epoxy Stick + Felt Markers', 'Re-coloring an epoxy stick repair with felt markers.'],
  ['-xiyBjZuP_Q', 'Wood Grain Repair: Burn-In + Graining Pen', 'A full grain repair combining a burn-in stick and graining pen.'],
  ['eq2b-SVCQoI', 'Roll-Up Marker Bag &amp; Blender', 'Organizing markers and using the blender pen.'],
];
const videoCard = v =>
  `<article class="video-card"><a class="video-thumb" href="${ytWatch(v[0])}" target="_blank" rel="noopener" aria-label="Watch: ${v[1]}"><img class="video-thumb-img" src="${ytThumb(v[0])}" alt="" loading="lazy" onerror="this.classList.add('img-failed')"><span class="play-btn"></span></a><div class="video-body"><h4>${v[1]}</h4><p>${v[2]}</p><a class="link-arrow" href="${ytWatch(v[0])}" target="_blank" rel="noopener">Watch Video</a></div></article>`;

/* ---------- shared head ---------- */
const head = (title, desc) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>`;

/* ---------- shared header (mega-menus) ---------- */
const header = `
  <!-- ===================== HEADER ===================== -->
  <header class="site-header">
    <nav class="nav" aria-label="Primary">
      <a class="nav-logo" href="index.html" aria-label="Touch Up Solutions home">
        <img class="logo-img" src="tuslogo.png" alt="Touch Up Solutions" width="280" height="165" />
      </a>

      <ul class="nav-links">
        <li class="nav-item"><a class="nav-link" data-page="index.html" href="index.html">Home</a></li>

        <li class="nav-item has-mega">
          <a class="nav-link" data-page="products.html" href="products.html">Products <i class="chev"></i></a>
          <div class="mega" role="menu">
            <div class="mega-inner">
              <div class="mega-col">
                <h5>Products</h5>
                <ul><li><a href="products.html#markers">Markers</a></li></ul>
              </div>
              <div class="mega-col">
                <h5>Quick Links</h5>
                <ul>
                  <li><a href="products.html">View All Products</a></li>
                  <li><a href="industrial-shop.html">Request a Quote</a></li>
                  <li><a href="resources.html#sds">Safety Data Sheets</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item has-mega">
          <a class="nav-link" data-page="howto.html" href="howto.html">How To <i class="chev"></i></a>
          <div class="mega" role="menu">
            <div class="mega-inner">
              <div class="mega-col">
                <h5>Wood &amp; Furniture</h5>
                <ul>
                  <li><a href="howto-cabinets.html">Touch Up Wood Kitchen Cabinets</a></li>
                  <li><a href="howto-furniture.html">Touch Up Scratches on Furniture</a></li>
                  <li><a href="howto-laminate-repair.html">Repair Laminate Flooring</a></li>
                  <li><a href="howto-laminate-scratches.html">Repair Scratches on Laminate Floor</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Tools &amp; Techniques</h5>
                <ul>
                  <li><a href="howto-burnin-knife.html">Use Burn-In Knife</a></li>
                  <li><a href="howto-burnin-sticks.html">Use Burn-In Sticks</a></li>
                  <li><a href="howto-metal-epoxy.html">Use Metal Epoxy</a></li>
                  <li><a href="howto-touch-up-paint.html">Use Touch Up Paint</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item has-mega">
          <a class="nav-link" data-page="home-user-shop.html home-fill-sticks.html home-markers.html home-touchup-kits.html" href="home-user-shop.html">Home User Shop <i class="chev"></i></a>
          <div class="mega" role="menu">
            <div class="mega-inner">
              <div class="mega-col">
                <h5>Shop</h5>
                <ul>
                  <li><a href="home-fill-sticks.html">Furniture Fill Sticks</a></li>
                  <li><a href="home-markers.html">Furniture Markers</a></li>
                  <li><a href="home-touchup-kits.html">Furniture Touch Up Kits</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Resources</h5>
                <ul>
                  <li><a href="howto.html">How To Guides</a></li>
                  <li><a href="videos.html">Demo Videos</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item has-mega">
          <a class="nav-link" data-page="industrial-shop.html wood-repair.html leather-repair.html metal-repair.html accessories.html" href="industrial-shop.html">Industrial User Shop <i class="chev"></i></a>
          <div class="mega mega--3col" role="menu">
            <div class="mega-inner">
              <div class="mega-col">
                <h5>Wood Repair</h5>
                <ul>
                  <li><a href="wood-repair.html">Adhesives · Aerosols · Burn-In Sticks · Edging Sticks</a></li>
                  <li><a href="wood-repair.html">Epoxy Sticks · Fill Sticks · Touch Up Markers</a></li>
                  <li><a href="wood-repair.html">Pencils · Powders · Powder Sticks · Putty</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Leather &amp; Metal Repair</h5>
                <ul>
                  <li><a href="leather-repair.html">Leather / Vinyl Markers</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Fill Sticks</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Pigmented Repair</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Pigmented Glaze</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Aniline Repair</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Background Repair</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Topcoats</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Cleaners and Solvents</a></li>
                  <li><a href="leather-repair.html">Leather / Vinyl Accessories</a></li>
                  <li><a href="metal-repair.html">Metal Epoxy Sticks · Metal Enamel · Metal Topcoat</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Accessories</h5>
                <ul>
                  <li><a href="accessories.html">Abrasives · Adhesive Accessories · Aerosol Accessories</a></li>
                  <li><a href="accessories.html">Brushes · Burn-In Accessories · Containers</a></li>
                  <li><a href="accessories.html">Fill Stick Accessories · Leather Accessories</a></li>
                  <li><a href="accessories.html">Lubes / Cleaners / Polishes · Marker Accessories</a></li>
                  <li><a href="accessories.html">Powder Accessories · Spray Systems</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item has-mega">
          <a class="nav-link" data-page="programs.html" href="programs.html">Programs <i class="chev"></i></a>
          <div class="mega" role="menu">
            <div class="mega-inner">
              <div class="mega-col">
                <h5>Programs</h5>
                <ul>
                  <li><a href="programs.html">Baker</a></li>
                  <li><a href="programs.html">Dar Ran</a></li>
                  <li><a href="programs.html">Fairfield Chair</a></li>
                  <li><a href="programs.html">Tafisa</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Ethan Allen</h5>
                <ul>
                  <li><a href="programs.html#ethan-allen">138 Auburn</a></li>
                  <li><a href="programs.html#ethan-allen">205 Newport</a></li>
                  <li><a href="programs.html#ethan-allen">210 Toast</a></li>
                  <li><a href="programs.html#ethan-allen">252 Mahogany</a></li>
                  <li><a href="programs.html#ethan-allen">283 Espresso</a></li>
                  <li><a href="programs.html#ethan-allen">330 Ebony</a></li>
                  <li><a href="programs.html#ethan-allen">399 Saddle</a></li>
                  <li><a href="programs.html#ethan-allen">490 Chocolate</a></li>
                  <li><a class="link-arrow" href="programs.html#ethan-allen">View All Ethan Allen</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item"><a class="nav-link" data-page="videos.html" href="videos.html">Videos</a></li>
        <li class="nav-item"><a class="nav-link" data-page="resources.html" href="resources.html">Resources</a></li>
      </ul>

      <div class="nav-utility">
        <button class="icon-btn nav-search-toggle" aria-label="Search">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
        </button>
        <span class="nav-auth"><a href="#">Login</a><span class="sep">|</span><a href="#">Register</a></span>
        <button class="icon-btn" data-cart-open aria-label="Open cart">
          <svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle><path d="M2 3h3l2.4 12.3a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2L22 7H6"></path></svg>
          <span class="cart-badge">0</span>
        </button>
        <span class="nav-cta">
          <a class="btn btn--primary btn--sm" href="industrial-shop.html">Request a Quote</a>
          <a class="btn btn--secondary btn--sm" href="products.html">Quick Order</a>
        </span>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>
    <div class="nav-search">
      <div class="container">
        <input type="search" placeholder="Search products, guides, and finishes..." aria-label="Search the site" />
        <button class="btn btn--primary btn--sm">Search</button>
      </div>
    </div>
  </header>

  <!-- ===================== MOBILE NAV ===================== -->
  <div class="mobile-nav" aria-label="Mobile navigation">
    <a class="m-link" data-page="index.html" href="index.html">Home</a>
    <div class="m-group">
      <a class="m-link m-expand" href="#">Products <i class="m-chev"></i></a>
      <div class="m-sub"><ul>
        <li><a href="products.html#markers">Markers</a></li>
        <li><a href="products.html">View All Products</a></li>
        <li><a href="resources.html#sds">Safety Data Sheets</a></li>
      </ul></div>
    </div>
    <div class="m-group">
      <a class="m-link m-expand" href="#">How To <i class="m-chev"></i></a>
      <div class="m-sub"><ul>
        <li><a href="howto-cabinets.html">Touch Up Wood Kitchen Cabinets</a></li>
        <li><a href="howto-furniture.html">Touch Up Scratches on Furniture</a></li>
        <li><a href="howto-laminate-repair.html">Repair Laminate Flooring</a></li>
        <li><a href="howto-laminate-scratches.html">Repair Scratches on Laminate Floor</a></li>
        <li><a href="howto-burnin-knife.html">Use Burn-In Knife</a></li>
        <li><a href="howto-burnin-sticks.html">Use Burn-In Sticks</a></li>
        <li><a href="howto-metal-epoxy.html">Use Metal Epoxy</a></li>
        <li><a href="howto-touch-up-paint.html">Use Touch Up Paint</a></li>
      </ul></div>
    </div>
    <div class="m-group">
      <a class="m-link m-expand" href="#">Home User Shop <i class="m-chev"></i></a>
      <div class="m-sub"><ul>
        <li><a href="home-fill-sticks.html">Furniture Fill Sticks</a></li>
        <li><a href="home-markers.html">Furniture Markers</a></li>
        <li><a href="home-touchup-kits.html">Furniture Touch Up Kits</a></li>
        <li><a href="howto.html">How To Guides</a></li>
        <li><a href="videos.html">Demo Videos</a></li>
      </ul></div>
    </div>
    <div class="m-group">
      <a class="m-link m-expand" href="#">Industrial User Shop <i class="m-chev"></i></a>
      <div class="m-sub"><ul>
        <li><a href="wood-repair.html">Wood Repair</a></li>
        <li><a href="leather-repair.html">Leather Repair</a></li>
        <li><a href="metal-repair.html">Metal Repair</a></li>
        <li><a href="accessories.html">Accessories</a></li>
      </ul></div>
    </div>
    <div class="m-group">
      <a class="m-link m-expand" href="#">Programs <i class="m-chev"></i></a>
      <div class="m-sub"><ul>
        <li><a href="programs.html">Baker</a></li>
        <li><a href="programs.html">Dar Ran</a></li>
        <li><a href="programs.html#ethan-allen">Ethan Allen</a></li>
        <li><a href="programs.html">Fairfield Chair</a></li>
        <li><a href="programs.html">Tafisa</a></li>
      </ul></div>
    </div>
    <a class="m-link" data-page="videos.html" href="videos.html">Videos</a>
    <a class="m-link" data-page="resources.html" href="resources.html">Resources</a>
    <div class="mobile-cta">
      <a class="btn btn--primary btn--block" href="industrial-shop.html">Request a Quote</a>
      <a class="btn btn--secondary btn--block" href="products.html">Quick Order</a>
    </div>
    <div class="mobile-auth"><a href="#">Login</a><a href="#">Register</a><a href="#">View Cart (0)</a></div>
  </div>
`;

/* ---------- shared footer ---------- */
const footer = `
  <!-- ===================== FOOTER ===================== -->
  <footer class="site-footer">
    <div class="grain-overlay"></div>
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="nav-logo" href="index.html" aria-label="Touch Up Solutions home">
            <img class="logo-img" src="tuslogo.png" alt="Touch Up Solutions" width="280" height="165" />
          </a>
          <p class="tagline">Manufacturing, Distributing, Selling, and Supporting quality touch up and repair.</p>
          <div class="social-row">
            <a href="https://www.facebook.com/touchupsolutions/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 9h3l.5-3H14V4.2c0-.8.3-1.2 1.4-1.2H17.5V.2C17.1.1 16 0 14.9 0 12.4 0 11 1.4 11 4v2H8v3h3v9h3V9z"/></svg></a>
            <a href="https://twitter.com/touchupsolution" target="_blank" rel="noopener" aria-label="Twitter / X"><svg viewBox="0 0 24 24"><path d="M18.2 2H21l-6.4 7.3L22 22h-6l-4.7-6.2L5.8 22H3l6.9-7.9L2 2h6.2l4.3 5.7L18.2 2zm-2.1 18h1.7L7.9 3.8H6.1L16.1 20z"/></svg></a>
            <a href="https://www.pinterest.com/troypait/touch-up-solutions/" target="_blank" rel="noopener" aria-label="Pinterest"><svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 2 4.4 2 9.1c0 2.2 1.2 4.9 3.1 5.8.3.1.4 0 .5-.3l.4-1.5c0-.2 0-.3-.1-.5-.6-.7-1-1.9-1-3 0-2.9 2.2-5.7 5.7-5.7 3.1 0 5.3 2.1 5.3 5.1 0 3.4-1.7 5.8-4 5.8-1.2 0-2.2-1-1.9-2.3.3-1.5 1-3.1 1-4.2 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.3c-.4 1.8-.1 4.1 0 4.3 0 .1.2.2.3.1.1-.1 1.9-2.3 2.4-4.5l1-3.7c.5.9 1.8 1.6 3.2 1.6 4.2 0 7.1-3.8 7.1-9C22 3.9 18.4 0 12 0z"/></svg></a>
            <a href="https://www.youtube.com/user/touchupsolutions/featured" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.5c-.3-1.1-1-1.8-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4C2 5.7 1.3 6.4 1 7.5.6 9.4.6 12 .6 12s0 2.6.4 4.5c.3 1.1 1 1.8 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4c1.1-.3 1.8-1 2.1-2.1.4-1.9.4-4.5.4-4.5s0-2.6-.4-4.5zM9.7 15.4V8.6l6 3.4-6 3.4z"/></svg></a>
            <a href="https://www.instagram.com/touchupsolutions/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4.1.6c-.8.3-1.4.7-2.1 1.4C1.3 2.7.9 3.3.6 4.1.3 4.8.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c0 1.3.2 2.2.5 2.9.3.8.7 1.4 1.4 2.1.7.7 1.3 1.1 2.1 1.4.7.3 1.6.5 2.9.5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3 0 2.2-.2 2.9-.5.8-.3 1.4-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.7.5-1.6.5-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c0-1.3-.2-2.2-.5-2.9-.3-.8-.7-1.4-1.4-2.1-.7-.7-1.3-1.1-2.1-1.4-.7-.3-1.6-.5-2.9-.5C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Here to Help</h5>
          <ul>
            <li><a href="resources.html#faq">FAQs</a></li>
            <li><a href="resources.html">Shipping</a></li>
            <li><a href="resources.html">Terms &amp; Conditions</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Get Introduced</h5>
          <ul>
            <li><a href="resources.html">About Us</a></li>
            <li><a href="resources.html">Contact Us</a></li>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Sign In</a></li>
            <li><a href="#">View Cart</a></li>
            <li><a href="#">Order Status</a></li>
          </ul>
        </div>
        <div class="footer-col footer-news">
          <h5>Newsletter Sign Up</h5>
          <p>Stay updated on new products and How To guides.</p>
          <form class="news-form">
            <input type="email" placeholder="Your email" aria-label="Email address" required />
            <button class="btn btn--primary btn--sm" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Touch Up Solutions</span>
        <span class="legal"><a href="#">Privacy Notice</a><a href="#">Cookies</a></span>
      </div>
    </div>
  </footer>

  <!-- ===================== CART DRAWER ===================== -->
  <div class="cart-overlay" data-cart-overlay></div>
  <aside class="cart-drawer" data-cart-drawer aria-label="Shopping cart">
    <div class="cart-head">
      <h3>Your Cart</h3>
      <button class="cart-close" data-cart-close aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-items" data-cart-items></div>
    <div class="cart-foot">
      <div class="cart-subtotal"><span>Subtotal</span><span data-cart-subtotal>$0.00</span></div>
      <p class="cart-note">Shipping &amp; tax calculated at checkout.</p>
      <a class="btn btn--primary btn--block" href="checkout.html">Checkout</a>
      <button class="btn btn--secondary btn--block" data-cart-close>Continue Shopping</button>
    </div>
  </aside>
  <div class="toast" data-toast role="status" aria-live="polite"></div>

  <script src="products.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;

/* ---------- page wrapper ---------- */
function page(file, title, desc, body) {
  const html = head(title, desc) + header + '\n  <main>\n' + body + '\n  </main>\n' + footer;
  fs.writeFileSync(path.join(OUT, file), html);
  console.log('wrote', file);
}

/* ---------- helpers ---------- */
const SWATCHES = ['sw-wood-1','sw-wood-2','sw-wood-3','sw-neutral','sw-leather-1','sw-metal-1','sw-wood-2','sw-neutral'];

function productCard(cat, name, desc, foot, swatch) {
  return `<article class="product-card">
            <div class="product-swatch ${swatch}"><span class="tag">${cat}</span></div>
            <div class="product-body">
              <span class="p-cat">${cat}</span>
              <h4>${name}</h4>
              <p>${desc}</p>
              <div class="product-foot">${foot}</div>
            </div>
          </article>`;
}

function shadeHex(hex, f) {
  const h = hex.replace('#', '');
  const r = Math.round(parseInt(h.substr(0, 2), 16) * f);
  const g = Math.round(parseInt(h.substr(2, 2), 16) * f);
  const b = Math.round(parseInt(h.substr(4, 2), 16) * f);
  return `rgb(${r},${g},${b})`;
}
/* Quote-only card (no fabricated price) — renders a Request a Quote action */
function quoteCard(tag, title, desc, color) {
  return `<article class="product-card">
            <div class="product-swatch" style="background:linear-gradient(135deg,${color},${shadeHex(color, 0.72)})"><span class="tag">${tag}</span></div>
            <div class="product-body">
              <span class="p-cat">${tag}</span>
              <h4>${title}</h4>
              <p>${desc}</p>
              <div class="product-foot"><button class="btn btn--secondary btn--sm" data-quote="${title}">Request a Quote</button></div>
            </div>
          </article>`;
}

function breadcrumb(parts) {
  // parts: array of {label, href} ; last is current
  let out = '<nav class="breadcrumb" aria-label="Breadcrumb">';
  parts.forEach((p, i) => {
    if (i > 0) out += '<span class="sep">/</span>';
    if (p.href) out += `<a href="${p.href}">${p.label}</a>`;
    else out += `<span class="current">${p.label}</span>`;
  });
  out += '</nav>';
  return out;
}

function pageHero(crumbs, eyebrow, h1, sub) {
  return `
    <section class="page-hero">
      <div class="grain-overlay"></div>
      <div class="container">
        ${breadcrumb(crumbs)}
        <span class="eyebrow">${eyebrow}</span>
        <h1>${h1}</h1>
        <p>${sub}</p>
      </div>
    </section>`;
}

/* =========================================================
   INDEX
   ========================================================= */
const indexBody = `
    <!-- SECTION 1 · HERO -->
    <section class="hero">
      <div class="hero-noise"></div>
      <div class="container">
        <div class="hero-copy reveal">
          <img class="hero-logo" src="tuslogo.png" alt="Touch Up Solutions" width="280" height="165" />
          <span class="eyebrow">Quality Touch Up &amp; Repair</span>
          <h1>Manufacturing, Distributing, Selling, and <span class="accent">Supporting</span></h1>
          <p class="sub">Quality touch up and repair for furniture, flooring, leather, vinyl, and metal — built for professionals and home users alike.</p>
          <div class="hero-cta">
            <a class="btn btn--primary" href="home-user-shop.html">Shop Home User</a>
            <a class="btn btn--ghost-light" href="industrial-shop.html">Shop Industrial</a>
          </div>
        </div>
        <div class="material-stack reveal">
          <article class="material-card"><span class="swatch swatch--wood"></span><h3>Wood &amp; Furniture Repair</h3><p>Fill sticks, markers, burn-in products.</p></article>
          <article class="material-card"><span class="swatch swatch--leather"></span><h3>Leather &amp; Vinyl Repair</h3><p>Pigmented repair, topcoats, cleaners.</p></article>
          <article class="material-card"><span class="swatch swatch--metal"></span><h3>Metal Repair</h3><p>Epoxy sticks, enamel, topcoat.</p></article>
        </div>
      </div>
    </section>

    <!-- SECTION 2 · STAT STRIP -->
    <section class="stat-strip">
      <div class="container">
        <div class="stat-grid reveal-group">
          <div class="stat"><div class="num">30<span class="plus">+</span></div><div class="label">Years in Business</div></div>
          <div class="stat"><div class="num">3</div><div class="label">Repair Categories</div></div>
          <div class="stat"><div class="num">100<span class="plus">+</span></div><div class="label">Product SKUs</div></div>
          <div class="stat"><div class="num">5</div><div class="label">Brand Programs</div></div>
        </div>
      </div>
    </section>

    <!-- SECTION 3 · PRODUCT CATEGORIES -->
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">Our Products</span>
          <h2>Everything You Need for a Perfect Repair</h2>
          <p>We manufacture, distribute, sell, and support quality touch up and repair products for wood, laminate, leather, vinyl, metal, and plastic.</p>
        </div>
        <div class="card-grid-3 reveal-group">
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6c4 2 14 2 18 0M3 12c4 2 14 2 18 0M3 18c4 2 14 2 18 0"></path></svg></span>
            <h3>Wood Repair</h3>
            <p>Fill sticks, burn-in sticks, touch up markers, adhesives, aerosols, powders, putty, and more for furniture and flooring.</p>
            <a class="link-arrow" href="wood-repair.html">Shop Wood Repair</a>
          </article>
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"></rect><path d="M4 9h16M9 4v16"></path></svg></span>
            <h3>Leather &amp; Vinyl Repair</h3>
            <p>Pigmented repair kits, aniline repair, glaze, topcoats, cleaners, and accessories for leather and vinyl surfaces.</p>
            <a class="link-arrow" href="leather-repair.html">Shop Leather Repair</a>
          </article>
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2l3 5 5 1-3.5 4 1 5.5L12 19l-5.5 2.5 1-5.5L4 8l5-1z"></path></svg></span>
            <h3>Metal Repair</h3>
            <p>Metal epoxy sticks, enamel, and topcoat solutions for lasting metal surface restoration.</p>
            <a class="link-arrow" href="metal-repair.html">Shop Metal Repair</a>
          </article>
        </div>
        <div class="secondary-links reveal">
          <a class="link-arrow" href="products.html">Browse All Products</a>
          <a class="link-arrow" href="videos.html">Watch Demo Videos</a>
        </div>
      </div>
    </section>

    <!-- SECTION 4 · DUAL PATHS -->
    <section class="dual">
      <div class="dual-half dual-half--home reveal">
        <span class="eyebrow">For Home Users</span>
        <h3>Furniture &amp; Floor Touch-Ups Made Easy</h3>
        <p>Our home user shop carries everything a homeowner needs — fill sticks, furniture markers, and complete touch-up kits that deliver professional results without the learning curve.</p>
        <div class="path-links"><span>Furniture Fill Sticks</span><span>Furniture Markers</span><span>Furniture Touch Up Kits</span></div>
        <a class="btn btn--primary" href="home-user-shop.html">Shop Home User</a>
      </div>
      <div class="dual-half dual-half--industrial reveal">
        <span class="eyebrow">For Industrial Users</span>
        <h3>Professional-Grade Products for the Trade</h3>
        <p>Our industrial shop carries the full professional line — every adhesive, burn-in stick, leather repair system, epoxy, aerosol, and accessory a trade professional needs.</p>
        <div class="path-links"><span>Wood Repair</span><span>Leather Repair</span><span>Metal Repair</span><span>Accessories</span></div>
        <a class="btn btn--primary" href="industrial-shop.html">Shop Industrial</a>
      </div>
    </section>

    <!-- SECTION 5 · WHAT WE DO -->
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Capabilities</span>
          <h2>More Than Just Products</h2>
          <p>In addition to our product lines, Touch Up Solutions offers:</p>
        </div>
        <div class="feature-grid reveal-group">
          <div class="feature"><span class="f-num">1</span><div><h4>Color Matching</h4><p>Custom color matching to fit any finish.</p></div></div>
          <div class="feature"><span class="f-num">2</span><div><h4>Custom Packaging</h4><p>Private label and custom package solutions.</p></div></div>
          <div class="feature"><span class="f-num">3</span><div><h4>Private Labeling</h4><p>Your brand, our quality manufacturing.</p></div></div>
          <div class="feature"><span class="f-num">4</span><div><h4>Touch-Up Training</h4><p>Training programs for professional technicians.</p></div></div>
          <div class="feature"><span class="f-num">5</span><div><h4>Brand Programs</h4><p>Dedicated programs for Baker, Dar Ran, Ethan Allen, Fairfield Chair, and Tafisa.</p></div></div>
          <div class="feature"><span class="f-num">6</span><div><h4>How To Support</h4><p>Guides and videos covering every technique.</p></div></div>
        </div>
      </div>
    </section>

    <!-- SECTION 6 · HOW TO STRIP -->
    <section class="section-pad section-dark">
      <div class="grain-overlay"></div>
      <div class="container" style="position:relative;z-index:1;">
        <div class="section-head section-head--dark reveal">
          <span class="eyebrow">How To Guides</span>
          <h2>Learn the Right Techniques</h2>
        </div>
        <div class="howto-strip-grid reveal-group">
          <article class="howto-card"><span class="eyebrow">Wood Repair</span><h4>Touch Up Wood Kitchen Cabinets</h4><p>Restore cabinet doors, frames, and edges with the right fill sticks and markers.</p><a class="link-arrow" href="howto-cabinets.html">Read Guide</a></article>
          <article class="howto-card"><span class="eyebrow">Furniture Repair</span><h4>Touch Up Scratches on Furniture</h4><p>Conceal scratches on wood furniture with the correct technique and product.</p><a class="link-arrow" href="howto-furniture.html">Read Guide</a></article>
          <article class="howto-card"><span class="eyebrow">Floor Repair</span><h4>Repair Laminate Flooring</h4><p>Fix chips, cracks, and gouges in laminate panels with fill sticks.</p><a class="link-arrow" href="howto-laminate-repair.html">Read Guide</a></article>
          <article class="howto-card"><span class="eyebrow">Technique</span><h4>Use Burn-In Sticks</h4><p>Professional-grade burn-in repair for furniture and flooring damage.</p><a class="link-arrow" href="howto-burnin-sticks.html">Read Guide</a></article>
        </div>
        <div class="cta-center reveal"><a class="btn btn--secondary" href="howto.html">View All How To Guides</a></div>
      </div>
    </section>

    <!-- SECTION 7 · PROGRAMS CALLOUT -->
    <section class="section-pad bg-parchment">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">Brand Programs</span>
          <h2>Dedicated Touch-Up Programs</h2>
          <p>We offer custom touch-up programs tailored to specific manufacturer finishes. Current programs include:</p>
        </div>
        <div class="program-pills reveal-group" style="justify-content:center;">
          <a class="pill" href="programs.html">Baker</a>
          <a class="pill" href="programs.html">Dar Ran</a>
          <a class="pill" href="programs.html#ethan-allen">Ethan Allen</a>
          <a class="pill" href="programs.html">Fairfield Chair</a>
          <a class="pill" href="programs.html">Tafisa</a>
        </div>
        <div class="cta-center reveal"><a class="btn btn--primary" href="programs.html">View All Programs</a></div>
      </div>
    </section>

    <!-- SECTION 8 · VIDEO STRIP -->
    <section class="section-pad section-espresso">
      <div class="grain-overlay"></div>
      <div class="container" style="position:relative;z-index:1;">
        <div class="section-head section-head--dark section-head--center reveal">
          <span class="eyebrow">Demo Videos</span>
          <h2>See the Products in Action</h2>
          <p>Watch our step-by-step demo videos to see exactly how our products perform.</p>
        </div>
        <div class="video-grid reveal-group">
          ${[VIDEOS[0], VIDEOS[1], VIDEOS[5]].map(videoCard).join('\n          ')}
        </div>
        <div class="cta-center reveal"><a class="btn btn--secondary" href="videos.html">Browse All Videos</a></div>
      </div>
    </section>

    <!-- SECTION 9 · NEWSLETTER + CATALOG -->
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="split-callout reveal">
          <div class="callout-pane callout-pane--news">
            <span class="eyebrow">Newsletter Sign Up</span>
            <h3>Stay in the Loop</h3>
            <p>Get notified about new products and How To guides.</p>
            <form class="news-form"><input type="email" placeholder="Your email address" aria-label="Email address" required /><button class="btn btn--primary" type="submit">Subscribe</button></form>
          </div>
          <div class="callout-pane callout-pane--catalog">
            <span class="eyebrow">Resources</span>
            <h3>Safety Data Sheets &amp; Guides</h3>
            <p>Access SDS documents, How-To guides, and demo videos for the full product line.</p>
            <a class="btn btn--primary" href="resources.html">View Resources</a>
          </div>
        </div>
      </div>
    </section>`;

page('index.html', 'Touch Up Solutions — Quality Touch Up &amp; Repair for Wood, Leather &amp; Metal',
  'Touch Up Solutions manufactures, distributes, sells, and supports quality touch up and repair products for furniture, flooring, leather, vinyl, and metal — for professionals and home users.',
  indexBody);

/* =========================================================
   HOWTO HUB
   ========================================================= */
const howtoGuides = [
  ['howto-cabinets.html','Wood Repair','Touch Up Wood Kitchen Cabinets','Restore the finish on wood kitchen cabinet doors, frames, and edges using the right fill sticks and markers.'],
  ['howto-furniture.html','Furniture Repair','Touch Up Scratches on Furniture','Remove or conceal scratches on wood furniture with the correct technique and product for the finish type.'],
  ['howto-laminate-repair.html','Floor Repair','Repair Laminate Flooring','Fix chips, cracks, and gouges in laminate flooring panels using fill sticks and color-matched products.'],
  ['howto-laminate-scratches.html','Floor Repair','Repair Scratches on Laminate Floor','Address surface-level scratches on laminate floors quickly with the right marker or fill stick technique.'],
  ['howto-burnin-knife.html','Technique','Use Burn-In Knife','Master burn-in knife technique for filling deep gouges and chips in wood and laminate surfaces.'],
  ['howto-burnin-sticks.html','Technique','Use Burn-In Sticks','Learn proper burn-in stick application for professional-grade repair of furniture and flooring damage.'],
  ['howto-metal-epoxy.html','Metal Repair','Use Metal Epoxy','Apply metal epoxy correctly for strong, lasting repairs on metal furniture, fixtures, and surfaces.'],
  ['howto-touch-up-paint.html','Paint Application','Use Touch Up Paint','Apply touch up paint evenly for invisible color matching on furniture, cabinets, and trim.'],
];

const howtoBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'How To'}],'Technique Library','How To Guides','Step-by-step instructions for every repair application — from kitchen cabinets to laminate flooring.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="howto-hub-grid reveal-group">
          ${howtoGuides.map(g => `<a class="guide-card" href="${g[0]}"><span class="eyebrow">${g[1]}</span><h3>${g[2]}</h3><p>${g[3]}</p><span class="link-arrow">Read Guide</span></a>`).join('\n          ')}
        </div>
      </div>
    </section>
    <section class="section-pad section-espresso">
      <div class="grain-overlay"></div>
      <div class="container center" style="position:relative;z-index:1;">
        <div class="reveal">
          <span class="eyebrow">Prefer to Watch?</span>
          <h2 style="color:var(--cream);">See Every Technique on Video</h2>
          <p class="lead" style="color:rgba(248,243,236,.7);max-width:560px;margin:14px auto 28px;">Our demo videos walk through each repair step-by-step so you can follow along at your own pace.</p>
          <a class="btn btn--primary" href="videos.html">Browse Demo Videos</a>
        </div>
      </div>
    </section>`;
page('howto.html','How To Guides — Touch Up Solutions','Step-by-step instructions for every repair application — from kitchen cabinets to laminate flooring, burn-in technique to metal epoxy.', howtoBody);

/* =========================================================
   INDIVIDUAL HOWTO PAGES
   ========================================================= */
const howtoContent = {
  'howto-cabinets.html': {
    eyebrow:'Wood Repair', title:'Touch Up Wood Kitchen Cabinets',
    intro:'Kitchen cabinets take daily wear — scuffs on edges, scratches near handles, and worn finish on high-touch frames. With the right markers and fill sticks, you can restore a factory-quality finish without refinishing the whole door.',
    needs:['Touch Up Markers','Fill Sticks','Burn-In Sticks','Soft lint-free cloth','Clear topcoat (optional)'],
    steps:['Clean the surface thoroughly to remove grease and residue.','Identify the finish type and sheen of the cabinet.','Select the correct color marker or fill stick to match.','Apply the product in the direction of the wood grain.','Blend the edges so the repair disappears into the surrounding finish.','Allow the repair to dry completely.','Apply a clear topcoat if needed to match the original sheen.'],
    tips:['Always test your color on a hidden area first — door edges or interior frames.','Work in thin layers and build color gradually for the most natural blend.','Wipe excess immediately; dried product is harder to feather out.'],
    related:['howto-furniture.html','howto-burnin-sticks.html','howto-touch-up-paint.html']
  },
  'howto-furniture.html': {
    eyebrow:'Furniture Repair', title:'Touch Up Scratches on Furniture',
    intro:'Wood furniture scratches range from light surface marks to deep gouges. Matching the right product to the depth of the damage is the difference between a visible patch and an invisible repair.',
    needs:['Touch Up Markers','Fill Sticks','Putty','Soft cloth','Fine abrasive pad'],
    steps:['Assess the scratch depth — surface level versus deep gouge.','Clean the area to remove dust, polish, and oils.','For surface scratches, apply a color-matched marker.','For deep scratches, press a fill stick into the void.','Work in thin layers, letting each set before the next.','Blend and level the repair flush with the surrounding surface.','Finish with a topcoat to lock in the color and sheen.'],
    tips:['Match to the lightest tone in the grain, then deepen — it is easier to darken than lighten.','Use a putty for chips and dents, a marker for hairline scratches.','Buff lightly with a soft cloth to unify the sheen.'],
    related:['howto-cabinets.html','howto-burnin-knife.html','howto-touch-up-paint.html']
  },
  'howto-laminate-repair.html': {
    eyebrow:'Floor Repair', title:'Repair Laminate Flooring',
    intro:'Laminate flooring resists wear but is vulnerable to chips and gouges from dropped objects and furniture. Fill products and color matching restore the panel without replacing the plank.',
    needs:['Fill Sticks','Burn-In Sticks','Epoxy Sticks','Leveling tool','Color-matched marker'],
    steps:['Clean the damaged area and remove any loose debris.','Melt or press the fill product into the void.','Level the fill flush with the surrounding surface.','Color match the repair with a marker.','Seal the edges so moisture cannot penetrate.','Buff the area to match the floor sheen.'],
    tips:['Choose a fill product rated for floor traffic and durability.','Match the repair to the panel pattern, not just a solid color.','Seal thoroughly — unsealed repairs in flooring fail fastest.'],
    related:['howto-laminate-scratches.html','howto-burnin-sticks.html','howto-burnin-knife.html']
  },
  'howto-laminate-scratches.html': {
    eyebrow:'Floor Repair', title:'Repair Scratches on Laminate Floor',
    intro:'Surface scratches on laminate floors are quick to fix with the right marker or fill stick. The key is light, gradual application that builds to a seamless match.',
    needs:['Touch Up Markers','Fill Sticks','Dry cloth','Cleaning solvent'],
    steps:['Clean the surface to remove dirt and floor polish.','Select the closest color marker to the floor finish.','Apply with light strokes along the scratch.','Build color gradually until the scratch disappears.','Blend with a dry cloth to even the sheen.','Allow the repair to set before walking on it.'],
    tips:['Less is more — over-applying makes scratches more visible, not less.','Work in natural light to judge the color match accurately.','Keep a matching marker on hand for quick future touch-ups.'],
    related:['howto-laminate-repair.html','howto-furniture.html','howto-burnin-sticks.html']
  },
  'howto-burnin-knife.html': {
    eyebrow:'Technique', title:'Use Burn-In Knife',
    intro:'The burn-in knife is the professional standard for filling deep gouges and chips. Proper heat control and leveling technique produce a repair that is both structural and invisible.',
    needs:['Burn-In Knife','Burn-In Sticks','Leveling solution','Heat source','Fine abrasive'],
    steps:['Heat the knife to the proper working temperature.','Select the correct burn-in stick color for the repair.','Apply melted filler from the knife into the repair void.','Overfill the area slightly to allow for leveling.','Level the fill flush with the knife edge.','Color match the surface as needed.','Finish and seal the repair.'],
    tips:['Too hot scorches the filler; too cool drags it — dial in the temperature on scrap first.','Keep the blade clean between passes for a smooth level.','Always overfill slightly; it is easier to remove than to add.'],
    related:['howto-burnin-sticks.html','howto-laminate-repair.html','howto-furniture.html']
  },
  'howto-burnin-sticks.html': {
    eyebrow:'Technique', title:'Use Burn-In Sticks',
    intro:'Burn-in sticks deliver durable, color-matched fills for furniture and flooring damage. With a heat source and steady technique, they produce professional-grade repairs.',
    needs:['Burn-In Sticks','Heat source','Leveling solution','Fine abrasive pad','Soft cloth'],
    steps:['Select a color-matched stick for the repair.','Apply heat to melt the stick into the repair.','Fill the void completely, working from the center out.','Level the surface flush with the surroundings.','Sand lightly if needed to refine the level.','Touch up the color to perfect the match.','Seal the repair to protect and unify the sheen.'],
    tips:['Blend two stick colors to dial in an exact match.','Work the filler while warm — it levels far more cleanly.','Finish with a compatible topcoat for lasting durability.'],
    related:['howto-burnin-knife.html','howto-cabinets.html','howto-laminate-repair.html']
  },
  'howto-metal-epoxy.html': {
    eyebrow:'Metal Repair', title:'Use Metal Epoxy',
    intro:'Metal epoxy sticks create strong, lasting repairs on metal furniture, fixtures, and surfaces. The two-part formula bonds and cures to a hard, shapeable, paintable finish.',
    needs:['Metal Epoxy Sticks','Abrasives','Gloves','Shaping tool','Topcoat (optional)'],
    steps:['Clean and abrade the metal surface for adhesion.','Break off the correct amount of epoxy for the repair.','Knead the two-part epoxy until the color is uniform.','Apply the epoxy firmly to the repair area.','Shape the epoxy before it begins to cure.','Allow the full cure time per the product instructions.','Sand and finish the cured repair smooth.','Apply a topcoat if color matching is required.'],
    tips:['Knead thoroughly — unmixed epoxy will not cure to full strength.','Work quickly once mixed; cure time starts immediately.','Abrade the surface well; epoxy bonds to texture, not polish.'],
    related:['howto-touch-up-paint.html','howto-burnin-sticks.html','howto-furniture.html']
  },
  'howto-touch-up-paint.html': {
    eyebrow:'Paint Application', title:'Use Touch Up Paint',
    intro:'Touch up paint delivers invisible color matching on furniture, cabinets, and trim — when applied with the right preparation and a light, layered technique.',
    needs:['Touch Up Paint','Brushes','Thinner / Solvent','Lint-free cloth','Clear coat'],
    steps:['Clean the surface to remove dust, grease, and old polish.','Test the color match on a hidden area.','Thin the paint slightly if necessary for smooth flow.','Apply a thin first coat with a fine brush.','Allow the first coat to dry completely.','Apply a second coat if needed for full coverage.','Blend the edges into the surrounding finish.','Seal with a clear coat to match the sheen.'],
    tips:['Thin coats always beat one heavy coat — they level and blend better.','Feather the edges outward so there is no visible paint line.','Match the sheen with your clear coat, not just the color.'],
    related:['howto-cabinets.html','howto-metal-epoxy.html','howto-furniture.html']
  },
};

const guideTitleMap = Object.fromEntries(howtoGuides.map(g => [g[0], {cat:g[1], title:g[2], desc:g[3]}]));

Object.keys(howtoContent).forEach(file => {
  const c = howtoContent[file];
  const relatedCards = c.related.map(r => {
    const g = guideTitleMap[r];
    return `<a class="guide-card" href="${r}"><span class="eyebrow">${g.cat}</span><h3>${g.title}</h3><p>${g.desc}</p><span class="link-arrow">Read Guide</span></a>`;
  }).join('\n            ');

  const body = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'How To',href:'howto.html'},{label:c.title}], c.eyebrow, c.title, c.intro)}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="layout-sidebar">
          <div class="guide-body reveal">
            <p class="intro">${c.intro}</p>
            <div class="label">What You'll Need</div>
            <ul class="need-list">
              ${c.needs.map(n => `<li>${n}</li>`).join('\n              ')}
            </ul>
            <div class="label">Step-by-Step Instructions</div>
            <ol class="steps">
              ${c.steps.map(s => `<li>${s}</li>`).join('\n              ')}
            </ol>
            <div class="label">Pro Tips</div>
            <ul class="tips">
              ${c.tips.map(t => `<li>${t}</li>`).join('\n              ')}
            </ul>
          </div>
          <aside class="reveal">
            <div class="sidebar-wrap">
              <div class="sidebar-card">
                <span class="eyebrow">Related Products</span>
                <h4>Get the Right Supplies</h4>
                <p>Shop the exact products used in this guide.</p>
                <ul>
                  <li><a href="industrial-shop.html">Industrial User Shop</a></li>
                  <li><a href="home-user-shop.html">Home User Shop</a></li>
                </ul>
                <a class="btn btn--primary btn--sm btn--block" href="products.html">Browse Products</a>
              </div>
              <div class="sidebar-card">
                <span class="eyebrow">Related Videos</span>
                <h4>Watch It Done</h4>
                <p>See this technique demonstrated step-by-step on video.</p>
                <a class="btn btn--secondary btn--sm btn--block" href="videos.html">Watch Demo Videos</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="section-pad bg-parchment">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">Keep Going</span><h2>Related Guides</h2></div>
        <div class="related-grid reveal-group">
            ${relatedCards}
        </div>
      </div>
    </section>`;
  page(file, c.title + ' — How To — Touch Up Solutions', c.intro.replace(/"/g,'&quot;').slice(0,155), body);
});

/* =========================================================
   PRODUCTS
   ========================================================= */
const markerCards = [
  ['Wood Tone Marker','Precision wood-tone marker for cabinets and furniture edges.','sw-wood-1'],
  ['Furniture Marker Set','A versatile set covering the most common furniture finishes.','sw-wood-2'],
  ['Laminate Floor Marker','Color-matched marker formulated for laminate flooring.','sw-wood-3'],
  ['Light Oak Marker','Warm light-oak shade for natural wood finishes.','sw-neutral'],
  ['Dark Walnut Marker','Deep walnut tone for rich, dark wood surfaces.','sw-leather-1'],
  ['Cherry Finish Marker','Classic cherry tone for traditional furniture.','sw-wood-2'],
];
const productsBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Products'}],'Full Product Line','Products','Browse our complete line of touch up and repair products for wood, leather, vinyl, and metal — built for home users and trade professionals.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="card-grid-3 reveal-group">
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6c4 2 14 2 18 0M3 12c4 2 14 2 18 0M3 18c4 2 14 2 18 0"></path></svg></span>
            <h3>Wood Repair</h3>
            <p>The complete wood and furniture repair line for professionals and homeowners.</p>
            <ul class="sub-list"><li>Adhesives</li><li>Aerosols</li><li>Burn-In Sticks</li><li>Edging Sticks</li><li>Epoxy Sticks</li><li>Fill Sticks</li><li>Touch Up Markers</li><li>Pencils</li><li>Powders</li><li>Powder Sticks</li><li>Putty</li></ul>
            <a class="link-arrow" href="wood-repair.html">Shop Wood Repair</a>
          </article>
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"></rect><path d="M4 9h16M9 4v16"></path></svg></span>
            <h3>Leather &amp; Vinyl Repair</h3>
            <p>Pigmented and aniline systems for restoring leather and vinyl surfaces.</p>
            <ul class="sub-list"><li>Markers</li><li>Fill Sticks</li><li>Pigmented Repair</li><li>Pigmented Glaze</li><li>Aniline Repair</li><li>Background Repair</li><li>Topcoats</li><li>Cleaners &amp; Solvents</li><li>Accessories</li></ul>
            <a class="link-arrow" href="leather-repair.html">Shop Leather Repair</a>
          </article>
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2l3 5 5 1-3.5 4 1 5.5L12 19l-5.5 2.5 1-5.5L4 8l5-1z"></path></svg></span>
            <h3>Metal Repair</h3>
            <p>Durable epoxy, enamel, and topcoat solutions for metal surfaces.</p>
            <ul class="sub-list"><li>Metal Epoxy Sticks</li><li>Metal Enamel</li><li>Metal Topcoat</li></ul>
            <a class="link-arrow" href="metal-repair.html">Shop Metal Repair</a>
          </article>
        </div>
      </div>
    </section>
    <section class="section-pad bg-parchment" id="markers">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Markers</span>
          <h2>Touch Up Markers</h2>
          <p>Touch Up Solutions markers are designed for precision color matching and easy application on wood, furniture, and flooring surfaces.</p>
        </div>
        <div class="product-grid product-grid--6 reveal-group">
          ${markerCards.map(m => productCard('Marker', m[0], m[1], `<button class="btn btn--secondary btn--sm" data-quote="${m[0]}">Request a Quote</button>`, m[2])).join('\n          ')}
        </div>
      </div>
    </section>
    <section class="dual">
      <div class="dual-half dual-half--home reveal">
        <span class="eyebrow">For Home Users</span>
        <h3>Furniture &amp; Floor Touch-Ups Made Easy</h3>
        <p>Everything a homeowner needs — fill sticks, furniture markers, and complete touch-up kits that deliver professional results without the learning curve.</p>
        <div class="path-links"><span>Furniture Fill Sticks</span><span>Furniture Markers</span><span>Furniture Touch Up Kits</span></div>
        <a class="btn btn--primary" href="home-user-shop.html">Shop Home User</a>
      </div>
      <div class="dual-half dual-half--industrial reveal">
        <span class="eyebrow">For Industrial Users</span>
        <h3>Professional-Grade Products for the Trade</h3>
        <p>The full professional line — every adhesive, burn-in stick, leather repair system, epoxy, aerosol, and accessory a trade professional needs.</p>
        <div class="path-links"><span>Wood Repair</span><span>Leather Repair</span><span>Metal Repair</span><span>Accessories</span></div>
        <a class="btn btn--primary" href="industrial-shop.html">Shop Industrial</a>
      </div>
    </section>`;
page('products.html','Products — Touch Up Solutions','Browse our complete line of touch up and repair products for wood, leather, vinyl, and metal — built for home users and trade professionals.', productsBody);

/* =========================================================
   HOME USER SHOP + sub-pages
   ========================================================= */
const homeShopBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Home User Shop'}],'For Homeowners','Home User Shop','Easy-to-use touch up products for homeowners. Professional quality, simple application.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="card-grid-3 reveal-group">
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3h6l8 8-6 6-8-8V3z"></path><circle cx="8" cy="6" r="1"></circle></svg></span>
            <h3>Furniture Fill Sticks</h3>
            <p>Color-matched fill sticks for covering scratches, chips, and gouges on wood furniture and surfaces.</p>
            <ul class="sub-list"><li>Light Tones</li><li>Medium Tones</li><li>Dark Tones</li></ul>
            <a class="link-arrow" href="home-fill-sticks.html">Shop Fill Sticks</a>
          </article>
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 17l9-9 4 4-9 9H3v-4z"></path><path d="M14 6l3-3 4 4-3 3"></path></svg></span>
            <h3>Furniture Markers</h3>
            <p>Touch up markers for fast, precise color repair on wood furniture, cabinets, and floors.</p>
            <ul class="sub-list"><li>Oak</li><li>Walnut</li><li>Cherry</li><li>Maple</li></ul>
            <a class="link-arrow" href="home-markers.html">Shop Markers</a>
          </article>
          <article class="cat-card">
            <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M3 11h18M9 7V4h6v3"></path></svg></span>
            <h3>Furniture Touch Up Kits</h3>
            <p>Complete touch up kits with everything needed to repair common furniture damage.</p>
            <ul class="sub-list"><li>Starter Kit</li><li>Complete Kit</li><li>Floor Kit</li></ul>
            <a class="link-arrow" href="home-touchup-kits.html">Shop Kits</a>
          </article>
        </div>
      </div>
    </section>
    <section class="section-pad section-espresso">
      <div class="grain-overlay"></div>
      <div class="container center" style="position:relative;z-index:1;">
        <div class="reveal">
          <span class="eyebrow">Not Sure Where to Start?</span>
          <h2 style="color:var(--cream);">Our Guides Make It Simple</h2>
          <p class="lead" style="color:rgba(248,243,236,.7);max-width:560px;margin:14px auto 28px;">Browse step-by-step How To guides and demo videos for every common home repair.</p>
          <div class="hero-cta" style="justify-content:center;"><a class="btn btn--primary" href="howto.html">View How To Guides</a><a class="btn btn--ghost-light" href="videos.html">Watch Videos</a></div>
        </div>
      </div>
    </section>`;
page('home-user-shop.html','Home User Shop — Touch Up Solutions','Easy-to-use touch up products for homeowners. Professional quality, simple application — fill sticks, furniture markers, and complete touch up kits.', homeShopBody);

function homeSubPage(file, type, h1, desc, content, relatedLinks) {
  const grid = content.shop
    ? `<div data-shop="${content.shop}"${content.only ? ` data-only="${content.only}"` : ''}></div>`
    : `<div class="product-grid reveal-group">\n              ${content.quote.map(c => quoteCard(c[0], c[1], c[2], c[3])).join('\n              ')}\n            </div>`;
  const body = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Home User Shop',href:'home-user-shop.html'},{label:type}],'Home User Shop',h1,desc)}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="layout-sidebar">
          <div class="reveal">
            ${grid}
          </div>
          <aside class="reveal">
            <div class="sidebar-card">
              <span class="eyebrow">How To</span>
              <h4>Need Application Help?</h4>
              <p>Follow our step-by-step guides to get professional results.</p>
              <ul>
                ${relatedLinks.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('\n                ')}
              </ul>
              <a class="btn btn--secondary btn--sm btn--block" href="howto.html">All How To Guides</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="section-pad bg-parchment">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">You May Also Like</span><h2>Related Products</h2></div>
        <div class="card-grid-3 reveal-group">
          <a class="cat-card" href="home-fill-sticks.html"><h3>Furniture Fill Sticks</h3><p>Color-matched fill sticks for scratches, chips, and gouges.</p><span class="link-arrow">Shop Fill Sticks</span></a>
          <a class="cat-card" href="home-markers.html"><h3>Furniture Markers</h3><p>Fast, precise color repair markers for wood surfaces.</p><span class="link-arrow">Shop Markers</span></a>
          <a class="cat-card" href="home-touchup-kits.html"><h3>Touch Up Kits</h3><p>Complete kits with everything you need in one box.</p><span class="link-arrow">Shop Kits</span></a>
        </div>
      </div>
    </section>`;
  page(file, h1 + ' — Home User Shop — Touch Up Solutions', desc, body);
}

homeSubPage('home-fill-sticks.html','Furniture Fill Sticks','Furniture Fill Sticks',
  'Color-matched fill sticks for covering scratches, chips, and gouges on wood furniture and surfaces. Easy to apply, no heat required.',
  { shop: 'home-fill-sticks' },
  [['howto-furniture.html','Touch Up Scratches on Furniture'],['howto-cabinets.html','Touch Up Wood Cabinets'],['howto-burnin-sticks.html','Use Burn-In Sticks']]);

homeSubPage('home-markers.html','Furniture Markers','Furniture Markers',
  'Touch up markers for fast, precise color repair on wood furniture, cabinets, and floors.',
  { shop: 'home-markers' },
  [['howto-laminate-scratches.html','Repair Scratches on Laminate'],['howto-furniture.html','Touch Up Furniture'],['howto-cabinets.html','Touch Up Cabinets']]);

homeSubPage('home-touchup-kits.html','Furniture Touch Up Kits','Furniture Touch Up Kits',
  'Complete touch up kits combine markers, fill sticks, and tools for common furniture repairs — color-matched and ready to use.',
  { shop: 'home-touchup-kits' },
  [['howto-cabinets.html','Touch Up Cabinets'],['howto-furniture.html','Touch Up Furniture'],['howto-laminate-repair.html','Repair Laminate Flooring']]);

/* =========================================================
   INDUSTRIAL SHOP + sub-pages
   ========================================================= */
const industrialBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Industrial User Shop'}],'For Professionals','Industrial User Shop','The complete professional line — every product a trade technician needs for wood, leather, vinyl, and metal repair.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="card-grid-2 reveal-group">
          <article class="cat-card">
            <h3>Wood Repair</h3>
            <p>The full professional wood and furniture repair system.</p>
            <ul class="sub-list"><li>Adhesives</li><li>Aerosols</li><li>Burn-In Sticks</li><li>Edging Sticks</li><li>Epoxy Sticks</li><li>Fill Sticks</li><li>Touch Up Markers</li><li>Pencils</li><li>Powders</li><li>Powder Sticks</li><li>Putty</li></ul>
            <a class="link-arrow" href="wood-repair.html">Shop Wood Repair</a>
          </article>
          <article class="cat-card">
            <h3>Leather Repair</h3>
            <p>Complete leather and vinyl restoration systems.</p>
            <ul class="sub-list"><li>Leather/Vinyl Markers</li><li>Fill Sticks</li><li>Pigmented Repair</li><li>Pigmented Glaze</li><li>Aniline Repair</li><li>Background Repair</li><li>Topcoats</li><li>Cleaners and Solvents</li><li>Accessories</li></ul>
            <a class="link-arrow" href="leather-repair.html">Shop Leather Repair</a>
          </article>
          <article class="cat-card">
            <h3>Metal Repair</h3>
            <p>Industrial-grade metal restoration products.</p>
            <ul class="sub-list"><li>Metal Epoxy Sticks</li><li>Metal Enamel</li><li>Metal Topcoat</li></ul>
            <a class="link-arrow" href="metal-repair.html">Shop Metal Repair</a>
          </article>
          <article class="cat-card">
            <h3>Accessories</h3>
            <p>Every tool and accessory for the trade.</p>
            <ul class="sub-list"><li>Abrasives</li><li>Adhesive Accessories</li><li>Aerosol Accessories</li><li>Brushes</li><li>Burn-In Accessories</li><li>Containers</li><li>Fill Stick Accessories</li><li>Leather Accessories</li><li>Lubes/Cleaners/Polishes</li><li>Marker Accessories</li><li>Powder Accessories</li><li>Spray Systems</li></ul>
            <a class="link-arrow" href="accessories.html">Shop Accessories</a>
          </article>
        </div>
      </div>
    </section>
    <section class="section-pad bg-parchment">
      <div class="container">
        <div class="split-callout reveal">
          <div class="callout-pane callout-pane--news">
            <span class="eyebrow">Trade Accounts</span>
            <h3>Request a Quote</h3>
            <p>Get professional pricing on bulk and recurring orders. Tell us what your shop needs.</p>
            <a class="btn btn--primary" href="#">Request a Quote</a>
          </div>
          <div class="callout-pane callout-pane--catalog">
            <span class="eyebrow">Safety Data Sheets</span>
            <h3>SDS for Every Product</h3>
            <p>Download Safety Data Sheets for the complete professional line, organized by category.</p>
            <a class="btn btn--primary" href="resources.html#sds">View Safety Data Sheets</a>
          </div>
        </div>
      </div>
    </section>`;
page('industrial-shop.html','Industrial User Shop — Touch Up Solutions','The complete professional line — every product a trade technician needs for wood, leather, vinyl, and metal repair.', industrialBody);

function industrialSubPage(file, cat, h1, desc, subs, content, guides) {
  const isShop = !!content.shop;
  // Real-catalog pages let the renderer build its own filter pills; quote pages keep static pills.
  const pills = isShop ? '' : `<div class="filter-pills reveal">
          <button class="filter-pill active">All</button>
          ${subs.map(s => `<button class="filter-pill">${s}</button>`).join('\n          ')}
        </div>`;
  const grid = isShop
    ? `<div data-shop="${content.shop}"${content.only ? ` data-only="${content.only}"` : ''}></div>`
    : `<div class="product-grid reveal-group">\n              ${content.quote.map(c => quoteCard(c[0], c[1], c[2], c[3])).join('\n              ')}\n            </div>`;
  const note = content.note ? `<p class="lead" style="margin-top:26px;color:var(--stone);font-size:1rem;">${content.note}</p>` : '';
  const body = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Industrial User Shop',href:'industrial-shop.html'},{label:cat}],'Professional Line',h1,desc)}
    <section class="section-pad bg-cream">
      <div class="container">
        ${pills}
        <div class="layout-sidebar">
          <div class="reveal">
            ${grid}
            ${note}
          </div>
          <aside class="reveal">
            <div class="sidebar-card">
              <span class="eyebrow">How To</span>
              <h4>Application Guides</h4>
              <p>Reference our professional technique guides for this category.</p>
              <ul>
                ${guides.map(g => `<li><a href="${g[0]}">${g[1]}</a></li>`).join('\n                ')}
              </ul>
              <a class="btn btn--secondary btn--sm btn--block" href="howto.html">All How To Guides</a>
            </div>
            <div class="sidebar-card">
              <span class="eyebrow">Trade Pricing</span>
              <h4>Request a Quote</h4>
              <p>Professional pricing for bulk and recurring orders.</p>
              <a class="btn btn--primary btn--sm btn--block" href="#">Request a Quote</a>
            </div>
          </aside>
        </div>
      </div>
    </section>`;
  page(file, h1 + ' — Industrial User Shop — Touch Up Solutions', desc, body);
}

industrialSubPage('wood-repair.html','Wood Repair','Wood Repair',
  'The full professional wood and furniture repair line — adhesives, aerosols, burn-in sticks, edging sticks, epoxy sticks, fill sticks, touch up markers, pencils, powders, powder sticks, and putty. Use the category filters to browse; every item is priced and ready to order.',
  ['Adhesives','Aerosols','Burn In Sticks','Edging Sticks','Epoxy Sticks','Fill Sticks','Touch Up Markers','Pencils','Powders','Powder Sticks','Putty'],
  { shop: 'wood-repair' },
  [['howto-cabinets.html','Touch Up Wood Cabinets'],['howto-burnin-sticks.html','Use Burn-In Sticks'],['howto-burnin-knife.html','Use Burn-In Knife']]);

industrialSubPage('leather-repair.html','Leather Repair','Leather &amp; Vinyl Repair',
  'Complete leather and vinyl restoration — markers, fill sticks, pigmented and aniline repair, glaze, background repair, topcoats, cleaners, and accessories. Use the category filters to browse; every item is priced and ready to order.',
  [],
  { shop: 'leather-repair' },
  [['howto-furniture.html','Surface Repair Technique'],['howto-touch-up-paint.html','Use Touch Up Paint'],['howto-metal-epoxy.html','Use Metal Epoxy']]);

industrialSubPage('metal-repair.html','Metal Repair','Metal Repair',
  'Industrial-grade metal restoration — metal epoxy sticks, enamel, and topcoat. Use the category filters to browse; every item is priced and ready to order.',
  [],
  { shop: 'metal-repair' },
  [['howto-metal-epoxy.html','Use Metal Epoxy'],['howto-touch-up-paint.html','Use Touch Up Paint'],['howto-burnin-sticks.html','Use Burn-In Sticks']]);

industrialSubPage('accessories.html','Accessories','Accessories',
  'Every tool and accessory for the trade — abrasives, brushes, containers, spray systems, and the supporting supplies that keep a repair shop running. Use the category filters to browse; every item is priced and ready to order.',
  [],
  { shop: 'accessories' },
  [['howto-burnin-knife.html','Use Burn-In Knife'],['howto-touch-up-paint.html','Use Touch Up Paint'],['howto-metal-epoxy.html','Use Metal Epoxy']]);

/* =========================================================
   PROGRAMS
   ========================================================= */
const eaList = "138 Auburn,139 Normandy,149 Fontaine,205 Newport,208 Chai,210 Toast,213 Russet,214 Wheat,215 Fawn,216 Bordeaux,223 Weathered Pine,224 Autumn Cherry,225 Vintage,227 Cinnamon,230 Bisque,232 Mushroom,234 Praire,235 Sienna,237 Butterscotch,246 Provence,247 Carmel,252 Mahogany,253 English Toffee,254 Antique Mahogany,255 Natural,257 Spice,260 Cinnibar,275 Sepia,277 Caraway,280 Sand,282 Canyon,283 Espresso,284 Autumn Maple,288 Henna,290 Mesquite,290T Toffee,292D Dune,292 Sierra,294 Chocolate,295 Sable,296 Mocha,303 Aged Poppy,304 Aged Teal,305 Aged Ember,309 V. Zebrawood,310 Claret,311 Southport Antique,312 Mushroom with Glaze,314/309 V. Mahogany Flat Swan,320 Amber,321F V. Mahogany Flat Swan,321M V. Mozambique,321S V. Swirl Mahogany,330 Ebony,331 Clove,332 Verona,339 Mink,340 Derby,355 Truffle,356 Sparrow,357 Rustique,373 Savanna,374 Darjeeling,384 Gingerbread,386 Chanterelle,388 Lute,390 Viola,393 V. Primavera,399 Saddle,407 French Roast,412 Sheer Black,420 Hartland,421 Fairfax,422 Summit,430 Henley,431 Hastings,432 Sutton,433 Precott,435 Oxford,440 Westbury,441 Ashton,442 Dover,446 Carlisle,447 Andover,448 Stafford,449 Chadwick,450 Vintage Pine,453 Dark Pine,470 Rustic,471 Fleur De Lis,471C Cider,474 Cinnamon,480 Chestnut Brown,490 Chocolate,492 Almond,508 Terra,512 Tiger's Eye,530 Chinoiserie,530G Chinoiserie Gold,538 Abbey,559 Angelica,570 Belmont,571 Hazelnut,578 Butter Nut,583 Java,605 Water Lily,606 Hand-Decorated,607 Seafoam,609 Bard Red,610 Cotton,612 Charcoal,613 Cinder,619 White,622 Antique Black,626 Black Satin,627 Creme,630 Linen,645 Raven,647 Brittany,652 Swedish Home Ink,656 Gardenia,657 Swedish Home Blue,658 Glacier,659 Carbon,662 French Gray,662W Whad Soft Maple,667 Denim Blue,668 Forest Green,669 Cranberry,670 Antique White,688 Hunter Green,689 Bone White,690 Vanilla,695 Fire Engine,696 Navy Blue,697 Butter Yellow,698 Periwinkle,741 Piccolo,743 Mirrored Piccolo,748 Robins Egg Blue,750 Cirrus White,758 Weathered Black,761 Timeworn Black,775 V. Mahogany Flat Swan,776 Poppyseed,790 V. Mahogany Flat Swan,793 V. Mahogany Flat Swan,794 V. Mahogany Flat Swan,871 Bermuda Chair,872 Berwick,873 Palm Grove,874 Fiji,906 Finish,940 Cream,941 Honey,942 Truffle,943 Acorn,944 Sedona,945 Northwood,946 Black,950 Parchment,951 Puritan Select,952 Cambridge,953 Sienna Select,954 Manor Select,955 Woodcliff,956 Ebony,C10 Geranium,C11 Raspberry,C20 Tangerine,C30 Sunflower,C40 Apple Green,C50 Kelly Green,C60 Turquoise,C61 Chambray Blue,C70 Marine Blue,C71 Ink,C91 Dove Gray".split(',');

// deterministic swatch color per finish (no Math.random at runtime — generated at build)
function eaColor(name) {
  const n = name.toLowerCase();
  const map = [
    ['black','#1c1714'],['ebony','#1a140f'],['espresso','#2c1c12'],['chocolate','#3a2516'],['mahogany','#5a2618'],
    ['walnut','#4a2e1a'],['java','#2a1c12'],['carbon','#2b2b2b'],['charcoal','#33312e'],['raven','#26211c'],
    ['white','#efe9df'],['cream','#ece2cf'],['creme','#ece2cf'],['parchment','#e6dcc6'],['bone','#e4dccb'],['cotton','#efe9dd'],['linen','#e8dfcc'],['vanilla','#ecdfc2'],
    ['oak','#b78a4e'],['honey','#cf9a4e'],['amber','#c4882a'],['toast','#a9743c'],['caramel','#b07a3e'],['carmel','#b07a3e'],['wheat','#cda766'],['fawn','#c2a172'],['sand','#cbb288'],['bisque','#d8c39c'],['natural','#c9a878'],
    ['cherry','#7a3322'],['auburn','#7a3a22'],['russet','#8a4a2c'],['sienna','#9c5a32'],['cinnamon','#9a5a30'],['sienna','#9c5a32'],['bordeaux','#5a2020'],['claret','#5e2424'],['poppy','#7a2e22'],['red','#7a2420'],['cranberry','#6e2226'],['geranium','#9a3024'],['raspberry','#8a2a3a'],
    ['mocha','#5a4030'],['sable','#4a382a'],['mink','#6a5648'],['truffle','#4e3a2c'],['sepia','#5a4636'],['mushroom','#8a7a66'],['mesquite','#6a4a30'],['henna','#8a4428'],['spice','#9a5a34'],['butterscotch','#c08a3e'],['gingerbread','#8a5630'],['chestnut','#5e3620'],['acorn','#6a4528'],['sedona','#a05a34'],
    ['forest','#2e4030'],['hunter','#2a3c2a'],['green','#3a5a34'],['teal','#2e4a4a'],['turquoise','#2a6a6a'],['seafoam','#7a9a8a'],['glacier','#9ab0b0'],
    ['navy','#22304a'],['blue','#3a4a6a'],['denim','#3e5070'],['marine','#244060'],['ink','#22283a'],['periwinkle','#7a82b0'],['chambray','#6a7a9a'],['robins','#7aa8b8'],
    ['gray','#8a847c'],['grey','#8a847c'],['dove','#a8a299'],['cinder','#4a4642'],['cirrus','#dcd8cf'],
    ['yellow','#d8b24a'],['sunflower','#d8a838'],['butter','#d8c060'],['tangerine','#c87434'],['apple','#7a9a3a'],['kelly','#3a7a3a'],
  ];
  for (const [k,v] of map) { if (n.includes(k)) return v; }
  // fallback warm wood mid-tone, varied by code length
  const tones = ['#9a6a3a','#7a5230','#b08048','#6a4628','#a8703c','#8a5a34'];
  return tones[name.length % tones.length];
}

const eaChips = eaList.map(item => {
  const sp = item.indexOf(' ');
  const code = item.slice(0, sp);
  const nm = item.slice(sp + 1);
  return `<div class="ea-chip" data-search="${item.toLowerCase()}"><span class="dot" style="background:${eaColor(nm)}"></span><span><span class="code">${code}</span> <span class="name">${nm}</span></span></div>`;
}).join('\n          ');

const programsBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Programs'}],'Brand Programs','Brand Programs','Touch Up Solutions offers dedicated touch-up programs for leading furniture manufacturers. Custom color-matched products for specific brand finishes.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="card-grid-3 reveal-group">
          <article class="program-card"><span class="eyebrow">Program</span><div class="brand">Baker</div><p>A complete touch-up program for Baker Furniture finishes. Color-matched markers, fill sticks, and repair solutions.</p><a class="btn btn--secondary btn--sm" href="#">View Baker Program</a></article>
          <article class="program-card"><span class="eyebrow">Program</span><div class="brand">Dar Ran</div><p>Custom touch-up products matched to Dar Ran Furniture collection finishes.</p><a class="btn btn--secondary btn--sm" href="#">View Dar Ran Program</a></article>
          <article class="program-card"><span class="eyebrow">Flagship Program</span><div class="brand">Ethan Allen</div><p>The most comprehensive program in our portfolio — covering the full Ethan Allen finish library across hundreds of color codes.</p><a class="btn btn--primary btn--sm" href="#ethan-allen">View Ethan Allen Program</a></article>
          <article class="program-card"><span class="eyebrow">Program</span><div class="brand">Fairfield Chair</div><p>Dedicated touch-up products for Fairfield Chair Company finishes.</p><a class="btn btn--secondary btn--sm" href="#">View Fairfield Chair Program</a></article>
          <article class="program-card"><span class="eyebrow">Program</span><div class="brand">Tafisa</div><p>Custom color-matched repair solutions for Tafisa laminate and panel finishes.</p><a class="btn btn--secondary btn--sm" href="#">View Tafisa Program</a></article>
          <article class="program-card" style="background:var(--espresso);color:var(--cream);border-color:rgba(196,136,42,.3);"><span class="eyebrow">Custom</span><div class="brand" style="color:var(--cream);">Your Brand</div><p style="color:rgba(248,243,236,.7);">Need a dedicated program for your manufacturer finishes? We build custom color-matched lines.</p><a class="btn btn--primary btn--sm" href="#">Contact Us</a></article>
        </div>
      </div>
    </section>
    <section class="section-pad bg-parchment" id="ethan-allen">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Ethan Allen Finish Library</span>
          <h2>Find Your Ethan Allen Finish</h2>
          <p>Search the complete Ethan Allen finish library by name or code. Every finish is available as a color-matched touch-up product.</p>
        </div>
        <div class="ea-search-wrap reveal">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
          <input type="search" class="ea-search" placeholder="Search by finish name or code..." aria-label="Search Ethan Allen finishes" />
        </div>
        <p class="ea-count"></p>
        <div class="ea-grid">
          ${eaChips}
        </div>
        <div class="ea-empty">No finishes match your search. Try a different name or code.</div>
      </div>
    </section>`;
page('programs.html','Brand Programs — Touch Up Solutions','Dedicated touch-up programs for Baker, Dar Ran, Ethan Allen, Fairfield Chair, and Tafisa — custom color-matched products for specific brand finishes.', programsBody);

/* =========================================================
   VIDEOS
   ========================================================= */
const videosBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Videos'}],'Demo Videos','Demo Videos','Watch step-by-step demonstrations of our products in action — every video links straight to the full demo on our YouTube channel.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="video-grid reveal-group">
          ${VIDEOS.map(videoCard).join('\n          ')}
        </div>
        <div class="cta-center reveal"><a class="btn btn--primary" href="${YT_CHANNEL}" target="_blank" rel="noopener">Visit our YouTube Channel</a></div>
      </div>
    </section>`;
page('videos.html','Demo Videos — Touch Up Solutions','Watch step-by-step demonstrations of Touch Up Solutions products in action — fill sticks, burn-in, markers, toners, powders, and more.', videosBody);

/* =========================================================
   RESOURCES
   ========================================================= */
const faqs = [
  ['What types of surfaces do your products work on?','Wood, laminate, leather, vinyl, metal, and plastic.'],
  ['Do you offer color matching?','Yes — we offer custom color matching services. Contact us for details.'],
  ['Do you offer private labeling?','Yes — we offer private label and custom packaging options.'],
  ['Do you offer Touch-Up Training?','Yes — contact us to inquire about training programs.'],
  ['What are your shipping options?','See our Shipping page for current options and rates.'],
  ['How do I find the right product for my repair?','Use our How To guides or contact us directly.'],
  ['Do you ship internationally?','Contact us for international shipping inquiries.'],
];
const SDS_ORDER = ['Adhesives','Aerosols','Burn-In Sticks','Edging Sticks','Epoxy Sticks','Fill Sticks',
  'Markers','Pencils','Powders','Powder Sticks','Putty','Lube / Cleaners / Polishes','Leather / Vinyl','Metal'];
const dlIcon = '<svg class="dl-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>';
const sdsTotal = SDS_ORDER.reduce((n, c) => n + ((SDS[c] || []).length), 0);
const sdsGroups = SDS_ORDER.filter(c => SDS[c] && SDS[c].length).map(cat => {
  const items = SDS[cat];
  const links = items.map(it =>
    `<a class="sds-link" href="${it.url}" target="_blank" rel="noopener"><span class="pdf-ico">PDF</span><span class="sds-name">${it.label}</span>${dlIcon}</a>`
  ).join('\n            ');
  return `<div class="sds-card"><h3>${cat}</h3><span class="sds-count">${items.length} sheet${items.length > 1 ? 's' : ''}</span><div class="sds-list">\n            ${links}\n          </div></div>`;
}).join('\n          ');

const resourcesBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Resources'}],'Help &amp; Support','Resources','Everything you need to get the most out of Touch Up Solutions products — Safety Data Sheets, How-To guides, demo videos, and answers to common questions.')}
    <section class="section-pad bg-cream">
      <div class="container">
        <div class="card-grid-4 reveal-group">
          <a class="cat-card" href="#sds"><span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4M9 13h6M9 17h6"></path></svg></span><h3>Safety Data Sheets</h3><p>Download SDS documents for every product line, organized by category.</p><span class="link-arrow">View SDS Library</span></a>
          <a class="cat-card" href="howto.html"><span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16M4 12h16M4 19h10"></path></svg></span><h3>How To Guides</h3><p>Step-by-step instructions for every repair application.</p><span class="link-arrow">View Guides</span></a>
          <a class="cat-card" href="videos.html"><span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M10 9l5 3-5 3z"></path></svg></span><h3>Demo Videos</h3><p>Watch our products in action with technique demonstrations.</p><span class="link-arrow">Watch Videos</span></a>
          <a class="cat-card" href="#faq"><span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.5 2.5 0 1 1 3 2.4c-.8.3-1 .8-1 1.6M12 17h.01"></path></svg></span><h3>FAQs</h3><p>Answers to common questions about products, shipping, and ordering.</p><span class="link-arrow">View FAQs</span></a>
        </div>
      </div>
    </section>
    <section class="section-pad bg-parchment" id="sds">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Safety Data Sheets</span>
          <h2>SDS Library</h2>
          <p>Download Safety Data Sheets for the full Touch Up Solutions product line — ${sdsTotal} documents across ${SDS_ORDER.filter(c => SDS[c]).length} categories. Click any sheet to open the PDF.</p>
        </div>
        <div class="sds-groups reveal-group">
          ${sdsGroups}
        </div>
      </div>
    </section>
    <section class="section-pad bg-cream" id="faq">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">Frequently Asked</span>
          <h2>Questions &amp; Answers</h2>
        </div>
        <div class="faq-list reveal">
          ${faqs.map(f => `<div class="faq-item"><button class="faq-q" aria-expanded="false">${f[0]}<span class="icon" aria-hidden="true"></span></button><div class="faq-a"><p>${f[1]}</p></div></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
page('resources.html','Resources &amp; SDS — Touch Up Solutions','Download Safety Data Sheets for every Touch Up Solutions product line, plus How-To guides, demo videos, and FAQs.', resourcesBody);

/* Catalogs page removed per spec — replaced by the SDS library on Resources. */

/* =========================================================
   CHECKOUT
   ========================================================= */
const checkoutBody = `
    ${pageHero([{label:'Home',href:'index.html'},{label:'Checkout'}],'Secure Checkout','Checkout','Review your order and complete your purchase. Shipping is a flat rate for this store.')}
    <section class="section-pad bg-cream">
      <div class="container" data-checkout>
        <div class="checkout-grid" data-checkout-grid>
          <div class="checkout-form-card" data-checkout-form>
            <form novalidate>
              <div class="form-section-label">Contact</div>
              <div class="form-row"><label for="co-name">Full name</label><input id="co-name" name="name" autocomplete="name" required /></div>
              <div class="form-row"><label for="co-email">Email address</label><input id="co-email" type="email" name="email" autocomplete="email" required /></div>

              <div class="form-section-label">Shipping address</div>
              <div class="form-row"><label for="co-addr">Street address</label><input id="co-addr" name="address" autocomplete="street-address" required /></div>
              <div class="form-grid-2">
                <div class="form-row"><label for="co-city">City</label><input id="co-city" name="city" autocomplete="address-level2" required /></div>
                <div class="form-row"><label for="co-state">State</label><input id="co-state" name="state" autocomplete="address-level1" required /></div>
              </div>
              <div class="form-grid-2">
                <div class="form-row"><label for="co-zip">ZIP code</label><input id="co-zip" name="zip" inputmode="numeric" autocomplete="postal-code" required /></div>
                <div class="form-row"><label for="co-country">Country</label>
                  <select id="co-country" name="country"><option>United States</option><option>Canada</option><option>Other</option></select>
                </div>
              </div>

              <div class="form-section-label">Payment</div>
              <div class="form-row"><label for="co-card">Card number</label><input id="co-card" name="card" inputmode="numeric" placeholder="0000 0000 0000 0000" autocomplete="cc-number" required /></div>
              <div class="form-grid-2">
                <div class="form-row"><label for="co-exp">Expiration</label><input id="co-exp" name="exp" placeholder="MM / YY" autocomplete="cc-exp" required /></div>
                <div class="form-row"><label for="co-cvc">CVC</label><input id="co-cvc" name="cvc" inputmode="numeric" placeholder="123" autocomplete="cc-csc" required /></div>
              </div>

              <button class="btn btn--primary btn--block" type="submit" style="margin-top:8px;">Place Order</button>
              <p class="checkout-note">Demo checkout — no real payment is processed and no card data is stored.</p>
            </form>
          </div>

          <div class="checkout-summary-card">
            <h3>Order Summary</h3>
            <div data-checkout-summary></div>
          </div>
        </div>

        <div class="checkout-confirmed" data-checkout-confirmed>
          <div class="confirm-check" aria-hidden="true"></div>
          <h2>Order Confirmed</h2>
          <p>Thank you for your order. A confirmation email is on its way.</p>
          <div class="order-meta">
            <div><div class="lbl">Order No.</div><div class="val" data-order-no>—</div></div>
            <div><div class="lbl">Total Paid</div><div class="val" data-order-total>—</div></div>
          </div>
          <div><a class="btn btn--primary" href="wood-repair.html">Continue Shopping</a></div>
        </div>
      </div>
    </section>`;
page('checkout.html','Checkout — Touch Up Solutions','Review your order and complete your purchase at Touch Up Solutions.', checkoutBody);

console.log('\\nDone. All pages generated.');
