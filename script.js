/* ============================================================
   TOUCH UP SOLUTIONS — GLOBAL SCRIPT
   Nav, mega-menus, mobile menu, reveal animations,
   smooth scroll, active link, FAQ accordion, EA filter.
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     1. STICKY HEADER — .scrolled at 60px
     -------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------
     2. DESKTOP MEGA-MENU — click to toggle (no hover open)
     -------------------------------------------------------- */
  var megaItems = document.querySelectorAll('.nav-item.has-mega');

  function closeAllMega() {
    megaItems.forEach(function (item) {
      item.classList.remove('mega-open');
      var t = item.querySelector('.nav-link');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  megaItems.forEach(function (item) {
    var trigger = item.querySelector('.nav-link');
    if (!trigger) return;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', function (e) {
      e.preventDefault();           // open the dropdown instead of navigating
      e.stopPropagation();
      var willOpen = !item.classList.contains('mega-open');
      closeAllMega();
      if (willOpen) {
        item.classList.add('mega-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Click anywhere outside an open mega-menu closes it
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item.has-mega')) closeAllMega();
  });

  // Escape closes any open mega-menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllMega();
  });

  /* --------------------------------------------------------
     3. INLINE SEARCH TOGGLE
     -------------------------------------------------------- */
  var searchToggle = document.querySelector('.nav-search-toggle');
  var searchBar = document.querySelector('.nav-search');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', function () {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) {
        var input = searchBar.querySelector('input');
        if (input) setTimeout(function () { input.focus(); }, 200);
      }
    });
  }

  /* --------------------------------------------------------
     4. MOBILE MENU — toggle full-screen overlay
     -------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mobile expandable mega groups
  var mGroups = document.querySelectorAll('.m-group > .m-link');
  mGroups.forEach(function (link) {
    link.addEventListener('click', function (e) {
      // only toggle if it's an expand trigger (has chevron / no real href)
      var group = link.parentElement;
      if (link.classList.contains('m-expand')) {
        e.preventDefault();
        group.classList.toggle('open');
      }
    });
  });

  /* --------------------------------------------------------
     5. INTERSECTION OBSERVER — reveal animations
     -------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-group');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --------------------------------------------------------
     6. SMOOTH SCROLL — in-page anchors
     -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // close mobile nav if open
      if (mobileNav && mobileNav.classList.contains('open') && navToggle) {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  /* --------------------------------------------------------
     7. ACTIVE NAV DETECTION
     -------------------------------------------------------- */
  (function () {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '') path = 'index.html';
    document.querySelectorAll('.nav-link[data-page], .m-link[data-page]').forEach(function (link) {
      var pages = (link.getAttribute('data-page') || '').split(' ');
      if (pages.indexOf(path) !== -1) {
        link.classList.add('active');
      }
    });
  })();

  /* --------------------------------------------------------
     8. FAQ ACCORDION
     -------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) { other.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
      q.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  /* --------------------------------------------------------
     9. ETHAN ALLEN SEARCH FILTER (programs.html)
     -------------------------------------------------------- */
  var eaSearch = document.querySelector('.ea-search');
  if (eaSearch) {
    var eaChips = Array.prototype.slice.call(document.querySelectorAll('.ea-chip'));
    var eaCount = document.querySelector('.ea-count');
    var eaEmpty = document.querySelector('.ea-empty');
    var total = eaChips.length;

    function updateCount(shown) {
      if (eaCount) {
        eaCount.textContent = shown === total
          ? 'Showing all ' + total + ' Ethan Allen finishes'
          : 'Showing ' + shown + ' of ' + total + ' finishes';
      }
      if (eaEmpty) eaEmpty.classList.toggle('show', shown === 0);
    }

    eaSearch.addEventListener('keyup', function () {
      var term = eaSearch.value.trim().toLowerCase();
      var shown = 0;
      eaChips.forEach(function (chip) {
        var text = (chip.getAttribute('data-search') || chip.textContent).toLowerCase();
        var match = text.indexOf(term) !== -1;
        chip.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      updateCount(shown);
    });
    updateCount(total);
  }

  /* --------------------------------------------------------
     10. SUBCATEGORY FILTER PILLS (visual active state)
     -------------------------------------------------------- */
  document.querySelectorAll('.filter-pills').forEach(function (group) {
    var pills = group.querySelectorAll('.filter-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
      });
    });
  });

  /* --------------------------------------------------------
     11. NEWSLETTER FORM (pitch build — prevent reload)
     -------------------------------------------------------- */
  document.querySelectorAll('.news-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      var btn = form.querySelector('button');
      if (input && input.value.trim() && btn) {
        var original = btn.textContent;
        btn.textContent = 'Subscribed ✓';
        input.value = '';
        setTimeout(function () { btn.textContent = original; }, 2600);
      }
    });
  });

})();


/* ============================================================
   CART + CHECKOUT ENGINE
   Persistent localStorage cart, drawer, product-grid rendering,
   live totals, and checkout. Reads real prices from products.js.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'tus_cart_v1';
  var SHIP_FLAT = 9.95;        // flat-rate shipping estimate (pitch build)
  var bySku = window.TUS_BY_SKU || {};

  function money(n) { return '$' + n.toFixed(2); }
  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveCart(c) { localStorage.setItem(KEY, JSON.stringify(c)); sync(); }
  function count(c) { c = c || getCart(); return Object.keys(c).reduce(function (s, k) { return s + c[k]; }, 0); }
  function subtotal(c) {
    c = c || getCart();
    return Object.keys(c).reduce(function (s, k) {
      var p = bySku[k]; return p ? s + p.price * c[k] : s;
    }, 0);
  }

  function add(sku, qty) {
    if (!bySku[sku]) return;
    var c = getCart();
    c[sku] = (c[sku] || 0) + (qty || 1);
    saveCart(c);
  }
  function setQty(sku, qty) {
    var c = getCart();
    if (qty <= 0) { delete c[sku]; } else { c[sku] = qty; }
    saveCart(c);
  }
  function remove(sku) { var c = getCart(); delete c[sku]; saveCart(c); }

  /* ---- badge + drawer + checkout stay in sync ---- */
  function sync() {
    var n = count();
    document.querySelectorAll('.cart-badge').forEach(function (b) { b.textContent = n; });
    renderDrawer();
    renderCheckout();
  }

  function shade(hex, f) {
    var h = hex.replace('#', '');
    var r = Math.round(parseInt(h.substr(0, 2), 16) * f);
    var g = Math.round(parseInt(h.substr(2, 2), 16) * f);
    var b = Math.round(parseInt(h.substr(4, 2), 16) * f);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  function swatchStyle(color) {
    return 'background:linear-gradient(135deg,' + color + ',' + shade(color, 0.72) + ');';
  }

  /* ---- toast ---- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector('[data-toast]');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* --------------------------------------------------------
     SHOP PAGE RENDERER — [data-shop="<pageKey>"]
     -------------------------------------------------------- */
  var SUB_BLURB = {
    'Fill Sticks': 'Color-matched fill stick for scratches, chips, and gouges.',
    'Furniture Fill Sticks': 'Easy no-heat fill stick for furniture repair.',
    'Edging Sticks': 'Harder edging stick for vertical edges and high-wear areas.',
    'Epoxy Sticks': 'Two-part epoxy for structural fills on wood and laminate.',
    'Metal Epoxy Sticks': 'Two-part metal-reinforced epoxy for lasting metal repairs.',
    'Metal Enamel': 'Durable enamel finish for metal surfaces.',
    'Metal Topcoat': 'Protective topcoat for a lasting metal finish.',
    'Burn In Sticks': 'Burn-in stick for professional melt-in repairs.',
    'Touch Up Markers': 'Color marker for precise touch-up on wood surfaces.',
    'Furniture Markers': 'Color marker for precise furniture touch-up.',
    'Aerosols': 'Aerosol finish for toning, sealing, and topcoating.',
    'Powders': 'Repair powder for color blending and grain fill.',
    'Powder Sticks': 'Powder stick for fast color-matched fills.',
    'Putty': 'Pliable putty for filling chips, dents, and voids.',
    'Pencils': 'Graining and distressing pencil for detail work.',
    'Adhesives': 'Adhesive and bonding product for repairs.',
    'Brushes': 'Precision brush for touch-up paint and toner.',
    'Containers': 'Storage and mixing container for shop use.',
    'Abrasives': 'Graduated abrasive for finishing repairs.'
  };
  function blurb(sub) { return SUB_BLURB[sub] || ('Quality Touch Up Solutions ' + String(sub).toLowerCase() + ' product.'); }

  function cardHTML(p) {
    var foot = (p.price != null)
      ? '<span class="price">' + money(p.price) + ' <small>USD</small></span>' +
        '<button class="btn btn--primary btn--sm" data-add="' + p.sku + '">Add to Cart</button>'
      : '<button class="btn btn--secondary btn--sm" data-quote="' + encodeURIComponent(p.name) + '">Request a Quote</button>';
    return '<article class="product-card">' +
      '<div class="product-swatch" style="' + swatchStyle(p.color || '#9a6a3a') + '"><span class="tag">' + p.sub + '</span></div>' +
      '<div class="product-body">' +
        '<span class="p-cat">' + p.sub + '</span>' +
        '<h4>' + p.name + '</h4>' +
        '<p>' + blurb(p.sub) + '</p>' +
        '<div class="product-foot">' + foot + '</div>' +
      '</div></article>';
  }

  function renderShop(host) {
    var key = host.getAttribute('data-shop');
    var only = host.getAttribute('data-only');
    var items = (window.TUS_CATALOG || []).filter(function (p) {
      return p.page === key && (!only || p.sub === only);
    });
    if (!items.length) return;

    var subs = [];
    items.forEach(function (p) { if (subs.indexOf(p.sub) === -1) subs.push(p.sub); });
    var total = items.length;
    var showAll = total <= 200;
    var active = only ? subs[0] : (showAll ? 'all' : subs[0]);

    var pillsHTML = '';
    if (!only && subs.length > 1) {
      pillsHTML = '<div class="filter-pills" data-filter>' +
        (showAll ? '<button class="filter-pill' + (active === 'all' ? ' active' : '') + '" data-sub="all">All</button>' : '') +
        subs.map(function (s) {
          return '<button class="filter-pill' + (s === active ? ' active' : '') + '" data-sub="' + s + '">' + s + '</button>';
        }).join('') +
        '</div>';
    }
    host.innerHTML = '<div class="shop-toolbar"><p class="shop-count"></p></div>' + pillsHTML +
      '<div class="product-grid" data-grid></div>';

    var grid = host.querySelector('[data-grid]');
    var countEl = host.querySelector('.shop-count');

    function paint(sel) {
      var list = (sel === 'all') ? items : items.filter(function (p) { return p.sub === sel; });
      grid.innerHTML = list.map(cardHTML).join('');
      countEl.textContent = list.length + ' product' + (list.length === 1 ? '' : 's');
    }
    paint(active);

    host.querySelectorAll('.filter-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        host.querySelectorAll('.filter-pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        paint(pill.getAttribute('data-sub'));
      });
    });
  }

  document.querySelectorAll('[data-shop]').forEach(renderShop);

  /* --------------------------------------------------------
     ADD-TO-CART (event delegation, works on rendered + static)
     -------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      var sku = addBtn.getAttribute('data-add');
      add(sku, 1);
      var p = bySku[sku];
      toast((p ? p.name : 'Item') + ' added to cart');
      openDrawer();
      return;
    }
    var qBtn = e.target.closest('[data-quote]');
    if (qBtn) {
      toast('Quote request started — our team will follow up with pricing.');
      return;
    }
  });

  /* --------------------------------------------------------
     CART DRAWER
     -------------------------------------------------------- */
  var drawer = document.querySelector('[data-cart-drawer]');
  var overlay = document.querySelector('[data-cart-overlay]');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-cart-open]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); openDrawer(); });
  });
  document.querySelectorAll('[data-cart-close]').forEach(function (b) {
    b.addEventListener('click', closeDrawer);
  });
  if (overlay) overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  function lineHTML(sku, qty) {
    var p = bySku[sku];
    if (!p) return '';
    return '<div class="cart-line" data-line="' + sku + '">' +
      '<div class="cart-line-sw" style="' + swatchStyle(p.color || '#9a6a3a') + '"></div>' +
      '<div class="cart-line-info">' +
        '<p class="cart-line-name">' + p.name + '</p>' +
        '<p class="cart-line-price">' + money(p.price) + '</p>' +
        '<div class="qty">' +
          '<button class="qty-btn" data-dec="' + sku + '" aria-label="Decrease quantity">&minus;</button>' +
          '<span class="qty-n">' + qty + '</span>' +
          '<button class="qty-btn" data-inc="' + sku + '" aria-label="Increase quantity">+</button>' +
          '<button class="cart-remove" data-remove="' + sku + '">Remove</button>' +
        '</div>' +
      '</div>' +
      '<div class="cart-line-total">' + money(p.price * qty) + '</div>' +
    '</div>';
  }

  function renderDrawer() {
    var box = document.querySelector('[data-cart-items]');
    if (!box) return;
    var c = getCart();
    var skus = Object.keys(c);
    if (!skus.length) {
      box.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a class="link-arrow" href="wood-repair.html">Browse Wood Repair</a></div>';
    } else {
      box.innerHTML = skus.map(function (s) { return lineHTML(s, c[s]); }).join('');
    }
    var sub = document.querySelector('[data-cart-subtotal]');
    if (sub) sub.textContent = money(subtotal(c));
    var co = document.querySelector('[data-cart-checkout]');
    if (co) co.classList.toggle('is-disabled', skus.length === 0);
  }

  /* qty + remove delegation (drawer and checkout share these hooks) */
  document.addEventListener('click', function (e) {
    var inc = e.target.closest('[data-inc]');
    var dec = e.target.closest('[data-dec]');
    var rem = e.target.closest('[data-remove]');
    if (inc) { var s = inc.getAttribute('data-inc'); setQty(s, (getCart()[s] || 0) + 1); }
    else if (dec) { var d = dec.getAttribute('data-dec'); setQty(d, (getCart()[d] || 0) - 1); }
    else if (rem) { remove(rem.getAttribute('data-remove')); }
  });

  /* --------------------------------------------------------
     CHECKOUT PAGE — [data-checkout]
     -------------------------------------------------------- */
  function renderCheckout() {
    var host = document.querySelector('[data-checkout]');
    if (!host) return;
    var c = getCart();
    var skus = Object.keys(c);
    var summary = host.querySelector('[data-checkout-summary]');
    var confirmed = host.querySelector('[data-checkout-confirmed]');
    if (confirmed && confirmed.classList.contains('show')) return; // keep confirmation visible

    if (!summary) return;
    if (!skus.length) {
      summary.innerHTML = '<div class="checkout-empty"><h3>Your cart is empty</h3>' +
        '<p>Add products to your cart to begin checkout.</p>' +
        '<a class="btn btn--primary" href="wood-repair.html">Shop Wood Repair</a></div>';
      var formWrap = host.querySelector('[data-checkout-form]');
      if (formWrap) formWrap.style.display = 'none';
      return;
    }
    var formWrap2 = host.querySelector('[data-checkout-form]');
    if (formWrap2) formWrap2.style.display = '';

    var lines = skus.map(function (s) {
      var p = bySku[s], qty = c[s];
      return '<div class="co-line" data-line="' + s + '">' +
        '<div class="co-line-sw" style="' + swatchStyle(p.color || '#9a6a3a') + '"></div>' +
        '<div class="co-line-main">' +
          '<p class="co-line-name">' + p.name + '</p>' +
          '<div class="qty">' +
            '<button class="qty-btn" data-dec="' + s + '">&minus;</button>' +
            '<span class="qty-n">' + qty + '</span>' +
            '<button class="qty-btn" data-inc="' + s + '">+</button>' +
            '<button class="cart-remove" data-remove="' + s + '">Remove</button>' +
          '</div>' +
        '</div>' +
        '<div class="co-line-total">' + money(p.price * qty) + '</div>' +
      '</div>';
    }).join('');

    var sub = subtotal(c);
    var ship = sub > 0 ? SHIP_FLAT : 0;
    var total = sub + ship;
    summary.innerHTML =
      '<div class="co-lines">' + lines + '</div>' +
      '<div class="co-totals">' +
        '<div class="co-row"><span>Subtotal</span><span>' + money(sub) + '</span></div>' +
        '<div class="co-row"><span>Shipping (flat rate)</span><span>' + money(ship) + '</span></div>' +
        '<div class="co-row co-row--grand"><span>Total</span><span>' + money(total) + '</span></div>' +
      '</div>';
  }

  /* checkout form submit -> confirmation */
  var coForm = document.querySelector('[data-checkout-form] form');
  if (coForm) {
    coForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var c = getCart();
      if (!Object.keys(c).length) return;
      var orderNo = 'TUS-' + Date.now().toString().slice(-6);
      var total = money(subtotal(c) + SHIP_FLAT);
      localStorage.removeItem(KEY);
      var host = document.querySelector('[data-checkout]');
      var confirmed = host.querySelector('[data-checkout-confirmed]');
      host.querySelector('[data-checkout-grid]').style.display = 'none';
      confirmed.querySelector('[data-order-no]').textContent = orderNo;
      confirmed.querySelector('[data-order-total]').textContent = total;
      confirmed.classList.add('show');
      sync();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* initial paint */
  sync();
})();

