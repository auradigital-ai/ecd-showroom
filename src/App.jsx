import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronLeft, ShoppingCart, Plus, Minus, Phone, MapPin, Send, Check, X,
  Edit3, Sparkles, ArrowRight, Trash2, AlertCircle, CheckCircle2, Hash
} from 'lucide-react';
 
// ---------------------------------------------------------------
// LOGO — official ECD transparent PNG, embedded as base64
// ---------------------------------------------------------------
const ECD_LOGO_SRC = "data:image/png;base64,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";
 
const ECDLogo = ({ size = 52 }) => (
  <img src={ECD_LOGO_SRC} alt="ECD logo" width={size} height={size} style={{ display: 'block', objectFit: 'contain' }} />
);
 
// ---------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------
// TESTING NUMBER — change to ECD's official line (18766620694) before launch
const ECD_PHONE = '18765730746';
const STORAGE_KEYS = {
  cart: 'ecd_cart_v1',
  customer: 'ecd_customer_v1',
  mode: 'ecd_mode_v1',
  location: 'ecd_location_v1',
  quoteId: 'ecd_quote_id_v1',
};
 
// ---------------------------------------------------------------
// SHARED OPTION SETS
// ---------------------------------------------------------------
const FINISHES = [
  { id: 'silver', name: 'Brushed Silver', color: 'linear-gradient(135deg,#c0c0c0,#e8e8e8)', price: 0 },
  { id: 'black', name: 'Matte Black', color: '#1c1c1c', price: 200 },
  { id: 'bronze', name: 'Champagne Bronze', color: 'linear-gradient(135deg,#8B6914,#cd9933)', price: 300 },
  { id: 'white', name: 'White Powder Coat', color: '#f5f5f5', price: 100 },
];
 
const HANDLES = [
  { id: 'd-pull', name: 'D-Pull Handle', desc: 'Modern D-shape', price: 150 },
  { id: 'bar', name: 'Bar Handle', desc: 'Classic pull bar', price: 0 },
  { id: 'h-bar', name: 'H-Bar / Ladder', desc: 'Commercial grade', price: 200 },
  { id: 'lever', name: 'Lever Handle', desc: 'Keyed entry', price: 200 },
  { id: 'arch', name: 'Arch / Bow Handle', desc: 'Decorative curve', price: 350 },
  { id: 'custom', name: 'Custom Hardware', desc: 'Architect-specified', price: 500 },
];
 
const GLASS_TYPES = [
  { id: 'clear', name: 'Clear Glass', color: 'rgba(200,230,255,0.4)', border: '#93c5fd', price: 0 },
  { id: 'frosted', name: 'Frosted Privacy', color: '#f1f5f9', border: '#cbd5e1', price: 300 },
  { id: 'tinted', name: 'Solar Tinted', color: 'rgba(100,130,100,0.5)', border: '#86a874', price: 200 },
  { id: 'hurricane', name: 'Hurricane Impact', color: 'rgba(147,197,253,0.5)', border: '#1e40af', price: 600 },
];
 
// Loose items — sold individually with their own +/- quantity selectors. No configurator step.
const LOOSE_ITEMS = [
  { id: 'h-pull', name: 'D-Pull Door Handle', desc: 'Stainless steel · 8" length', unitPrice: 1200, category: 'Handles' },
  { id: 'h-bar', name: 'Bar Pull Handle', desc: 'Brushed nickel · 12" length', unitPrice: 1800, category: 'Handles' },
  { id: 'h-h', name: 'H-Style Door Handle', desc: 'Black powder coated · 24"', unitPrice: 3500, category: 'Handles' },
  { id: 'h-lever', name: 'Lever Door Handle', desc: 'Polished chrome lockset', unitPrice: 2800, category: 'Handles' },
  { id: 'hinge-pivot', name: 'Pivot Hinge Set', desc: 'Heavy-duty, top + bottom', unitPrice: 4500, category: 'Hinges' },
  { id: 'hinge-cont', name: 'Continuous Hinge', desc: 'Aluminium piano hinge · 6ft', unitPrice: 2200, category: 'Hinges' },
  { id: 'hinge-butt', name: 'Butt Hinge (Pair)', desc: 'Standard 4" stainless', unitPrice: 850, category: 'Hinges' },
  { id: 'ch-u', name: 'U-Channel (10ft)', desc: 'Aluminium U-channel stock', unitPrice: 2400, category: 'Channels' },
  { id: 'ch-h', name: 'H-Channel (10ft)', desc: 'For glass-to-glass joins', unitPrice: 2800, category: 'Channels' },
  { id: 'ch-f', name: 'F-Channel (10ft)', desc: 'Wall mount channel', unitPrice: 2100, category: 'Channels' },
  { id: 'cl-rect', name: 'Rectangular Glass Clamp', desc: 'Stainless · 304 grade', unitPrice: 950, category: 'Clamps' },
  { id: 'cl-d', name: 'D-Shape Glass Clamp', desc: 'Stainless · 304 grade', unitPrice: 1100, category: 'Clamps' },
  { id: 'cl-spigot', name: 'Floor Spigot', desc: 'Square base · polished', unitPrice: 3200, category: 'Clamps' },
  { id: 'seal-rub', name: 'Glass Seal Rubber (10m)', desc: 'EPDM gasket · weatherproof', unitPrice: 1500, category: 'Seals' },
  { id: 'seal-sili', name: 'Structural Silicone Tube', desc: 'Clear · 300ml cartridge', unitPrice: 850, category: 'Seals' },
];
 
// ---------------------------------------------------------------
// PRODUCT SCHEMA
// ---------------------------------------------------------------
const PRODUCTS = {
  'aluminum-doors': {
    id: 'aluminum-doors', name: 'Aluminium Doors', shortName: 'Aluminium Door',
    tagline: 'Single · Double · French · Sliding', popular: true,
    bgFrom: 'from-slate-900', bgTo: 'to-slate-800', illustration: 'door',
    type: 'configurable',
    styles: [
      { id: 'solid', name: 'Single Solid Panel', desc: 'No glass sections', baseLo: 45000, baseHi: 62000, hasGlass: false },
      { id: 'glass-insert', name: 'Single + Glass Inserts', desc: 'Partial glass panels', baseLo: 52000, baseHi: 75000, hasGlass: true },
      { id: 'french', name: 'French Double Door', desc: 'Two-leaf with glass', baseLo: 85000, baseHi: 130000, hasGlass: true },
      { id: 'sliding', name: 'Sliding Aluminium', desc: 'Track-mounted panels', baseLo: 72000, baseHi: 110000, hasGlass: true },
    ],
    needsHandle: true, finishes: FINISHES, handles: HANDLES, glassTypes: GLASS_TYPES,
  },
  'windows': {
    id: 'windows', name: 'Windows', shortName: 'Window',
    tagline: 'Sliding · Casement · Fixed · Louvre',
    bgFrom: 'from-sky-800', bgTo: 'to-sky-900', illustration: 'window',
    type: 'configurable',
    styles: [
      { id: 'sliding', name: 'Sliding Window', desc: '2-track horizontal', baseLo: 18000, baseHi: 32000, hasGlass: true },
      { id: 'casement', name: 'Casement Window', desc: 'Hinged outward swing', baseLo: 22000, baseHi: 38000, hasGlass: true },
      { id: 'fixed', name: 'Fixed Picture Window', desc: 'Non-opening panoramic', baseLo: 15000, baseHi: 28000, hasGlass: true },
      { id: 'louvre', name: 'Louvre Window', desc: 'Adjustable slatted glass', baseLo: 12000, baseHi: 22000, hasGlass: true },
    ],
    needsHandle: false, finishes: FINISHES, glassTypes: GLASS_TYPES,
  },
  'showers': {
    id: 'showers', name: 'Shower Enclosures', shortName: 'Shower Enclosure',
    tagline: 'Frameless · Semi-frame · Wet room',
    bgFrom: 'from-slate-700', bgTo: 'to-slate-600', illustration: 'shower',
    type: 'configurable',
    styles: [
      { id: 'frameless', name: 'Frameless Enclosure', desc: 'No metal framing', baseLo: 78000, baseHi: 145000, hasGlass: true },
      { id: 'semi-frame', name: 'Semi-Frame Enclosure', desc: 'Metal at top/bottom', baseLo: 55000, baseHi: 95000, hasGlass: true },
      { id: 'sliding-door', name: 'Sliding Glass Door', desc: 'Track-mounted shower door', baseLo: 65000, baseHi: 105000, hasGlass: true },
      { id: 'wet-room', name: 'Wet Room Panel', desc: 'Single fixed glass screen', baseLo: 38000, baseHi: 72000, hasGlass: true },
    ],
    needsHandle: true, finishes: FINISHES, handles: HANDLES.slice(0, 4), glassTypes: GLASS_TYPES.slice(0, 3),
  },
  'staircases': {
    id: 'staircases', name: 'Staircases', shortName: 'Staircase',
    tagline: 'Glass · Chrome · Powder-coated',
    bgFrom: 'from-blue-900', bgTo: 'to-blue-800', illustration: 'stairs',
    type: 'configurable',
    styles: [
      { id: 'glass-rail', name: 'Glass Railing System', desc: 'Tempered glass panels', baseLo: 95000, baseHi: 165000, hasGlass: true },
      { id: 'chrome-rail', name: 'Chrome Railing', desc: 'Polished chrome posts', baseLo: 72000, baseHi: 125000, hasGlass: false },
      { id: 'mixed', name: 'Glass + Chrome Hybrid', desc: 'Glass panels, chrome posts', baseLo: 85000, baseHi: 145000, hasGlass: true },
    ],
    needsHandle: false, finishes: FINISHES, glassTypes: GLASS_TYPES.slice(0, 3),
  },
  'balconies': {
    id: 'balconies', name: 'Glass Balconies', shortName: 'Glass Balcony',
    tagline: 'Frameless · Clamp-on · Spigot',
    bgFrom: 'from-teal-700', bgTo: 'to-teal-800', illustration: 'balcony',
    type: 'configurable',
    styles: [
      { id: 'frameless', name: 'Frameless Glass Balcony', desc: 'Channel-mounted', baseLo: 12000, baseHi: 18000, hasGlass: true, perUnit: 'per linear ft' },
      { id: 'clamp-on', name: 'Clamp-On System', desc: 'Stainless clamp posts', baseLo: 9500, baseHi: 14000, hasGlass: true, perUnit: 'per linear ft' },
      { id: 'spigot', name: 'Spigot Mount', desc: 'Floor-mounted spigots', baseLo: 11000, baseHi: 16500, hasGlass: true, perUnit: 'per linear ft' },
    ],
    needsHandle: false, finishes: FINISHES.slice(0, 2), glassTypes: GLASS_TYPES.slice(0, 3),
  },
  'accessories': {
    id: 'accessories', name: 'Accessories & Loose Items', shortName: 'Accessory',
    tagline: 'Handles · Hinges · Channels · Clamps · Bulk',
    bgFrom: 'from-violet-700', bgTo: 'to-violet-900', illustration: 'accessories',
    type: 'loose-grid',
    forceSupplyOnly: true,
    items: LOOSE_ITEMS,
  },
};
 
// ---------------------------------------------------------------
// LOCATIONS
// ---------------------------------------------------------------
const LOCATIONS = {
  'kingston': { name: 'Kingston Central / New Kingston', fee: 3500, branch: 'Kingston Branch' },
  'hwt': { name: 'Half Way Tree', fee: 3500, branch: 'Kingston Branch' },
  'constant-spring': { name: 'Constant Spring / Stony Hill', fee: 4000, branch: 'Kingston Branch' },
  'portmore': { name: 'Portmore / Braeton', fee: 4500, branch: 'Spanish Town Hub' },
  'spanish-town': { name: 'Spanish Town', fee: 4500, branch: 'Spanish Town Hub' },
  'may-pen': { name: 'May Pen, Clarendon', fee: 7500, branch: 'May Pen Branch' },
  'mandeville': { name: 'Mandeville', fee: 9500, branch: 'May Pen Branch' },
  'ocho-rios': { name: 'Ocho Rios / St. Ann', fee: 12000, branch: 'Ocho Rios Branch' },
  'st-ann': { name: 'Other St. Ann areas', fee: 13500, branch: 'Ocho Rios Branch' },
  'montego-bay': { name: 'Montego Bay / St. James', fee: 14000, branch: 'Ocho Rios Branch' },
  'other-rural': { name: 'Other rural areas (call to confirm)', fee: 15000, branch: 'Spanish Town Hub' },
};
 
// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------
const formatJMD = (n) => 'JMD ' + Math.round(n).toLocaleString();
 
// Safe localStorage helpers — gracefully handle disabled storage / private browsing
const safeGet = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (e) { return fallback; }
};
const safeSet = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
};
 
// Generate unique quote ID: ECD-<initials>-<4 digits>. Uses customer name if available.
const generateQuoteId = (customerName) => {
  let initials = 'XX';
  if (customerName && customerName.trim()) {
    const parts = customerName.trim().split(/\s+/);
    initials = parts[0][0].toUpperCase();
    if (parts.length > 1) initials += parts[parts.length - 1][0].toUpperCase();
    else if (parts[0].length > 1) initials += parts[0][1].toUpperCase();
  }
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `ECD-${initials}-${digits}`;
};
 
const buildItemTotal = (item) => {
  if (item.kind === 'loose') {
    return { lo: item.unitPrice * item.qty, hi: item.unitPrice * item.qty };
  }
  const addOns = (item.finish?.price || 0) + (item.handle?.price || 0) + (item.glass?.price || 0);
  return {
    lo: Math.round((item.style.baseLo + addOns) * item.qty),
    hi: Math.round((item.style.baseHi + addOns) * item.qty),
  };
};
 
const buildWhatsAppMessage = (cart, customer, mode, locationKey, quoteId) => {
  const lines = [];
  lines.push(`*━━━━━━━━━━━━━━━━━━━*`);
  lines.push(`*QUOTE ID: ${quoteId}*`);
  lines.push(`*━━━━━━━━━━━━━━━━━━━*`);
  lines.push('');
  lines.push('*ECD SHOWROOM — QUOTE REQUEST*');
  lines.push('');
 
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  if (totalQty >= 5) {
    lines.push(`⚠️ BULK ORDER (${totalQty} items) — Wholesale pricing review needed`, '');
  }
 
  lines.push('*CUSTOMER DETAILS*');
  lines.push(`Name: ${customer.name || 'Not provided'}`);
  lines.push(`Phone: ${customer.phone || 'Not provided'}`);
  if (customer.company) lines.push(`Company: ${customer.company}`);
  lines.push('');
 
  lines.push(`*MODE: ${mode === 'install' ? 'SUPPLY & INSTALL' : 'SUPPLY ONLY (Pickup / Bulk)'}*`);
  if (mode === 'install' && locationKey && LOCATIONS[locationKey]) {
    const loc = LOCATIONS[locationKey];
    lines.push(`Installation area: ${loc.name}`);
    lines.push(`Assigned branch: ${loc.branch}`);
    lines.push(`Site visit fee: ${formatJMD(loc.fee)}`);
  } else if (mode === 'supply') {
    lines.push(`Method: Customer pickup from nearest branch`);
  }
  lines.push('');
 
  lines.push(`*ITEMS (${cart.length})*`);
  let grandLo = 0, grandHi = 0;
  cart.forEach((item, idx) => {
    const { lo, hi } = buildItemTotal(item);
    grandLo += lo;
    grandHi += hi;
    if (item.kind === 'loose') {
      lines.push(`\n${idx + 1}. ${item.name} (${item.category})`);
      lines.push(`   ${item.desc}`);
      lines.push(`   Quantity: ${item.qty} @ ${formatJMD(item.unitPrice)} ea`);
      lines.push(`   Subtotal: ${formatJMD(lo)}`);
    } else {
      lines.push(`\n${idx + 1}. ${item.product.shortName} — ${item.style.name}`);
      if (item.finish) lines.push(`   Finish: ${item.finish.name}`);
      if (item.handle) lines.push(`   Handle: ${item.handle.name}`);
      if (item.glass) lines.push(`   Glass: ${item.glass.name}`);
      lines.push(`   Quantity: ${item.qty}${item.style.perUnit ? ' ' + item.style.perUnit : ' unit' + (item.qty > 1 ? 's' : '')}`);
      lines.push(`   Subtotal: ${formatJMD(lo)} – ${formatJMD(hi)}`);
    }
  });
  lines.push('');
 
  if (mode === 'install' && locationKey && LOCATIONS[locationKey]) {
    grandLo += LOCATIONS[locationKey].fee;
    grandHi += LOCATIONS[locationKey].fee;
  }
 
  lines.push('*ESTIMATE TOTAL*');
  lines.push(`${formatJMD(grandLo)} – ${formatJMD(grandHi)}`);
  lines.push('(Not binding — for qualification only)');
  lines.push('');
 
  lines.push(`Source: ECD Showroom App`);
  lines.push(`Date: ${new Date().toLocaleDateString('en-JM', { day: 'numeric', month: 'short', year: 'numeric' })}`);
 
  return lines.join('\n');
};
 
// ---------------------------------------------------------------
// UI PRIMITIVES — gray-by-default CTA, turns yellow on hover
// ---------------------------------------------------------------
const CTAButton = ({ onClick, disabled, children, className = '', size = 'md' }) => {
  const sizes = { sm: 'px-4 py-2.5 text-sm', md: 'px-5 py-3.5 text-base', lg: 'px-6 py-4 text-base' };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} font-extrabold tracking-wide rounded-lg border-2 border-slate-300 bg-slate-200 text-slate-900 hover:bg-yellow-400 hover:border-yellow-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-200 disabled:hover:scale-100 ${className}`}
    >
      {children}
    </button>
  );
};
 
const NavyButton = ({ onClick, children, className = '', size = 'md' }) => {
  const sizes = { sm: 'px-3 py-2 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-5 py-3 text-base' };
  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} font-bold rounded-lg border-2 border-blue-900 bg-white text-blue-900 hover:bg-blue-900 hover:text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
};
 
// ---------------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------------
export default function ECDApp() {
  const [screen, setScreen] = useState('gallery');
 
  // Persisted state — lazy initialized from localStorage
  const [mode, setMode] = useState(() => safeGet(STORAGE_KEYS.mode, 'install'));
  const [cart, setCart] = useState(() => safeGet(STORAGE_KEYS.cart, []));
  const [customer, setCustomer] = useState(() => safeGet(STORAGE_KEYS.customer, { name: '', phone: '', company: '' }));
  const [locationKey, setLocationKey] = useState(() => safeGet(STORAGE_KEYS.location, ''));
  const [quoteId, setQuoteId] = useState(() => safeGet(STORAGE_KEYS.quoteId, ''));
 
  // Non-persisted UI state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingItemIdx, setEditingItemIdx] = useState(null);
 
  // Sync to localStorage whenever any persisted value changes
  useEffect(() => { safeSet(STORAGE_KEYS.cart, cart); }, [cart]);
  useEffect(() => { safeSet(STORAGE_KEYS.customer, customer); }, [customer]);
  useEffect(() => { safeSet(STORAGE_KEYS.mode, mode); }, [mode]);
  useEffect(() => { safeSet(STORAGE_KEYS.location, locationKey); }, [locationKey]);
  useEffect(() => { safeSet(STORAGE_KEYS.quoteId, quoteId); }, [quoteId]);
 
  const cartCount = cart.length;
  const cartTotal = useMemo(() => {
    let lo = 0, hi = 0;
    cart.forEach(item => {
      const t = buildItemTotal(item);
      lo += t.lo; hi += t.hi;
    });
    if (mode === 'install' && locationKey && LOCATIONS[locationKey]) {
      lo += LOCATIONS[locationKey].fee;
      hi += LOCATIONS[locationKey].fee;
    }
    return { lo, hi };
  }, [cart, mode, locationKey]);
 
  const goToCategory = (categoryId) => {
    const product = PRODUCTS[categoryId];
    if (product.forceSupplyOnly) setMode('supply');
    setSelectedCategory(categoryId);
    setEditingItemIdx(null);
    if (product.type === 'loose-grid') setScreen('looseGrid');
    else setScreen('configurator');
  };
 
  const editCartItem = (idx) => {
    const item = cart[idx];
    if (item.kind === 'loose') {
      setSelectedCategory('accessories');
      setScreen('looseGrid');
    } else {
      setSelectedCategory(item.product.id);
      setEditingItemIdx(idx);
      setScreen('configurator');
    }
  };
 
  const removeCartItem = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };
 
  const saveBuildToCart = (build) => {
    if (editingItemIdx !== null) {
      const newCart = [...cart];
      newCart[editingItemIdx] = build;
      setCart(newCart);
    } else {
      setCart([...cart, build]);
    }
    setEditingItemIdx(null);
  };
 
  const addLooseItemsToCart = (selectedItems) => {
    // selectedItems is an array of { item, qty }
    const newItems = selectedItems.map(({ item, qty }) => ({
      kind: 'loose',
      id: item.id, name: item.name, desc: item.desc, category: item.category,
      unitPrice: item.unitPrice, qty,
    }));
    setCart([...cart, ...newItems]);
  };
 
  const goToCheckout = () => {
    // Generate quote ID if we don't have one yet
    if (!quoteId) {
      setQuoteId(generateQuoteId(customer.name));
    }
    setScreen('checkout');
  };
 
  // Regenerate quote ID when customer name changes meaningfully (only at checkout)
  useEffect(() => {
    if (screen === 'checkout' && customer.name && quoteId) {
      // Refresh initials but keep digits stable for the same session
      const parts = customer.name.trim().split(/\s+/);
      let initials = 'XX';
      if (parts.length > 0 && parts[0]) {
        initials = parts[0][0].toUpperCase();
        if (parts.length > 1) initials += parts[parts.length - 1][0].toUpperCase();
        else if (parts[0].length > 1) initials += parts[0][1].toUpperCase();
      }
      const digits = quoteId.split('-')[2] || Math.floor(1000 + Math.random() * 9000);
      const newId = `ECD-${initials}-${digits}`;
      if (newId !== quoteId) setQuoteId(newId);
    }
  }, [customer.name, screen]);
 
  const clearAll = () => {
    if (window.confirm('Clear your entire quote cart and contact details? This cannot be undone.')) {
      setCart([]);
      setCustomer({ name: '', phone: '', company: '' });
      setLocationKey('');
      setQuoteId('');
      setScreen('gallery');
    }
  };
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-700 text-base">
      <Header
        cartCount={cartCount}
        onCartClick={goToCheckout}
        onLogoClick={() => setScreen('gallery')}
      />
 
      {screen === 'gallery' && (
        <GalleryScreen
          mode={mode} setMode={setMode}
          cart={cart}
          onSelectCategory={goToCategory}
          onEditItem={editCartItem}
          onRemoveItem={removeCartItem}
          onCheckout={goToCheckout}
        />
      )}
 
      {screen === 'configurator' && selectedCategory && PRODUCTS[selectedCategory].type === 'configurable' && (
        <ConfiguratorScreen
          product={PRODUCTS[selectedCategory]}
          mode={mode} setMode={setMode}
          editingItem={editingItemIdx !== null ? cart[editingItemIdx] : null}
          isEditing={editingItemIdx !== null}
          onSave={saveBuildToCart}
          onBack={() => { setEditingItemIdx(null); setScreen('gallery'); }}
          onAddAnother={(build) => { saveBuildToCart(build); setScreen('gallery'); }}
          onProceedToCheckout={(build) => { saveBuildToCart(build); goToCheckout(); }}
        />
      )}
 
      {screen === 'looseGrid' && selectedCategory && PRODUCTS[selectedCategory].type === 'loose-grid' && (
        <LooseGridScreen
          product={PRODUCTS[selectedCategory]}
          onBack={() => setScreen('gallery')}
          onAdd={(items) => { addLooseItemsToCart(items); setScreen('gallery'); }}
          onAddAndCheckout={(items) => { addLooseItemsToCart(items); goToCheckout(); }}
        />
      )}
 
      {screen === 'checkout' && (
        <CheckoutScreen
          cart={cart}
          mode={mode}
          locationKey={locationKey} setLocationKey={setLocationKey}
          customer={customer} setCustomer={setCustomer}
          cartTotal={cartTotal}
          quoteId={quoteId}
          onEditItem={editCartItem}
          onRemoveItem={removeCartItem}
          onAddMore={() => setScreen('gallery')}
          onBack={() => setScreen('gallery')}
          onClearAll={clearAll}
        />
      )}
 
      <Footer />
    </div>
  );
}
 
// ---------------------------------------------------------------
// HEADER
// ---------------------------------------------------------------
function Header({ cartCount, onCartClick, onLogoClick }) {
  return (
    <>
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs">
        <div className="text-slate-400 hidden sm:block">
          Serving <span className="text-yellow-400 font-semibold">Kingston · Spanish Town · Ocho Rios · May Pen</span>
        </div>
        <div className="text-slate-400 sm:hidden text-xs">4 branches across Jamaica</div>
        <div className="text-slate-500 text-xs hidden md:block">
          <span className="text-green-400">●</span> Open Mon–Thu 8:30AM–5PM
        </div>
      </div>
 
      <header className="bg-white border-b-2 border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button onClick={onLogoClick} className="flex items-center gap-3 group">
          <ECDLogo size={50} />
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-slate-900 leading-tight">Elegant Creative Dezynes</div>
            <div className="text-[10px] text-slate-500 tracking-wider uppercase">Glass &amp; Aluminium Specialists</div>
          </div>
        </button>
 
        <CTAButton size="sm" onClick={onCartClick} className="!px-4 !py-2.5 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Start a Quote</span>
          <span className="sm:hidden">Quote</span>
          {cartCount > 0 && (
            <span className="bg-blue-900 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </CTAButton>
      </header>
    </>
  );
}
 
// ---------------------------------------------------------------
// GALLERY SCREEN
// ---------------------------------------------------------------
function GalleryScreen({ mode, setMode, cart, onSelectCategory, onEditItem, onRemoveItem, onCheckout }) {
  return (
    <div>
      <div className="bg-slate-900 px-4 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500"></div>
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold text-yellow-400 tracking-[3px] uppercase mb-4">
            Est. 2009 · Jamaica's Premier Installer
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
            16 Years of <span className="text-yellow-400">Precision.</span>
          </h1>
          <p className="text-base text-blue-200 leading-relaxed max-w-xl mb-7">
            Custom glass &amp; aluminium solutions for homes, contractors, and businesses across Jamaica. Configure your product, get a real-time estimate, and request a quote in minutes.
          </p>
 
          <div className="mb-2 text-xs text-slate-400 uppercase tracking-wider font-bold">I am looking to:</div>
          <div className="inline-flex bg-white/5 border border-white/10 rounded-lg p-1 gap-1">
            <button
              onClick={() => setMode('install')}
              className={`px-4 py-2.5 rounded-md text-sm font-bold transition-colors ${
                mode === 'install' ? 'bg-yellow-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Supply &amp; Install
            </button>
            <button
              onClick={() => setMode('supply')}
              className={`px-4 py-2.5 rounded-md text-sm font-bold transition-colors ${
                mode === 'supply' ? 'bg-yellow-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Supply Only (Bulk)
            </button>
          </div>
 
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-9 pt-6 border-t border-white/10 max-w-md">
            <Stat n="16+" label="Years active" />
            <Stat n="4" label="Branches" />
            <Stat n="5k+" label="Projects" />
          </div>
        </div>
      </div>
 
      {mode === 'supply' && (
        <div className="bg-yellow-50 border-y border-yellow-300 px-4 py-3 text-sm text-yellow-900 font-medium flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Bulk / wholesale mode active.</strong> Location and site visit fee fields are hidden. You collect from your nearest branch.
          </span>
        </div>
      )}
 
      {cart.length > 0 && (
        <div className="bg-blue-900 border-y-2 border-yellow-500 px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs text-blue-200 uppercase tracking-wider mb-3 font-bold">Your quote cart ({cart.length} item{cart.length > 1 ? 's' : ''})</div>
            <div className="space-y-2">
              {cart.map((item, idx) => {
                const t = buildItemTotal(item);
                const title = item.kind === 'loose' ? `${item.name} (${item.category})` : `${item.product.shortName} — ${item.style.name}`;
                const sub = item.kind === 'loose'
                  ? `${item.desc} · ${formatJMD(item.unitPrice)} ea`
                  : [item.finish?.name, item.handle?.name, item.glass?.name].filter(Boolean).join(' · ');
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{title}</div>
                        <div className="text-xs text-blue-200 truncate">{sub} · ×{item.qty}</div>
                        <div className="text-xs text-yellow-400 font-bold mt-0.5">
                          {item.kind === 'loose' ? formatJMD(t.lo) : `${formatJMD(t.lo)} – ${formatJMD(t.hi)}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => onEditItem(idx)} className="p-2 hover:bg-white/10 rounded text-blue-200 hover:text-white" aria-label="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onRemoveItem(idx)} className="p-2 hover:bg-red-500/20 rounded text-blue-200 hover:text-red-300" aria-label="Remove">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <CTAButton size="md" onClick={onCheckout} className="w-full mt-4">
              Review &amp; Send Quote → ECD WhatsApp <ArrowRight className="inline w-4 h-4 ml-1" />
            </CTAButton>
          </div>
        </div>
      )}
 
      <div className="px-4 py-7 sm:py-10 max-w-4xl mx-auto">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-[2px] mb-2">Our products</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
          {cart.length > 0 ? 'Add another item to your quote' : (
            <>What are you <span className="text-blue-900 border-b-4 border-yellow-500">building?</span></>
          )}
        </h2>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {Object.values(PRODUCTS).map((product, idx) => {
            const isInCart = cart.some(item => (item.product?.id === product.id) || (product.id === 'accessories' && item.kind === 'loose'));
            const isFeatured = idx === 0 || product.id === 'accessories';
            return (
              <button
                key={product.id}
                onClick={() => onSelectCategory(product.id)}
                className={`group relative rounded-xl overflow-hidden bg-gradient-to-br ${product.bgFrom} ${product.bgTo} border-2 border-transparent hover:border-yellow-400 hover:scale-[1.02] transition-all duration-200 text-left ${isFeatured ? 'sm:col-span-2' : ''}`}
              >
                <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                  <ProductIllustration type={product.illustration} large={isFeatured} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent"></div>
                <div className={`relative ${isFeatured ? 'h-36 sm:h-44' : 'h-32 sm:h-40'} flex flex-col justify-end p-4 sm:p-5`}>
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white/15 border border-white/25 rounded-full flex items-center justify-center text-white group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-slate-900 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{product.name}</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">{product.tagline}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.popular && <Badge>Popular</Badge>}
                    {product.forceSupplyOnly && <Badge tone="yellow">Wholesale</Badge>}
                    {isInCart && <Badge tone="green"><Check className="w-3 h-3 inline mr-0.5" strokeWidth={3} /> In cart</Badge>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
 
      <div className="bg-blue-900 border-y border-blue-800 px-4 py-4 grid grid-cols-4 gap-2 max-w-4xl mx-auto">
        <Trust label="SKU" desc="Tracked inventory" />
        <Trust label="JMD" desc="Live estimates" />
        <Trust label="WA" desc="Instant handoff" />
        <Trust label="GPS" desc="Branch routing" />
      </div>
 
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-[2px] mb-3">Our branches</div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <BranchCard name="Spanish Town" addr="71 Brunswick Ave" online tag="Primary Hub" />
          <BranchCard name="Kingston" addr="6–8 Red Hills Rd, Kingston 10" online />
          <BranchCard name="Ocho Rios" addr="Ocho Rios Area · North Coast" online />
          <BranchCard name="May Pen" addr="May Pen, Clarendon" tag="Soon online" />
        </div>
      </div>
    </div>
  );
}
 
function Stat({ n, label }) {
  return (
    <div>
      <div className="text-3xl sm:text-4xl font-black text-yellow-400 leading-none">{n}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wider mt-1.5">{label}</div>
    </div>
  );
}
 
function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-white/15 border-white/20 text-white/85',
    yellow: 'bg-yellow-400/20 border-yellow-400/40 text-yellow-200',
    green: 'bg-green-500/30 border-green-400/50 text-green-200',
  };
  return <span className={`text-xs font-bold border px-2 py-0.5 rounded-full ${tones[tone]}`}>{children}</span>;
}
 
function Trust({ label, desc }) {
  return (
    <div className="text-center">
      <div className="text-lg sm:text-xl font-black text-yellow-400">{label}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">{desc}</div>
    </div>
  );
}
 
function BranchCard({ name, addr, online, tag }) {
  return (
    <div className="flex-shrink-0 bg-white border border-slate-200 rounded-lg p-3.5 min-w-[170px]">
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-amber-500'}`}></span>
        <span className="text-sm font-bold text-slate-900">{name}</span>
      </div>
      <div className="text-xs text-slate-500 leading-snug">{addr}</div>
      {tag && <div className="text-xs text-blue-900 font-bold mt-1.5">{tag}</div>}
    </div>
  );
}
 
// ---------------------------------------------------------------
// PRODUCT ILLUSTRATIONS
// ---------------------------------------------------------------
function ProductIllustration({ type, large }) {
  const s = large ? 110 : 84;
  const stroke = '#fde68a';
  if (type === 'door') return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <rect x="10" y="6" width="26" height="68" rx="2" stroke={stroke} strokeWidth="2.5"/>
      <rect x="44" y="6" width="26" height="68" rx="2" stroke={stroke} strokeWidth="2.5"/>
      <rect x="14" y="14" width="18" height="20" rx="1" stroke={stroke} strokeWidth="1.5" opacity="0.6"/>
      <rect x="48" y="14" width="18" height="20" rx="1" stroke={stroke} strokeWidth="1.5" opacity="0.6"/>
      <rect x="14" y="38" width="18" height="20" rx="1" stroke={stroke} strokeWidth="1.5" opacity="0.6"/>
      <rect x="48" y="38" width="18" height="20" rx="1" stroke={stroke} strokeWidth="1.5" opacity="0.6"/>
    </svg>
  );
  if (type === 'window') return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <rect x="6" y="14" width="68" height="52" rx="2" stroke={stroke} strokeWidth="2.5"/>
      <line x1="40" y1="14" x2="40" y2="66" stroke={stroke} strokeWidth="1.5"/>
      <line x1="6" y1="40" x2="74" y2="40" stroke={stroke} strokeWidth="1.5"/>
    </svg>
  );
  if (type === 'shower') return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <rect x="14" y="6" width="52" height="68" rx="3" stroke={stroke} strokeWidth="2.5"/>
      <line x1="40" y1="8" x2="40" y2="72" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3"/>
      <circle cx="40" cy="40" r="2" fill={stroke}/>
    </svg>
  );
  if (type === 'stairs') return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <rect x="6" y="58" width="14" height="14" rx="1" stroke={stroke} strokeWidth="2" opacity="0.7"/>
      <rect x="20" y="44" width="14" height="28" rx="1" stroke={stroke} strokeWidth="2" opacity="0.7"/>
      <rect x="34" y="30" width="14" height="42" rx="1" stroke={stroke} strokeWidth="2" opacity="0.7"/>
      <rect x="48" y="16" width="14" height="56" rx="1" stroke={stroke} strokeWidth="2" opacity="0.7"/>
      <line x1="6" y1="58" x2="62" y2="16" stroke={stroke} strokeWidth="2"/>
    </svg>
  );
  if (type === 'balcony') return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <line x1="6" y1="62" x2="74" y2="62" stroke={stroke} strokeWidth="3"/>
      <line x1="6" y1="20" x2="74" y2="20" stroke={stroke} strokeWidth="2"/>
      {[14, 26, 40, 54, 66].map(x => <line key={x} x1={x} y1={20} x2={x} y2={62} stroke={stroke} strokeWidth="1.5"/>)}
    </svg>
  );
  if (type === 'accessories') return (
    <svg width={s * 1.4} height={s} viewBox="0 0 110 80" fill="none">
      <rect x="8" y="14" width="6" height="52" rx="3" fill={stroke}/>
      <rect x="22" y="14" width="6" height="52" rx="3" fill={stroke}/>
      <rect x="8" y="32" width="20" height="5" rx="2" fill={stroke} opacity="0.7"/>
      <rect x="8" y="46" width="20" height="5" rx="2" fill={stroke} opacity="0.7"/>
      <circle cx="60" cy="40" r="14" stroke={stroke} strokeWidth="3" fill="none"/>
      <circle cx="60" cy="40" r="5" fill={stroke}/>
      <rect x="86" y="14" width="6" height="52" rx="3" fill={stroke}/>
      <path d="M92 22 Q104 22 104 40 Q104 58 92 58" stroke={stroke} strokeWidth="4" fill="none"/>
    </svg>
  );
  return null;
}
 
// ---------------------------------------------------------------
// LOOSE ITEMS GRID — multi-select with per-card +/- quantity
// ---------------------------------------------------------------
function LooseGridScreen({ product, onBack, onAdd, onAddAndCheckout }) {
  const [quantities, setQuantities] = useState({}); // { itemId: qty }
 
  const setQty = (id, q) => {
    const next = { ...quantities };
    if (q <= 0) delete next[id];
    else next[id] = q;
    setQuantities(next);
  };
 
  // Group items by category
  const grouped = useMemo(() => {
    const g = {};
    product.items.forEach(item => {
      if (!g[item.category]) g[item.category] = [];
      g[item.category].push(item);
    });
    return g;
  }, [product]);
 
  const selected = useMemo(() => {
    return product.items.filter(i => quantities[i.id] > 0).map(item => ({ item, qty: quantities[item.id] }));
  }, [quantities, product]);
 
  const total = useMemo(() => selected.reduce((s, { item, qty }) => s + item.unitPrice * qty, 0), [selected]);
  const totalCount = useMemo(() => selected.reduce((s, { qty }) => s + qty, 0), [selected]);
 
  return (
    <div className="pb-36 lg:pb-8">
      <div className="bg-blue-900 px-4 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-blue-300 tracking-[1.5px] uppercase mb-1">Browse &amp; select</div>
          <div className="text-xl sm:text-2xl text-white font-extrabold tracking-tight">{product.name}</div>
          <div className="text-xs text-blue-200 mt-1">Pick quantities · then add all selected to your quote</div>
        </div>
        <button onClick={onBack} className="text-sm text-blue-200 bg-white/8 hover:bg-white/15 border border-white/15 px-3 py-2 rounded-md flex items-center gap-1.5">
          <ChevronLeft className="w-4 h-4" /> Gallery
        </button>
      </div>
 
      <div className="px-3 sm:px-4 py-4 max-w-4xl mx-auto space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-500 rounded-full"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map(item => {
                const qty = quantities[item.id] || 0;
                const isSelected = qty > 0;
                return (
                  <div key={item.id} className={`bg-white rounded-xl border-2 p-4 transition-colors ${isSelected ? 'border-blue-900 ring-2 ring-blue-100' : 'border-slate-200'}`}>
                    <div className="flex justify-between gap-3 mb-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-extrabold text-slate-900 leading-tight">{item.name}</div>
                        <div className="text-sm text-slate-500 mt-1">{item.desc}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-extrabold text-blue-900">{formatJMD(item.unitPrice)}</div>
                        <div className="text-xs text-slate-500">each</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(item.id, qty - 1)} disabled={qty === 0} className="w-11 h-11 rounded-lg border-2 border-blue-900 bg-white text-blue-900 hover:bg-blue-900 hover:text-white font-bold flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-blue-900">
                          <Minus className="w-4 h-4" strokeWidth={3} />
                        </button>
                        <input
                          type="number" min="0" value={qty}
                          onChange={(e) => setQty(item.id, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 h-11 text-center text-base font-extrabold text-blue-900 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                        <button onClick={() => setQty(item.id, qty + 1)} className="w-11 h-11 rounded-lg border-2 border-blue-900 bg-white text-blue-900 hover:bg-blue-900 hover:text-white font-bold flex items-center justify-center transition-colors">
                          <Plus className="w-4 h-4" strokeWidth={3} />
                        </button>
                      </div>
                      {isSelected && (
                        <div className="text-sm font-bold text-blue-900">
                          = {formatJMD(item.unitPrice * qty)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
 
      {/* STICKY BOTTOM TOTAL + ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-2xl z-30">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          <div className="flex items-end justify-between mb-3 gap-3">
            <div className="min-w-0">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Selected ({totalCount} item{totalCount !== 1 ? 's' : ''})</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalCount > 0 ? formatJMD(total) : <span className="text-slate-400 text-base font-normal">No items selected yet</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <NavyButton onClick={() => onAdd(selected)} size="md" className="flex-1" >
              {totalCount > 0 ? 'Add Selected → Continue' : 'Select items to add'}
            </NavyButton>
            <CTAButton onClick={() => onAddAndCheckout(selected)} disabled={totalCount === 0} size="md" className="flex-1">
              Add &amp; Checkout <ArrowRight className="inline w-4 h-4 ml-1" />
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
 
// ---------------------------------------------------------------
// CONFIGURATOR SCREEN
// ---------------------------------------------------------------
function ConfiguratorScreen({ product, mode, setMode, editingItem, isEditing, onSave, onBack, onAddAnother, onProceedToCheckout }) {
  const [style, setStyle] = useState(editingItem?.style || null);
  const [finish, setFinish] = useState(editingItem?.finish || null);
  const [handle, setHandle] = useState(editingItem?.handle || null);
  const [glass, setGlass] = useState(editingItem?.glass || null);
  const [qty, setQty] = useState(editingItem?.qty || 1);
 
  const lockedToSupply = product.forceSupplyOnly;
 
  const stepsTotal = useMemo(() => {
    let t = 1;
    if (style) {
      t += 1;
      if (product.needsHandle) t += 1;
      if (style.hasGlass && product.glassTypes) t += 1;
    }
    return t;
  }, [style, product]);
 
  const stepsDone = useMemo(() => {
    let d = 0;
    if (style) d++;
    if (finish) d++;
    if (handle) d++;
    if (glass) d++;
    return d;
  }, [style, finish, handle, glass]);
 
  const isComplete = useMemo(() => {
    if (!style || !finish) return false;
    if (product.needsHandle && !handle) return false;
    if (style.hasGlass && product.glassTypes && !glass) return false;
    return true;
  }, [style, finish, handle, glass, product]);
 
  const completionPct = stepsTotal > 0 ? Math.round((stepsDone / stepsTotal) * 100) : 0;
 
  const estimate = useMemo(() => {
    if (!style) return { lo: 0, hi: 0 };
    const addOns = (finish?.price || 0) + (handle?.price || 0) + (glass?.price || 0);
    return {
      lo: Math.round((style.baseLo + addOns) * qty),
      hi: Math.round((style.baseHi + addOns) * qty),
    };
  }, [style, finish, handle, glass, qty]);
 
  const buildPayload = () => ({
    kind: 'configured',
    product, style, finish,
    handle: product.needsHandle ? handle : null,
    glass: style?.hasGlass ? glass : null, qty,
  });
 
  const handleAddAnother = () => { if (isComplete) onAddAnother(buildPayload()); };
  const handleProceed = () => { if (isComplete) onProceedToCheckout(buildPayload()); };
 
  return (
    <div className="pb-36 lg:pb-8">
      <div className="bg-blue-900 px-3 py-2.5 flex items-center gap-2 text-sm">
        <span className="text-blue-200 uppercase tracking-wider text-xs font-bold">Mode:</span>
        <div className="inline-flex bg-white/10 border border-white/15 rounded-md p-0.5 gap-0.5">
          <button onClick={() => !lockedToSupply && setMode('install')} disabled={lockedToSupply}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${mode === 'install' ? 'bg-yellow-500 text-slate-900' : 'text-slate-400 hover:text-white disabled:opacity-50'}`}>
            Supply &amp; Install
          </button>
          <button onClick={() => setMode('supply')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${mode === 'supply' ? 'bg-yellow-500 text-slate-900' : 'text-slate-400 hover:text-white'}`}>
            Supply Only / Bulk
          </button>
        </div>
      </div>
 
      <div className="bg-blue-900 px-4 py-3 sm:py-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-blue-300 tracking-[1.5px] uppercase mb-1">{isEditing ? 'Editing item' : 'Configuring'}</div>
          <div className="text-xl sm:text-2xl text-white font-extrabold tracking-tight">{product.name}</div>
        </div>
        <button onClick={onBack} className="text-sm text-blue-200 bg-white/8 hover:bg-white/15 border border-white/15 px-3 py-2 rounded-md flex items-center gap-1.5">
          <ChevronLeft className="w-4 h-4" /> Gallery
        </button>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 px-3 sm:px-4 py-4 max-w-5xl mx-auto">
        <div className="space-y-3">
 
          <ConfigBlock n={style ? '✓' : '1'} done={!!style} title={`${product.shortName} Style`} sub="Select one">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.styles.map(s => (
                <button key={s.id} onClick={() => { setStyle(s); if (!s.hasGlass) setGlass(null); }}
                  className={`text-left rounded-lg border-2 overflow-hidden transition-colors ${style?.id === s.id ? 'border-blue-900 bg-blue-50 ring-1 ring-blue-900' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50'}`}>
                  <div className="h-24 bg-slate-50 border-b border-slate-200 flex items-center justify-center">
                    <StylePreview product={product} style={s} />
                  </div>
                  <div className="p-3">
                    <div className={`text-sm font-bold ${style?.id === s.id ? 'text-blue-900' : 'text-slate-700'}`}>{s.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                    <div className="text-xs text-slate-700 mt-1.5 font-semibold">{formatJMD(s.baseLo)} – {formatJMD(s.baseHi)} {s.perUnit ? <span className="font-normal text-slate-400">{s.perUnit}</span> : ''}</div>
                    <div className="mt-2">
                      {s.hasGlass ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">Glass options unlocked</span>
                      ) : (
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-semibold">No glass options</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ConfigBlock>
 
          {style && (
            <ConfigBlock n={finish ? '✓' : '2'} done={!!finish} title="Frame Finish" sub="Select one">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.finishes.map(f => (
                  <button key={f.id} onClick={() => setFinish(f)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${finish?.id === f.id ? 'border-blue-900 bg-blue-50 ring-1 ring-blue-900' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50'}`}>
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full border-2 border-slate-300" style={{ background: f.color }}></div>
                    <div className={`text-sm font-bold ${finish?.id === f.id ? 'text-blue-900' : 'text-slate-700'}`}>{f.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{f.price > 0 ? `+ JMD ${f.price}` : 'Included'}</div>
                  </button>
                ))}
              </div>
            </ConfigBlock>
          )}
 
          {style && finish && product.needsHandle && (
            <ConfigBlock n={handle ? '✓' : '3'} done={!!handle} title="Handle Type" sub="Select one">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.handles.map(h => (
                  <button key={h.id} onClick={() => setHandle(h)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-colors ${handle?.id === h.id ? 'border-blue-900 bg-blue-50 ring-1 ring-blue-900' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50'}`}>
                    <div className={`w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0 border ${handle?.id === h.id ? 'bg-blue-100 border-blue-300' : 'bg-slate-50 border-slate-200'}`}>
                      <HandleIcon type={h.id} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-bold ${handle?.id === h.id ? 'text-blue-900' : 'text-slate-700'}`}>{h.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{h.desc} · {h.price > 0 ? `+ JMD ${h.price}` : 'Included'}</div>
                    </div>
                  </button>
                ))}
              </div>
            </ConfigBlock>
          )}
 
          {style && finish && (!product.needsHandle || handle) && style.hasGlass && product.glassTypes && (
            <ConfigBlock n={glass ? '✓' : (product.needsHandle ? '4' : '3')} done={!!glass} title="Glass Type" sub="Unlocked by your style">
              <div className="grid grid-cols-2 gap-2">
                {product.glassTypes.map(g => (
                  <button key={g.id} onClick={() => setGlass(g)}
                    className={`p-3.5 rounded-lg border-2 text-center transition-colors ${glass?.id === g.id ? 'border-blue-900 bg-blue-50 ring-1 ring-blue-900' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50'}`}>
                    <div className="w-12 h-12 mx-auto mb-2 rounded border-2" style={{ background: g.color, borderColor: g.border }}></div>
                    <div className={`text-sm font-bold ${glass?.id === g.id ? 'text-blue-900' : 'text-slate-700'}`}>{g.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{g.price > 0 ? `+ JMD ${g.price}` : 'Included'}</div>
                  </button>
                ))}
              </div>
            </ConfigBlock>
          )}
 
          {style && (
            <ConfigBlock n="#" done={false} title="Quantity" sub="No upper limit">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 rounded-lg border-2 border-blue-900 bg-white text-blue-900 hover:bg-blue-900 hover:text-white font-bold flex items-center justify-center transition-colors">
                    <Minus className="w-5 h-5" strokeWidth={3} />
                  </button>
                  <input type="number" min="1" value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 h-12 text-center text-lg font-extrabold text-blue-900 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"/>
                  <button onClick={() => setQty(qty + 1)} className="w-12 h-12 rounded-lg border-2 border-blue-900 bg-white text-blue-900 hover:bg-blue-900 hover:text-white font-bold flex items-center justify-center transition-colors">
                    <Plus className="w-5 h-5" strokeWidth={3} />
                  </button>
                </div>
                <span className="text-sm text-slate-600">{style.perUnit || (qty > 1 ? 'units' : 'unit')}</span>
                {qty >= 5 && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Bulk · wholesale review
                  </span>
                )}
              </div>
            </ConfigBlock>
          )}
 
        </div>
 
        {/* DESKTOP ESTIMATE PANEL */}
        <div className="hidden lg:block">
          <div className="sticky top-20 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Live estimate</div>
              <div className="text-2xl font-black text-white tracking-tight leading-none">
                <span className="text-base text-slate-400 font-normal">JMD </span>
                {style ? <>{estimate.lo.toLocaleString()} <span className="text-slate-500">–</span> {estimate.hi.toLocaleString()}</> : <span className="text-slate-500">—</span>}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {!style ? 'Select a style to begin' : isComplete ? 'Build complete — ready to add to quote' : `${stepsTotal - stepsDone} step${stepsTotal - stepsDone !== 1 ? 's' : ''} remaining`}
              </div>
              <div className="h-1 bg-blue-900 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-yellow-500 transition-all duration-300" style={{ width: `${completionPct}%` }}></div>
              </div>
            </div>
            <div className="p-4 space-y-1.5 text-sm">
              <EstLine k="Style" v={style?.name} />
              <EstLine k="Frame finish" v={finish && (finish.price > 0 ? `+ JMD ${finish.price}` : 'Included')} />
              {product.needsHandle && <EstLine k="Handle" v={handle && (handle.price > 0 ? `+ JMD ${handle.price}` : 'Included')} />}
              {style?.hasGlass && product.glassTypes && <EstLine k="Glass" v={glass && (glass.price > 0 ? `+ JMD ${glass.price}` : 'Included')} />}
              <EstLine k="Quantity" v={`× ${qty}`} />
            </div>
            <div className="p-3 pt-0 space-y-2">
              <CTAButton onClick={handleAddAnother} disabled={!isComplete} className="w-full">
                {isEditing ? 'Save Changes' : 'Add to Quote & Continue'}
              </CTAButton>
              <NavyButton onClick={handleProceed} className="w-full">
                {isEditing ? 'Save & Review Quote' : 'Add & Go to Checkout'} <ArrowRight className="inline w-4 h-4 ml-1" />
              </NavyButton>
            </div>
          </div>
        </div>
      </div>
 
      {/* MOBILE STICKY ESTIMATE BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-2xl z-30">
        <div className="p-3">
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Live estimate</div>
              <div className="text-base font-black text-slate-900 leading-tight">
                {style ? <>JMD {estimate.lo.toLocaleString()} <span className="text-slate-400">–</span> {estimate.hi.toLocaleString()}</> : <span className="text-slate-400 text-sm font-normal">Select style…</span>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{completionPct}% done</div>
              <div className="w-24 h-1 bg-slate-200 rounded-full mt-1"><div className="h-full bg-blue-900 rounded-full transition-all duration-300" style={{ width: `${completionPct}%` }}></div></div>
            </div>
          </div>
          <div className="flex gap-2">
            <CTAButton onClick={handleAddAnother} disabled={!isComplete} size="sm" className="flex-1">{isEditing ? 'Save' : 'Add to Quote'}</CTAButton>
            <NavyButton onClick={handleProceed} size="sm" className="flex-1">Checkout <ArrowRight className="inline w-3 h-3 ml-1" /></NavyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
 
function ConfigBlock({ n, done, title, sub, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${done ? 'bg-green-600 text-white' : (n === '#' ? 'bg-slate-400 text-white' : 'bg-blue-900 text-white')}`}>{n}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">{title}</div>
        </div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}
 
function EstLine({ k, v }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-slate-500">{k}</span>
      <span className={v ? 'font-bold text-slate-700' : 'italic text-slate-300'}>{v || 'Not selected'}</span>
    </div>
  );
}
 
function StylePreview({ product, style }) {
  if (product.illustration === 'door') {
    if (style.id === 'french') return (
      <svg width="64" height="60" viewBox="0 0 80 60"><rect x="4" y="4" width="34" height="52" rx="2" stroke="#1e3a8a" strokeWidth="2" fill="#eff6ff"/><rect x="42" y="4" width="34" height="52" rx="2" stroke="#1e3a8a" strokeWidth="2" fill="#eff6ff"/><rect x="9" y="9" width="24" height="34" stroke="#93c5fd" strokeWidth="1" fill="#dbeafe"/><rect x="47" y="9" width="24" height="34" stroke="#93c5fd" strokeWidth="1" fill="#dbeafe"/></svg>
    );
    if (style.id === 'sliding') return (
      <svg width="68" height="52" viewBox="0 0 80 60"><rect x="2" y="8" width="76" height="48" rx="1" stroke="#94a3b8" strokeWidth="1.5" fill="none"/><rect x="4" y="10" width="36" height="44" stroke="#1e3a8a" strokeWidth="2" fill="#eff6ff"/><rect x="40" y="10" width="36" height="44" stroke="#93c5fd" strokeWidth="1.5" fill="#dbeafe"/></svg>
    );
    if (style.id === 'glass-insert') return (
      <svg width="42" height="60" viewBox="0 0 50 60"><rect x="4" y="4" width="42" height="52" rx="2" stroke="#1e3a8a" strokeWidth="2" fill="#eff6ff"/><rect x="9" y="9" width="32" height="18" stroke="#93c5fd" strokeWidth="1" fill="#dbeafe"/><rect x="9" y="32" width="32" height="18" stroke="#93c5fd" strokeWidth="1" fill="#dbeafe"/></svg>
    );
    return <svg width="42" height="60" viewBox="0 0 50 60"><rect x="4" y="4" width="42" height="52" rx="2" stroke="#1e3a8a" strokeWidth="2" fill="#eff6ff"/><circle cx="38" cy="30" r="2" fill="#1e3a8a"/></svg>;
  }
  if (product.illustration === 'window') return (
    <svg width="68" height="52" viewBox="0 0 80 60"><rect x="4" y="4" width="72" height="52" rx="2" stroke="#0369a1" strokeWidth="2" fill="rgba(125,211,252,0.1)"/>{(style.id === 'sliding' || style.id === 'casement') && <line x1="40" y1="4" x2="40" y2="56" stroke="#0369a1" strokeWidth="1.5"/>}{style.id === 'louvre' && [...Array(5)].map((_, i) => <line key={i} x1="6" y1={12 + i * 9} x2="74" y2={12 + i * 9} stroke="#0369a1" strokeWidth="1.5"/>)}</svg>
  );
  if (product.illustration === 'shower') return <svg width="42" height="60" viewBox="0 0 50 60"><rect x="4" y="4" width="42" height="52" rx="2" stroke="#475569" strokeWidth="2" fill="rgba(203,213,225,0.15)"/></svg>;
  if (product.illustration === 'stairs') return (
    <svg width="68" height="52" viewBox="0 0 80 60"><rect x="6" y="40" width="14" height="14" stroke="#1d4ed8" strokeWidth="1.5" fill="rgba(147,197,253,0.15)"/><rect x="20" y="28" width="14" height="26" stroke="#1d4ed8" strokeWidth="1.5" fill="rgba(147,197,253,0.15)"/><rect x="34" y="16" width="14" height="38" stroke="#1d4ed8" strokeWidth="1.5" fill="rgba(147,197,253,0.15)"/><rect x="48" y="6" width="14" height="48" stroke="#1d4ed8" strokeWidth="1.5" fill="rgba(147,197,253,0.15)"/></svg>
  );
  if (product.illustration === 'balcony') return (
    <svg width="68" height="42" viewBox="0 0 80 50"><line x1="4" y1="42" x2="76" y2="42" stroke="#0f766e" strokeWidth="2.5"/><line x1="4" y1="8" x2="76" y2="8" stroke="#0f766e" strokeWidth="2"/>{[12, 24, 38, 52, 64].map(x => <line key={x} x1={x} y1={8} x2={x} y2={42} stroke="#0f766e" strokeWidth="1.5"/>)}</svg>
  );
  return null;
}
 
function HandleIcon({ type }) {
  const c = '#1e3a8a';
  if (type === 'd-pull') return <svg width="24" height="36" viewBox="0 0 22 32"><rect x="2" y="2" width="4" height="28" rx="2" fill={c}/><path d="M6 6 Q18 6 18 16 Q18 26 6 26" stroke={c} strokeWidth="3" fill="none"/></svg>;
  if (type === 'bar') return <svg width="36" height="22" viewBox="0 0 32 20"><rect x="2" y="7" width="28" height="6" rx="3" fill={c}/><rect x="4" y="2" width="4" height="6" rx="1.5" fill="#334155"/><rect x="24" y="2" width="4" height="6" rx="1.5" fill="#334155"/><rect x="4" y="12" width="4" height="6" rx="1.5" fill="#334155"/><rect x="24" y="12" width="4" height="6" rx="1.5" fill="#334155"/></svg>;
  if (type === 'h-bar') return <svg width="24" height="40" viewBox="0 0 22 36"><rect x="2" y="2" width="4" height="32" rx="2" fill={c}/><rect x="16" y="2" width="4" height="32" rx="2" fill={c}/><rect x="2" y="10" width="18" height="3" fill="#334155"/><rect x="2" y="23" width="18" height="3" fill="#334155"/></svg>;
  if (type === 'lever') return <svg width="36" height="28" viewBox="0 0 32 24"><circle cx="9" cy="12" r="6" stroke={c} strokeWidth="2.5" fill="none"/><rect x="13" y="10" width="16" height="4" rx="2" fill={c}/></svg>;
  if (type === 'arch') return <svg width="36" height="36" viewBox="0 0 32 32"><path d="M5 28 Q5 5 16 5 Q27 5 27 28" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round"/><rect x="2" y="24" width="6" height="4" rx="1.5" fill="#334155"/><rect x="22" y="24" width="6" height="4" rx="1.5" fill="#334155"/></svg>;
  if (type === 'custom') return <svg width="32" height="32" viewBox="0 0 28 28"><circle cx="14" cy="14" r="9" stroke={c} strokeWidth="2" fill="none" strokeDasharray="3 2"/><circle cx="14" cy="14" r="3" fill="#eab308"/></svg>;
  return null;
}
 
// ---------------------------------------------------------------
// CHECKOUT SCREEN
// ---------------------------------------------------------------
function CheckoutScreen({ cart, mode, locationKey, setLocationKey, customer, setCustomer, cartTotal, quoteId, onEditItem, onRemoveItem, onAddMore, onBack, onClearAll }) {
  const [showWAPreview, setShowWAPreview] = useState(false);
 
  const isReady = cart.length > 0 && customer.name.trim() && customer.phone.trim() && (mode === 'supply' || locationKey);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const isBulk = totalQty >= 5;
 
  const waMessage = useMemo(() => buildWhatsAppMessage(cart, customer, mode, locationKey, quoteId), [cart, customer, mode, locationKey, quoteId]);
  const waLink = `https://wa.me/${ECD_PHONE}?text=${encodeURIComponent(waMessage)}`;
 
  if (cart.length === 0) {
    return (
      <div className="px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShoppingCart className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your quote cart is empty</h2>
        <p className="text-base text-slate-500 mb-7">Configure a product to add it to your quote.</p>
        <CTAButton onClick={onBack} size="lg">Browse Products</CTAButton>
      </div>
    );
  }
 
  return (
    <div className="px-3 sm:px-4 py-4 max-w-3xl mx-auto pb-32 lg:pb-8">
 
      <div className="bg-blue-900 px-4 py-4 flex items-center justify-between -mx-3 sm:-mx-4 mb-4">
        <div>
          <div className="text-xs text-blue-300 tracking-[1.5px] uppercase mb-1">Step 3</div>
          <div className="text-xl sm:text-2xl text-white font-extrabold">Review &amp; Send Quote</div>
        </div>
        <button onClick={onBack} className="text-sm text-blue-200 bg-white/8 hover:bg-white/15 border border-white/15 px-3 py-2 rounded-md flex items-center gap-1.5">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>
 
      {/* QUOTE ID PROMINENT BANNER */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 border-2 border-yellow-500 rounded-xl p-4 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Hash className="w-6 h-6 text-blue-900" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-blue-200 uppercase tracking-wider font-bold">Your quote reference</div>
            <div className="text-xl sm:text-2xl text-yellow-400 font-black tracking-wider truncate">{quoteId || '—'}</div>
            <div className="text-xs text-blue-200 mt-0.5">Use this ID to track your quote with ECD</div>
          </div>
        </div>
      </div>
 
      {isBulk && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3.5 mb-4 flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-900">
            <strong>Bulk order detected ({totalQty} units).</strong> ECD's sales team will review your request for wholesale pricing before confirming.
          </div>
        </div>
      )}
 
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-4">
        <div className="px-4 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Items in your quote</div>
            <div className="text-xs text-slate-500 mt-0.5">{cart.length} item{cart.length > 1 ? 's' : ''} · {totalQty} unit{totalQty > 1 ? 's' : ''} total</div>
          </div>
          <NavyButton size="sm" onClick={onAddMore}>+ Add Item</NavyButton>
        </div>
        <div className="divide-y divide-slate-100">
          {cart.map((item, idx) => {
            const t = buildItemTotal(item);
            const title = item.kind === 'loose' ? `${item.name}` : `${item.product.shortName}`;
            const subtitle = item.kind === 'loose' ? `${item.category} · ${item.desc}` : item.style.name;
            return (
              <div key={idx} className="p-4 flex items-start gap-3">
                <div className="w-14 h-14 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">
                  {item.kind === 'configured' ? <StylePreview product={item.product} style={item.style} /> : <HandleIcon type="d-pull" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <div className="text-base font-extrabold text-slate-900 truncate">{title}</div>
                      <div className="text-sm text-slate-600 truncate">{subtitle}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-extrabold text-blue-900">{formatJMD(t.lo)}</div>
                      {t.hi !== t.lo && <div className="text-xs text-slate-500">– {formatJMD(t.hi)}</div>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {item.finish && <Pill>{item.finish.name}</Pill>}
                    {item.handle && <Pill>{item.handle.name}</Pill>}
                    {item.glass && <Pill>{item.glass.name}</Pill>}
                    <Pill highlight>× {item.qty}</Pill>
                  </div>
                  <div className="flex gap-3 mt-2.5">
                    <button onClick={() => onEditItem(idx)} className="text-sm text-blue-900 hover:underline font-semibold flex items-center gap-1"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                    <button onClick={() => onRemoveItem(idx)} className="text-sm text-red-600 hover:underline font-semibold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {mode === 'install' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-900" />
            <div className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Installation Location</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1 block">Community / Area</label>
              <select value={locationKey} onChange={(e) => setLocationKey(e.target.value)} className="w-full px-3 py-3 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:border-blue-900 bg-white">
                <option value="">— Select your area —</option>
                {Object.entries(LOCATIONS).map(([k, l]) => <option key={k} value={k}>{l.name}</option>)}
              </select>
            </div>
            {locationKey && LOCATIONS[locationKey] && (
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <div className="text-xs text-sky-700 uppercase tracking-wider font-bold">Site visit fee</div>
                  <div className="text-lg font-extrabold text-sky-900 mt-0.5">{formatJMD(LOCATIONS[locationKey].fee)}</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-xs text-yellow-800 uppercase tracking-wider font-bold">Branch</div>
                  <div className="text-sm font-extrabold text-yellow-900 mt-0.5 leading-tight">{LOCATIONS[locationKey].branch}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
 
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-5 h-5 text-blue-900" />
          <div className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Your Contact Details</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full Name *">
            <input type="text" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="e.g. John Brown" className="w-full px-3 py-3 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:border-blue-900"/>
          </Field>
          <Field label="Phone Number (WhatsApp) *">
            <input type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              placeholder="876-XXX-XXXX" className="w-full px-3 py-3 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:border-blue-900"/>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Company / Business Name (optional)">
              <input type="text" value={customer.company} onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                placeholder="Leave blank if personal" className="w-full px-3 py-3 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:border-blue-900"/>
            </Field>
          </div>
        </div>
      </div>
 
      <div className="bg-slate-900 rounded-xl p-5 mb-4">
        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Estimated Total</div>
        <div className="text-3xl font-black text-white tracking-tight leading-none">
          <span className="text-base text-slate-400 font-normal">JMD </span>
          {cartTotal.lo.toLocaleString()}<span className="text-slate-500 mx-2">–</span>{cartTotal.hi.toLocaleString()}
        </div>
        <div className="text-xs text-slate-500 mt-2">Range based on material specs · not binding</div>
      </div>
 
      <CTAButton onClick={() => setShowWAPreview(true)} disabled={!isReady} size="lg" className="w-full">
        <Send className="inline w-5 h-5 mr-2" /> Request Official Quotation via WhatsApp
      </CTAButton>
      {!isReady && (
        <div className="text-xs text-slate-500 text-center mt-2">
          {!customer.name.trim() && <span>· Add your name </span>}
          {!customer.phone.trim() && <span>· Add your phone </span>}
          {mode === 'install' && !locationKey && <span>· Select installation area</span>}
        </div>
      )}
 
      <div className="text-center mt-3 text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Sends to ECD WhatsApp Business — testing number ({ECD_PHONE.replace(/^1/, '+1 ').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')})
      </div>
 
      <div className="text-center mt-6 pt-4 border-t border-slate-200">
        <button onClick={onClearAll} className="text-xs text-slate-400 hover:text-red-600 underline">Clear all saved data</button>
      </div>
 
      {showWAPreview && (
        <WhatsAppPreviewModal message={waMessage} waLink={waLink} quoteId={quoteId} onClose={() => setShowWAPreview(false)} />
      )}
    </div>
  );
}
 
function Pill({ children, highlight }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${highlight ? 'bg-yellow-100 text-yellow-900 border border-yellow-300' : 'bg-slate-100 text-slate-700'}`}>{children}</span>
  );
}
 
function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
 
// ---------------------------------------------------------------
// WHATSAPP PREVIEW MODAL — body scroll lock + overscroll containment
// ---------------------------------------------------------------
function WhatsAppPreviewModal({ message, waLink, quoteId, onClose }) {
  // Body scroll lock to prevent background scroll bleed on iOS Safari
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);
 
  const handleSend = () => { window.open(waLink, '_blank'); };
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-3" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-emerald-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-black text-slate-900">ECD</div>
            <div>
              <div className="text-sm font-bold text-white">ECD Sales Team</div>
              <div className="text-xs text-emerald-200">WhatsApp Business · Testing</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-2"><X className="w-5 h-5" /></button>
        </div>
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-center gap-2">
          <Hash className="w-4 h-4 text-yellow-700 flex-shrink-0" />
          <div className="text-xs text-yellow-900"><strong>Quote ID:</strong> <span className="font-bold">{quoteId}</span></div>
        </div>
        <div className="bg-[#e5ddd5] flex-1 overflow-y-auto overscroll-contain p-4">
          <div className="bg-white rounded-lg rounded-tl-none p-3 max-w-[95%] shadow-sm">
            <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed break-words">{message}</pre>
            <div className="text-right text-xs text-slate-400 mt-2 flex items-center justify-end gap-1">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-sky-500">✓✓</span>
            </div>
          </div>
        </div>
        <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="text-xs text-slate-600 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Tapping send opens WhatsApp with this message pre-filled. You still tap WhatsApp's send button to deliver. <strong>Currently sending to test number 876-573-0746.</strong></span>
          </div>
          <CTAButton onClick={handleSend} size="md" className="w-full">
            <Send className="inline w-4 h-4 mr-1.5" /> Open WhatsApp & Send
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
 
// ---------------------------------------------------------------
// FOOTER — with Aura Digital credit
// ---------------------------------------------------------------
function Footer() {
  return (
    <footer className="bg-slate-900 px-4 pt-5 pb-4 mt-8 border-t border-slate-800">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 justify-between items-center text-xs">
        <div className="text-slate-500"><span className="text-yellow-400 font-bold">ECD</span> · Elegant Creative Dezynes · © 2026</div>
        <div className="text-slate-500 flex items-center gap-3">
          <a href="tel:8766620694" className="text-blue-300 hover:underline">(876) 662-0694</a>
          <span>·</span>
          <a href="mailto:elegant.cdezynes@yahoo.com" className="text-blue-300 hover:underline">Email</a>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
        Live React UX UI Mockup created by{' '}
        <a href="https://www.instagram.com/auradigitalja/" target="_blank" rel="noopener noreferrer"
           className="text-slate-400 hover:text-yellow-400 font-bold transition-colors underline-offset-4 hover:underline">
          Aura Digital
        </a>
      </div>
    </footer>
  );
}
