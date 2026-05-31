# TASK: Touch Up Solutions — Full Website Rebuild
**Deliverable:** Multi-page static website (HTML/CSS/JS) — production-ready pitch build
**Client:** Touch Up Solutions | touchupsolutions.com
**Reference structure:** Higgins Digital site architecture (multi-page HTML/CSS/JS with shared nav/footer)

---

## OBJECTIVE

Build a complete, modern redesign of the Touch Up Solutions website. The client's current site is a legacy e-commerce platform with outdated UI, overwhelming dropdown navigation, and no visual brand identity. This rebuild must feel like a premium trade/craft brand — confident, warm, tactile — while being easy to navigate for both home consumers and industrial buyers. Every page must be fully functional HTML. This is a pitch build: every pixel must impress.

---

## DESIGN DIRECTION

### Aesthetic
**Tone:** Warm industrial luxury. Think: high-end tool brand meets premium woodworking craft. Earthy, confident, textured — not sterile or corporate.

### Color Palette (use as CSS variables in `:root`)
```css
--walnut:     #1E1208;   /* primary dark — header, footer, deep sections */
--espresso:   #2C1A0E;   /* cards, section backgrounds */
--bark:       #4A2E1A;   /* secondary dark accents */
--amber:      #C4882A;   /* primary accent — CTAs, highlights, hover states */
--amber-light:#E8A840;   /* hover state for amber elements */
--cream:      #F8F3EC;   /* main body background */
--parchment:  #EDE5D8;   /* alt section background */
--stone:      #8C7B6A;   /* muted text, borders */
--charcoal:   #2D2D2D;   /* body text */
--white:      #FFFFFF;
```

### Typography (load from Google Fonts)
- **Display / H1-H2:** `Playfair Display` — serif, authoritative, warm
- **Headings H3-H4:** `DM Sans` — modern, clean, readable
- **Body / UI:** `DM Sans`
- **Labels / Eyebrows:** `DM Sans` uppercase, letter-spacing: 0.12em, font-size: 0.72rem

### Visual Details
- Subtle wood-grain SVG/CSS texture overlay on dark sections (low opacity: 0.04)
- Thin amber (`--amber`) horizontal rule lines as section dividers
- Product cards: `--cream` background, `1px solid #D4C4B0` border, hover lifts with amber underline accent
- Buttons: Primary = amber fill, dark text. Secondary = transparent with amber border
- Nav: Sticky, dark walnut background, logo left, links center, utility icons right
- Mega-menu dropdowns: full-width panel, warm espresso background, organized in columns
- Scroll-triggered fade-up animations for section reveals (Intersection Observer)
- Smooth page transitions

---

## FILE STRUCTURE

```
touchup-solutions/
├── index.html                  (Home)
├── products.html               (Products overview + Markers)
├── howto.html                  (How To hub)
├── howto-cabinets.html
├── howto-furniture.html
├── howto-laminate-repair.html
├── howto-laminate-scratches.html
├── howto-burnin-knife.html
├── howto-burnin-sticks.html
├── howto-metal-epoxy.html
├── howto-touch-up-paint.html
├── home-user-shop.html         (Home User Shop hub)
├── home-fill-sticks.html
├── home-markers.html
├── home-touchup-kits.html
├── industrial-shop.html        (Industrial User Shop hub)
├── wood-repair.html
├── leather-repair.html
├── metal-repair.html
├── accessories.html
├── programs.html               (Programs overview)
├── videos.html
├── resources.html
├── catalogs.html
├── styles.css                  (Global styles — ALL pages share this)
├── script.js                   (Global JS — nav, animations, interactions)
└── assets/
    └── (no real images needed — use CSS gradients + placeholder divs)
```

---

## GLOBAL COMPONENTS (styles.css + script.js)

### Sticky Navigation Header
Structure: fixed top, full-width, `--walnut` background, 64px height on desktop / 56px mobile.

Left: Touch Up Solutions logo (text-based SVG or styled wordmark — amber TUS monogram + "Touch Up Solutions" in Playfair Display, cream color).

Center nav links (desktop):
- Home
- Products *(mega-menu)*
- How To *(mega-menu)*
- Home User Shop *(mega-menu)*
- Industrial User Shop *(mega-menu)*
- Programs *(mega-menu)*
- Videos
- Resources
- Catalogs

Right utility bar:
- Search icon (opens inline search bar on click)
- Login | Register (text links, small)
- Cart icon with badge (shows "0")
- "Request a Quote" button (amber, pill-shaped)
- "Quick Order" button (transparent, amber border)

Mobile: hamburger menu → full-screen overlay nav in same walnut color, links stacked, mega-menu items expandable with chevron toggles.

### Mega-Menu System
Trigger: hover on desktop, click on mobile. Mega-menu is a full-width panel dropping below the nav bar (not a cramped dropdown). Use CSS `visibility/opacity` transitions, not `display:none` flicker.

**Products mega-menu:**
```
Column 1: Products
  • Markers → /products.html#markers
Column 2: Quick Links
  • View All Products
  • Request a Quote
  • Catalogs
```

**How To mega-menu:**
```
Column 1: Wood & Furniture
  • Touch Up Wood Kitchen Cabinets
  • Touch Up Scratches on Furniture
  • Repair Laminate Flooring
  • Repair Scratches on Laminate Floor
Column 2: Tools & Techniques
  • Use Burn-In Knife
  • Use Burn-In Sticks
  • Use Metal Epoxy
  • Use Touch Up Paint
```

**Home User Shop mega-menu:**
```
Column 1: Shop
  • Furniture Fill Sticks
  • Furniture Markers
  • Furniture Touch Up Kits
Column 2: Resources
  • How To Guides
  • Demo Videos
```

**Industrial User Shop mega-menu:**
```
Column 1: Wood Repair
  • Adhesives | Aerosols | Burn-In Sticks | Edging Sticks
  • Epoxy Sticks | Fill Sticks | Touch Up Markers
  • Pencils | Powders | Powder Sticks | Putty
Column 2: Leather & Metal Repair
  • Leather / Vinyl Markers
  • Leather / Vinyl Fill Sticks
  • Leather / Vinyl Pigmented Repair
  • Leather / Vinyl Pigmented Glaze
  • Leather / Vinyl Aniline Repair
  • Leather / Vinyl Background Repair
  • Leather / Vinyl Topcoats
  • Leather / Vinyl Cleaners and Solvents
  • Leather / Vinyl Accessories
  • Metal Epoxy Sticks | Metal Enamel | Metal Topcoat
Column 3: Accessories
  • Abrasives | Adhesive Accessories | Aerosol Accessories
  • Brushes | Burn-In Accessories | Containers
  • Fill Stick Accessories | Leather Accessories
  • Lubes / Cleaners / Polishes | Marker Accessories
  • Powder Accessories | Spray Systems
```

**Programs mega-menu:**
```
Column 1: Programs
  • Baker
  • Dar Ran
  • Fairfield Chair
  • Tafisa
Column 2: Ethan Allen
  (list first 8 color options as examples, with "View All Ethan Allen →" link)
```

### Footer
4-column layout on dark `--walnut` background:

**Column 1:** Logo + tagline: *"Manufacturing, Distributing, Selling, and Supporting quality touch up and repair."* + social icons (Facebook, Twitter/X, Pinterest, YouTube, Instagram)

**Column 2: Here to Help**
- FAQs
- Shipping
- Terms & Conditions

**Column 3: Get Introduced**
- About Us
- Contact Us
- My Account
- Sign In
- View Cart
- Order Status

**Column 4: Newsletter Sign Up**
- Subtext: "Stay updated on new products and How To guides."
- Email input + Subscribe button (amber)

Bottom bar: thin amber line, then `© 2026 Touch Up Solutions` left | `Privacy Notice · Cookies` right

### Animations (script.js)
Intersection Observer fade-up for all `.reveal` elements:
```js
// Add class="reveal" to sections, cards, headings
// JS adds "visible" class when element enters viewport
// CSS: .reveal { opacity:0; transform: translateY(24px); transition: 0.55s ease; }
//      .reveal.visible { opacity:1; transform: translateY(0); }
```
Stagger children inside `.reveal-group` with `animation-delay` increments of 80ms.

Smooth scroll for all anchor links.

Active nav link detection — add `.active` class to current page's nav link.

---

## PAGE SPECIFICATIONS

---

### 1. index.html — HOME

#### Section 1: Hero
Full-viewport hero. Background: layered CSS — `--walnut` base + a subtle radial amber glow center-left + fine noise texture overlay (CSS or inline SVG filter).

Left side (60%):
- Eyebrow label: `QUALITY TOUCH UP & REPAIR`
- H1: `Manufacturing, Distributing, Selling, and Supporting` (Playfair Display, cream, 56px desktop)
- Subheading: `Quality touch up and repair for furniture, flooring, leather, vinyl, and metal — built for professionals and home users alike.`
- Two CTA buttons side by side:
  - `Shop Home User` → home-user-shop.html (amber fill)
  - `Shop Industrial` → industrial-shop.html (transparent, amber border)

Right side (40%): Three stacked "material cards" (angled, overlapping slightly) — thin bordered cards with material names in Playfair + DM Sans description:
- **Wood & Furniture Repair** — Fill sticks, markers, burn-in products
- **Leather & Vinyl Repair** — Pigmented repair, topcoats, cleaners
- **Metal Repair** — Epoxy sticks, enamel, topcoat

#### Section 2: Stat Strip
Full-width `--parchment` background. 4 stats in a row, separated by thin vertical lines:
- `30+` Years in Business
- `3` Repair Categories
- `100+` Product SKUs  
- `5` Brand Programs

#### Section 3: Product Categories
Eyebrow: `OUR PRODUCTS`
H2: `Everything You Need for a Perfect Repair`
Body: `We manufacture, distribute, sell, and support quality touch up and repair products for wood, laminate, leather, vinyl, metal, and plastic.`

3-column product category cards:

**Card 1 — Wood Repair**
- Icon: CSS-drawn grain lines or SVG wood icon
- Title: Wood Repair
- Description: `Fill sticks, burn-in sticks, touch up markers, adhesives, aerosols, powders, putty, and more for furniture and flooring.`
- CTA: `Shop Wood Repair →`

**Card 2 — Leather Repair**
- Title: Leather & Vinyl Repair
- Description: `Pigmented repair kits, aniline repair, glaze, topcoats, cleaners, and accessories for leather and vinyl surfaces.`
- CTA: `Shop Leather Repair →`

**Card 3 — Metal Repair**
- Title: Metal Repair
- Description: `Metal epoxy sticks, enamel, and topcoat solutions for lasting metal surface restoration.`
- CTA: `Shop Metal Repair →`

Below the cards, two secondary links: `View Catalog` | `Watch Demo Videos`

#### Section 4: Dual User Paths
Two-column split section:

**Left half** — `--espresso` background, amber top border:
- Eyebrow: `FOR HOME USERS`
- H3: `Furniture & Floor Touch-Ups Made Easy`
- Description: `Our home user shop carries everything a homeowner needs — fill sticks, furniture markers, and complete touch-up kits that deliver professional results without the learning curve.`
- Product links list: Furniture Fill Sticks · Furniture Markers · Furniture Touch Up Kits
- CTA: `Shop Home User →` → home-user-shop.html

**Right half** — `--bark` background, amber top border:
- Eyebrow: `FOR INDUSTRIAL USERS`
- H3: `Professional-Grade Products for the Trade`
- Description: `Our industrial shop carries the full professional line — every adhesive, burn-in stick, leather repair system, epoxy, aerosol, and accessory a trade professional needs.`
- Product links list: Wood Repair · Leather Repair · Metal Repair · Accessories
- CTA: `Shop Industrial →` → industrial-shop.html

#### Section 5: What We Do
`--cream` background.
Eyebrow: `CAPABILITIES`
H2: `More Than Just Products`
Body intro: `In addition to our product lines, Touch Up Solutions offers:`

Feature grid (2 columns, 3 rows — 6 items):
1. **Color Matching** — Custom color matching to fit any finish.
2. **Custom Packaging** — Private label and custom package solutions.
3. **Private Labeling** — Your brand, our quality manufacturing.
4. **Touch-Up Training** — Training programs for professional technicians.
5. **Brand Programs** — Dedicated programs for Baker, Dar Ran, Ethan Allen, Fairfield Chair, and Tafisa.
6. **How To Support** — Guides and videos covering every technique.

#### Section 6: How To Strip
Dark `--walnut` background. Eyebrow: `HOW TO GUIDES`
H2: `Learn the Right Techniques`
4-card horizontal row (dark cards, amber left border accent):
- Touch Up Wood Kitchen Cabinets
- Touch Up Scratches on Furniture
- Repair Laminate Flooring
- Use Burn-In Sticks
Each card: title + 1-line description + `Read Guide →` link

CTA below: `View All How To Guides →` → howto.html

#### Section 7: Programs Callout
`--parchment` background.
Eyebrow: `BRAND PROGRAMS`
H2: `Dedicated Touch-Up Programs`
Body: `We offer custom touch-up programs tailored to specific manufacturer finishes. Current programs include:`
5 program pills/badges in a row: `Baker` `Dar Ran` `Ethan Allen` `Fairfield Chair` `Tafisa`
CTA: `View All Programs →` → programs.html

#### Section 8: Video Strip
Dark section. Eyebrow: `DEMO VIDEOS`
H2: `See the Products in Action`
Subtext: `Watch our step-by-step demo videos to see exactly how our products perform.`
CTA: `Browse All Videos →` → videos.html

3-card video placeholder grid (dark cards with a centered play-button icon overlay, amber border on hover):
- How to Use Burn-In Sticks
- How to Use Touch Up Paint
- How to Repair Laminate Flooring

#### Section 9: Newsletter + Catalog
Two columns:
Left: Newsletter signup (label: `Newsletter Sign Up`, email input, Subscribe button)
Right: Catalog callout — `Download Our Latest Catalog` + CTA → catalogs.html

---

### 2. products.html — PRODUCTS

#### Hero
H1: `Products` | Breadcrumb: Home > Products
Short description: `Browse our complete line of touch up and repair products for wood, leather, vinyl, and metal — built for home users and trade professionals.`

#### Category Grid
3 large cards (same as homepage but expanded):
- Wood Repair (with subcategory list: Adhesives, Aerosols, Burn-In Sticks, Edging Sticks, Epoxy Sticks, Fill Sticks, Touch Up Markers, Pencils, Powders, Powder Sticks, Putty)
- Leather Repair (subcategories listed)
- Metal Repair (subcategories listed)

#### Section: Markers (id="markers")
H2: `Markers`
Description: `Touch Up Solutions markers are designed for precision color matching and easy application on wood, furniture, and flooring surfaces.`
Grid of marker product placeholder cards (6-up on desktop, 2-up on mobile). Each card: title placeholder, short description, amber "View Product" CTA.

#### Section: Shop by User Type
Same dual-path section as homepage.

---

### 3. howto.html — HOW TO HUB

#### Hero
H1: `How To Guides` | Short description: `Step-by-step instructions for every repair application — from kitchen cabinets to laminate flooring.`

#### 8-Card Grid (links to each sub-page)
Card structure: eyebrow category label, title, 1-2 sentence description, `Read Guide →` link.

1. **Touch Up Wood Kitchen Cabinets** — `howto-cabinets.html`
   Eyebrow: WOOD REPAIR
   Desc: `Restore the finish on wood kitchen cabinet doors, frames, and edges using the right fill sticks and markers.`

2. **Touch Up Scratches on Furniture** — `howto-furniture.html`
   Eyebrow: FURNITURE REPAIR
   Desc: `Remove or conceal scratches on wood furniture with the correct technique and product for the finish type.`

3. **Repair Laminate Flooring** — `howto-laminate-repair.html`
   Eyebrow: FLOOR REPAIR
   Desc: `Fix chips, cracks, and gouges in laminate flooring panels using fill sticks and color-matched products.`

4. **Repair Scratches on Laminate Floor** — `howto-laminate-scratches.html`
   Eyebrow: FLOOR REPAIR
   Desc: `Address surface-level scratches on laminate floors quickly with the right marker or fill stick technique.`

5. **Use Burn-In Knife** — `howto-burnin-knife.html`
   Eyebrow: TECHNIQUE
   Desc: `Master burn-in knife technique for filling deep gouges and chips in wood and laminate surfaces.`

6. **Use Burn-In Sticks** — `howto-burnin-sticks.html`
   Eyebrow: TECHNIQUE
   Desc: `Learn proper burn-in stick application for professional-grade repair of furniture and flooring damage.`

7. **Use Metal Epoxy** — `howto-metal-epoxy.html`
   Eyebrow: METAL REPAIR
   Desc: `Apply metal epoxy correctly for strong, lasting repairs on metal furniture, fixtures, and surfaces.`

8. **Use Touch Up Paint** — `howto-touch-up-paint.html`
   Eyebrow: PAINT APPLICATION
   Desc: `Apply touch up paint evenly for invisible color matching on furniture, cabinets, and trim.`

---

### 4. howto-[slug].html — INDIVIDUAL HOW TO PAGES

All 8 how-to sub-pages share the same template:

Structure:
- Breadcrumb: Home > How To > [Page Title]
- H1: [Guide Title]
- Eyebrow: [Category label]
- Intro paragraph (2-3 sentences describing the repair type and when to use this technique)
- **Step-by-step section:**
  - Section label: `WHAT YOU'LL NEED`
  - Bulleted product list (relevant Touch Up Solutions products for this repair)
  - Section label: `STEP-BY-STEP INSTRUCTIONS`
  - Numbered steps (5-7 steps, clearly written, professional tone)
  - Section label: `PRO TIPS`
  - 2-3 tip bullets
- Sidebar (desktop) or bottom section (mobile): Related Products CTA card + Related Videos CTA card
- Bottom: `Related Guides` — 3 cards linking to other how-to pages

**Page-specific content:**

**howto-cabinets.html**
Products needed: Touch Up Markers, Fill Sticks, Burn-In Sticks
Steps: Clean surface → Identify finish type → Select correct marker or fill stick → Apply product in direction of grain → Blend edges → Allow to dry → Apply topcoat if needed

**howto-furniture.html**
Products needed: Touch Up Markers, Fill Sticks, Putty
Steps: Assess scratch depth (surface vs. deep) → Clean area → For surface scratches use marker → For deep scratches use fill stick → Work in thin layers → Blend and level → Finish with topcoat

**howto-laminate-repair.html**
Products needed: Fill Sticks, Burn-In Sticks, Epoxy Sticks
Steps: Clean damaged area → Melt or press fill product into void → Level flush with surface → Color match with marker → Seal edges → Buff

**howto-laminate-scratches.html**
Products needed: Touch Up Markers, Fill Sticks
Steps: Clean surface → Select closest color marker → Apply with light strokes → Build color gradually → Blend with dry cloth → Allow to set

**howto-burnin-knife.html**
Products needed: Burn-In Knife, Burn-In Sticks, Leveling solution
Steps: Heat knife to proper temperature → Select correct burn-in stick color → Apply melted filler to repair → Overfill slightly → Level with knife → Color match → Finish

**howto-burnin-sticks.html**
Products needed: Burn-In Sticks, Heat source, Leveling solution
Steps: Select color-matched stick → Apply heat to melt into repair → Fill void completely → Level surface → Sand if needed → Touch up color → Seal

**howto-metal-epoxy.html**
Products needed: Metal Epoxy Sticks, Abrasives
Steps: Clean and abrade metal surface → Break off correct epoxy amount → Knead two-part epoxy → Apply to repair area → Shape before cure → Allow full cure time → Sand and finish → Apply topcoat if needed

**howto-touch-up-paint.html**
Products needed: Touch Up Paint, Brushes, Thinner/Solvent
Steps: Clean surface → Test color match → Thin paint if necessary → Apply thin first coat → Allow to dry completely → Apply second coat if needed → Blend edges → Clear coat

---

### 5. home-user-shop.html — HOME USER SHOP

#### Hero
H1: `Home User Shop`
Subtext: `Easy-to-use touch up products for homeowners. Professional quality, simple application.`

#### 3-Category Cards
Each card: title, description, product examples listed, CTA → sub-page

1. **Furniture Fill Sticks** — `home-fill-sticks.html`
   Desc: `Color-matched fill sticks for covering scratches, chips, and gouges on wood furniture and surfaces.`

2. **Furniture Markers** — `home-markers.html`
   Desc: `Touch up markers for fast, precise color repair on wood furniture, cabinets, and floors.`

3. **Furniture Touch Up Kits** — `home-touchup-kits.html`
   Desc: `Complete touch up kits with everything needed to repair common furniture damage.`

#### Sub-pages (home-fill-sticks.html, home-markers.html, home-touchup-kits.html)
Each sub-page:
- Breadcrumb: Home > Home User Shop > [Product Type]
- H1 + description
- Product grid (6 placeholder product cards: name, shade/type, "Add to Cart" button in amber, price placeholder)
- How To sidebar CTA
- Related products strip

---

### 6. industrial-shop.html — INDUSTRIAL USER SHOP

#### Hero
H1: `Industrial User Shop`
Eyebrow: `FOR PROFESSIONALS`
Subtext: `The complete professional line — every product a trade technician needs for wood, leather, vinyl, and metal repair.`

#### 4-Category Section Grid (2x2 layout)

**Wood Repair** → wood-repair.html
Subcategories listed: Adhesives · Aerosols · Burn-In Sticks · Edging Sticks · Epoxy Sticks · Fill Sticks · Touch Up Markers · Pencils · Powders · Powder Sticks · Putty

**Leather Repair** → leather-repair.html
Subcategories listed: Leather/Vinyl Markers · Fill Sticks · Pigmented Repair · Pigmented Glaze · Aniline Repair · Background Repair · Topcoats · Cleaners and Solvents · Accessories

**Metal Repair** → metal-repair.html
Subcategories listed: Metal Epoxy Sticks · Metal Enamel · Metal Topcoat

**Accessories** → accessories.html
Subcategories listed: Abrasives · Adhesive Accessories · Aerosol Accessories · Brushes · Burn-In Accessories · Containers · Fill Stick Accessories · Leather Accessories · Lubes/Cleaners/Polishes · Marker Accessories · Powder Accessories · Spray Systems

#### Sub-pages (wood-repair.html, leather-repair.html, metal-repair.html, accessories.html)
Each sub-page:
- Breadcrumb: Home > Industrial User Shop > [Category]
- H1 + description
- Subcategory filter pills (horizontal scroll on mobile) for each subcategory
- Product grid (8 placeholder cards per page) — each card shows: product name, subcategory label, short spec description, "Request a Quote" CTA
- How To sidebar linking to relevant guides

---

### 7. programs.html — PROGRAMS

#### Hero
H1: `Brand Programs`
Subtext: `Touch Up Solutions offers dedicated touch-up programs for leading furniture manufacturers. Custom color-matched products for specific brand finishes.`

#### Program Cards (5)
Each card: brand name (large, Playfair), description, CTA.

**Baker**
`A complete touch-up program for Baker Furniture finishes. Color-matched markers, fill sticks, and repair solutions.`
CTA: View Baker Program

**Dar Ran**
`Custom touch-up products matched to Dar Ran Furniture collection finishes.`
CTA: View Dar Ran Program

**Ethan Allen**
`The most comprehensive program in our portfolio — covering the full Ethan Allen finish library across hundreds of color codes.`
CTA: View Ethan Allen Program

**Fairfield Chair**
`Dedicated touch-up products for Fairfield Chair Company finishes.`
CTA: View Fairfield Chair Program

**Tafisa**
`Custom color-matched repair solutions for Tafisa laminate and panel finishes.`
CTA: View Tafisa Program

#### Ethan Allen Deep Section
Below the program cards, a dedicated Ethan Allen section with a searchable/filterable grid of color codes. Since there are 100+ Ethan Allen finishes, implement a simple JS filter:
- Input field: `Search by finish name or code...`
- Filters in on `keyup`
- Grid shows color code + name (e.g., `138 Auburn`, `139 Normandy`, etc.)

**Full Ethan Allen color list to include (display as filterable cards):**
138 Auburn · 139 Normandy · 149 Fontaine · 205 Newport · 208 Chai · 210 Toast · 213 Russet · 214 Wheat · 215 Fawn · 216 Bordeaux · 223 Weathered Pine · 224 Autumn Cherry · 225 Vintage · 227 Cinnamon · 230 Bisque · 232 Mushroom · 234 Praire · 235 Sienna · 237 Butterscotch · 246 Provence · 247 Carmel · 252 Mahogany · 253 English Toffee · 254 Antique Mahogany · 255 Natural · 257 Spice · 260 Cinnibar · 275 Sepia · 277 Caraway · 280 Sand · 282 Canyon · 283 Espresso · 284 Autumn Maple · 288 Henna · 290 Mesquite · 290T Toffee · 292D Dune · 292 Sierra · 294 Chocolate · 295 Sable · 296 Mocha · 303 Aged Poppy · 304 Aged Teal · 305 Aged Ember · 309 V. Zebrawood · 310 Claret · 311 Southport Antique · 312 Mushroom with Glaze · 314/309 V. Mahogany Flat Swan · 320 Amber · 321F V. Mahogany Flat Swan · 321M V. Mozambique · 321S V. Swirl Mahogany · 330 Ebony · 331 Clove · 332 Verona · 339 Mink · 340 Derby · 355 Truffle · 356 Sparrow · 357 Rustique · 373 Savanna · 374 Darjeeling · 384 Gingerbread · 386 Chanterelle · 388 Lute · 390 Viola · 393 V. Primavera · 399 Saddle · 407 French Roast · 412 Sheer Black · 420 Hartland · 421 Fairfax · 422 Summit · 430 Henley · 431 Hastings · 432 Sutton · 433 Precott · 435 Oxford · 440 Westbury · 441 Ashton · 442 Dover · 446 Carlisle · 447 Andover · 448 Stafford · 449 Chadwick · 450 Vintage Pine · 453 Dark Pine · 470 Rustic · 471 Fleur De Lis · 471C Cider · 474 Cinnamon · 480 Chestnut Brown · 490 Chocolate · 492 Almond · 508 Terra · 512 Tiger's Eye · 530 Chinoiserie · 530G Chinoiserie Gold · 538 Abbey · 559 Angelica · 570 Belmont · 571 Hazelnut · 578 Butter Nut · 583 Java · 605 Water Lily · 606 Hand-Decorated · 607 Seafoam · 609 Bard Red · 610 Cotton · 612 Charcoal · 613 Cinder · 619 White · 622 Antique Black · 626 Black Satin · 627 Creme · 630 Linen · 645 Raven · 647 Brittany · 652 Swedish Home Ink · 656 Gardenia · 657 Swedish Home Blue · 658 Glacier · 659 Carbon · 662 French Gray · 662W Whad Soft Maple · 667 Denim Blue · 668 Forest Green · 669 Cranberry · 670 Antique White · 688 Hunter Green · 689 Bone White · 690 Vanilla · 695 Fire Engine · 696 Navy Blue · 697 Butter Yellow · 698 Periwinkle · 741 Piccolo · 743 Mirrored Piccolo · 748 Robins Egg Blue · 750 Cirrus White · 758 Weathered Black · 761 Timeworn Black · 775 V. Mahogany Flat Swan · 776 Poppyseed · 790 V. Mahogany Flat Swan · 793 V. Mahogany Flat Swan · 794 V. Mahogany Flat Swan · 871 Bermuda Chair · 872 Berwick · 873 Palm Grove · 874 Fiji · 906 Finish · 940 Cream · 941 Honey · 942 Truffle · 943 Acorn · 944 Sedona · 945 Northwood · 946 Black · 950 Parchment · 951 Puritan Select · 952 Cambridge · 953 Sienna Select · 954 Manor Select · 955 Woodcliff · 956 Ebony · C10 Geranium · C11 Raspberry · C20 Tangerine · C30 Sunflower · C40 Apple Green · C50 Kelly Green · C60 Turquoise · C61 Chambray Blue · C70 Marine Blue · C71 Ink · C91 Dove Gray

---

### 8. videos.html — VIDEOS

#### Hero
H1: `Demo Videos`
Subtext: `Watch step-by-step demonstrations of our products in action — from wood repair to leather restoration.`

#### Video Grid
3-column grid (2-column on tablet, 1-column on mobile). Each video card:
- Large play button icon centered over a dark gradient placeholder (same aspect ratio as 16:9 thumbnail)
- Title (same as How To guide titles where applicable)
- Short description
- Amber "Watch Video" CTA that links to `https://www.youtube.com/user/touchupsolutions/featured` (actual YouTube channel)

Video titles to include:
- How to Touch Up Wood Kitchen Cabinets
- How to Touch Up Scratches on Furniture
- How to Repair Laminate Flooring
- How to Repair Scratches on Laminate Floor
- How to Use a Burn-In Knife
- How to Use Burn-In Sticks
- How to Use Metal Epoxy
- How to Use Touch Up Paint
- Product Overview: Touch Up Solutions Full Line

Below grid: `Visit our YouTube Channel →` link → YouTube URL

---

### 9. resources.html — RESOURCES

#### Hero
H1: `Resources`
Subtext: `Everything you need to get the most out of Touch Up Solutions products — guides, FAQs, shipping info, and more.`

#### 4-Card Resource Grid

**How To Guides**
`Step-by-step instructions for every repair application.`
CTA: View Guides → howto.html

**Demo Videos**
`Watch our products in action with technique demonstrations.`
CTA: Watch Videos → videos.html

**Catalogs**
`Download our latest product catalogs in PDF format.`
CTA: View Catalogs → catalogs.html

**FAQs**
`Answers to common questions about products, shipping, and ordering.`
CTA: View FAQs → (anchor #faq)

#### FAQ Section (id="faq")
Accordion component — each item expands on click, amber indicator line on active.

FAQ items:
- What types of surfaces do your products work on? *Wood, laminate, leather, vinyl, metal, and plastic.*
- Do you offer color matching? *Yes — we offer custom color matching services. Contact us for details.*
- Do you offer private labeling? *Yes — we offer private label and custom packaging options.*
- Do you offer Touch-Up Training? *Yes — contact us to inquire about training programs.*
- What are your shipping options? *See our Shipping page for current options and rates.*
- How do I find the right product for my repair? *Use our How To guides or contact us directly.*
- Do you ship internationally? *Contact us for international shipping inquiries.*

---

### 10. catalogs.html — CATALOGS

#### Hero
H1: `Catalogs`
Subtext: `Download our product catalogs to browse the full Touch Up Solutions line.`

#### Catalog Cards (3-column grid)
Each card: large download icon, catalog title, description, "Download PDF" CTA button (amber).

Card 1: Touch Up Solutions Full Product Catalog
Card 2: Wood Repair Catalog
Card 3: Leather & Vinyl Repair Catalog

Note: CTA buttons link to `#` placeholder — no real PDFs needed for pitch.

Below: Note text — *"Need a printed catalog? Contact us at [Contact Us → contact link]"*

---

## TECHNICAL REQUIREMENTS

### styles.css Architecture
1. CSS custom properties (`:root` variables) at top
2. CSS reset (box-sizing border-box, margin 0, no default list styles)
3. Base typography styles
4. Utility classes: `.reveal`, `.reveal-group`, `.eyebrow`, `.container` (max-width: 1200px, auto margins), `.section-pad` (padding: 80px 0), `.amber-rule` (2px amber line)
5. Component styles in order: header, mega-menu, hero, stat-strip, product-cards, feature-grid, how-to-cards, video-cards, program-cards, faq-accordion, footer
6. Responsive breakpoints: 1024px (tablet), 768px (mobile)
7. NO external CSS frameworks — pure CSS only

### script.js Architecture
1. Sticky header: add `.scrolled` class at 60px scroll (adds subtle box-shadow)
2. Mega-menu: hover intent on desktop (with 150ms delay to prevent flicker), click on mobile
3. Mobile menu: toggle full-screen overlay
4. Intersection Observer for `.reveal` and `.reveal-group` animations
5. Smooth scroll for all `[href^="#"]` anchors
6. Active nav detection: compare `window.location.pathname` to each nav link's `href`
7. Ethan Allen search filter on programs.html: `keyup` event on input, hide/show cards
8. FAQ accordion: click to expand/collapse, close others when one opens

### Performance
- No jQuery or heavy libraries
- Fonts loaded with `display=swap` from Google Fonts
- All images are CSS-only (gradients, shapes) — no broken img tags
- Minify nothing (pitch build, readability matters for code review)

---

## EXECUTION ORDER

Build files in this order:
1. `styles.css` — complete, fully built
2. `script.js` — complete, fully built
3. `index.html` — the pitch anchor, must be perfect
4. `howto.html` → all 8 `howto-[slug].html` sub-pages
5. `products.html`
6. `home-user-shop.html` → `home-fill-sticks.html` → `home-markers.html` → `home-touchup-kits.html`
7. `industrial-shop.html` → `wood-repair.html` → `leather-repair.html` → `metal-repair.html` → `accessories.html`
8. `programs.html`
9. `videos.html`
10. `resources.html`
11. `catalogs.html`

---

## QUALITY CHECKLIST (verify before finishing)

- [ ] All nav links functional across all pages
- [ ] Mega-menus open/close correctly on hover (desktop) and click (mobile)
- [ ] Mobile menu opens/closes, all links work
- [ ] Footer identical on all pages, all links correct
- [ ] Breadcrumbs accurate on every sub-page
- [ ] `.reveal` animations fire on scroll on every page
- [ ] Ethan Allen search filter works on programs.html
- [ ] FAQ accordion expands/collapses correctly
- [ ] Cart icon displays, Request a Quote and Quick Order buttons visible in nav
- [ ] Google Fonts load correctly (Playfair Display + DM Sans)
- [ ] No broken image tags — all visuals are CSS-only
- [ ] Copyright year in footer: © 2026 Touch Up Solutions
- [ ] Social links in footer correct (Facebook, Twitter, Pinterest, YouTube, Instagram — use real URLs from site)
- [ ] No console errors
- [ ] Responsive at 1280px, 1024px, 768px, 375px

---

## SOCIAL LINKS (real URLs — use in footer)
- Facebook: https://www.facebook.com/touchupsolutions/
- Twitter: https://twitter.com/touchupsolution
- Pinterest: https://www.pinterest.com/troypait/touch-up-solutions/
- YouTube: https://www.youtube.com/user/touchupsolutions/featured
- Instagram: https://www.instagram.com/touchupsolutions/
