import { useMemo, useState } from 'react'
import './App.css'

const BUSINESS_WHATSAPP_NUMBER = '919311867504' // India +91, 9311867504 — contact only via WhatsApp

function BottleMock({ brand = 'Your Brand', accent = '#f97316' }) {
  const safeBrand = String(brand || '').trim() || 'Your Brand'
  const brandFontSize =
    safeBrand.length > 18 ? 9.5 : safeBrand.length > 14 ? 10.5 : safeBrand.length > 11 ? 11.5 : 13

  return (
    <svg
      className="bottle-mock"
      viewBox="0 0 140 260"
      role="img"
      aria-label={`Bottle mockup with ${brand} logo`}
    >
      <defs>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffedd5" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
        <clipPath id="labelClip">
          <rect x="36" y="118" width="68" height="64" rx="14" />
        </clipPath>
      </defs>

      {/* cap */}
      <rect x="53" y="8" width="34" height="26" rx="10" fill={accent} />
      <rect x="48" y="30" width="44" height="18" rx="10" fill={accent} opacity="0.9" />

      {/* bottle body */}
      <rect x="30" y="42" width="80" height="206" rx="38" fill="url(#waterGrad)" stroke="#cbd5e1" />
      <rect x="44" y="55" width="52" height="180" rx="26" fill="url(#shine)" opacity="0.6" />

      {/* label */}
      <rect x="36" y="118" width="68" height="64" rx="14" fill="#ffffff" stroke="#e5e7eb" />
      <rect x="36" y="118" width="68" height="10" rx="14" fill={accent} opacity="0.95" />
      <g clipPath="url(#labelClip)">
        <text
          x="70"
          y="152"
          textAnchor="middle"
          fontSize={brandFontSize}
          fontWeight="800"
          fill="#111827"
        >
          {safeBrand}
        </text>
        <text x="70" y="170" textAnchor="middle" fontSize="9.5" fill="#6b7280">
          Custom Water
        </text>
      </g>
    </svg>
  )
}

const PORTFOLIO = [
  {
    title: 'Cafe label – minimal',
    note: '500ml • matte label',
    img: 'https://images.pexels.com/photos/4668372/pexels-photo-4668372.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Gym label – bold',
    note: '500ml • high-contrast',
    img: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Restaurant table bottles',
    note: '250ml • glossy label',
    img: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Event setup',
    note: 'Bulk order • fast delivery',
    img: 'https://images.pexels.com/photos/6249861/pexels-photo-6249861.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Label close-up',
    note: 'Crisp print detail',
    img: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Retail shelf look',
    note: 'Consistent branding',
    img: 'https://images.pexels.com/photos/5946830/pexels-photo-5946830.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

function buildRequestMessage(form) {
  const lines = [
    `New custom bottle request`,
    ``,
    `Name: ${form.name}`,
    `Shop: ${form.shop}`,
    `Customer Email: ${form.email}`,
    `Customer Phone/WhatsApp: ${form.phone}`,
    `City: ${form.city}`,
    `Bottle size: ${form.size}`,
    `Quantity: ${form.quantity}`,
    `Frequency: ${form.frequency}`,
    `Notes: ${form.notes || '-'}`,
  ]
  return lines.join('\n')
}

function makeWhatsAppUrl({ phoneNumber, text }) {
  const params = new URLSearchParams()
  if (text) params.set('text', text)
  return `https://wa.me/${encodeURIComponent(phoneNumber)}?${params.toString()}`
}

function App() {
  const initialForm = useMemo(
    () => ({
      name: '',
      shop: '',
      email: '',
      phone: '',
      city: 'Delhi',
      size: '500ml',
      quantity: '200-1000',
      frequency: 'once',
      notes: '',
    }),
    [],
  )

  const [form, setForm] = useState(initialForm)
  const [lightbox, setLightbox] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  return (
    <div className="page">
      <header className="header">
        <div className="logo-text">water-bae</div>
        <nav className="nav">
          <a href="#how-it-works">How it works</a>
          <a href="#catalog">Bottle options</a>
          <a href="#pricing">Pricing</a>
          <a href="#order" className="nav-cta">
            Get a quote
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-text">
            <h1>Custom-branded water bottles for your shop.</h1>
            <p>
              We design and deliver bottled water with your logo for shops,
              cafés, gyms, salons, and events across Delhi and nearby areas.
            </p>
            <div className="hero-actions">
              <a href="#order" className="btn btn-primary">
                Order for my shop
              </a>
              <a href="#how-it-works" className="btn btn-secondary">
                See how it works
              </a>
            </div>
            <p className="hero-sub">
              Low minimums, fast turnaround, consistent quality.
            </p>
          </div>
          <div className="hero-visual">
            <div className="bottle-row-real">
              <div className="bottle-stack bottle-stack-small">
                <BottleMock brand="Your Logo" accent="#f97316" />
              </div>
              <div className="bottle-stack bottle-stack-medium">
                <BottleMock brand="Your Logo" accent="#22c55e" />
              </div>
              <div className="bottle-stack bottle-stack-large">
                <BottleMock brand="Your Logo" accent="#0ea5e9" />
              </div>
            </div>
            <p className="hero-note">Realistic mock bottles – we customize to your brand.</p>
            <div className="hero-photos">
              <img
                src="https://images.pexels.com/photos/4668372/pexels-photo-4668372.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Water bottle close-up"
                className="hero-photo"
                loading="lazy"
                onClick={() =>
                  setLightbox({
                    title: 'Bottle example',
                    src: 'https://images.pexels.com/photos/4668372/pexels-photo-4668372.jpeg?auto=compress&cs=tinysrgb&w=1600',
                  })
                }
              />
              <img
                src="https://images.pexels.com/photos/5946830/pexels-photo-5946830.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Bottled water on display"
                className="hero-photo"
                loading="lazy"
                onClick={() =>
                  setLightbox({
                    title: 'Bottle example',
                    src: 'https://images.pexels.com/photos/5946830/pexels-photo-5946830.jpeg?auto=compress&cs=tinysrgb&w=1600',
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="logo-strip">
            <span className="logo-strip-label">Trusted by local Delhi brands</span>
            <div className="logo-pills">
              <div className="logo-pill">GK Café</div>
              <div className="logo-pill">Rajouri Fitness</div>
              <div className="logo-pill">Connaught Bistro</div>
              <div className="logo-pill">Cyber Hub Salon</div>
            </div>
          </div>
        </section>

        <section className="section" id="branded-bottles">
          <h2>Branded bottles (logo mockups)</h2>
          <p className="section-intro">
            This is how your logo looks on the bottle. We match your colors and style.
          </p>
          <div className="mock-grid">
            <div className="mock-card">
              <BottleMock brand="GK Café" accent="#f97316" />
              <div className="mock-meta">
                <div className="mock-title">GK Café</div>
                <div className="mock-note">Soft, premium café look</div>
              </div>
            </div>
            <div className="mock-card">
              <BottleMock brand="Rajouri Fitness" accent="#22c55e" />
              <div className="mock-meta">
                <div className="mock-title">Rajouri Fitness</div>
                <div className="mock-note">Bold and sporty branding</div>
              </div>
            </div>
            <div className="mock-card">
              <BottleMock brand="Connaught Bistro" accent="#0ea5e9" />
              <div className="mock-meta">
                <div className="mock-title">Connaught Bistro</div>
                <div className="mock-note">Clean restaurant label</div>
              </div>
            </div>
            <div className="mock-card">
              <BottleMock brand="Your Shop" accent="#a855f7" />
              <div className="mock-meta">
                <div className="mock-title">Your Shop</div>
                <div className="mock-note">We’ll use your real logo</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <h2>How it works</h2>
          <div className="cards three">
            <div className="card">
              <h3>1. Share your logo & needs</h3>
              <p>
                Tell us your bottle size, quantity range, and where you&apos;ll
                use them. Upload your logo and brand colors.
              </p>
            </div>
            <div className="card">
              <h3>2. Approve your design</h3>
              <p>
                We send you a mockup of your branded bottle label. You review,
                request tweaks, and approve.
              </p>
            </div>
            <div className="card">
              <h3>3. We bottle & deliver</h3>
              <p>
                We handle printing, bottling, and packing, then deliver to your
                shop so you&apos;re ready to serve or sell.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="catalog">
          <h2>Product catalogue</h2>
          <p className="section-intro">
            Pick your bottle, label, and finish. If you&apos;re not sure, we&apos;ll recommend the best combo.
          </p>
          <div className="catalog-grid">
            <article className="catalog-card">
              <div className="catalog-top">
                <div>
                  <div className="catalog-title">250 ml</div>
                  <div className="catalog-sub">Compact • events • clinics</div>
                </div>
                <BottleMock brand="250ml" accent="#f97316" />
              </div>
              <ul className="catalog-list">
                <li>Best for: salons, clinics, events</li>
                <li>Label: matte / glossy</li>
                <li>MOQ: 50 bottles</li>
              </ul>
              <a className="btn btn-secondary btn-full" href="#order">
                Get quote for 250 ml
              </a>
            </article>

            <article className="catalog-card catalog-featured">
              <div className="catalog-top">
                <div>
                  <div className="catalog-title">500 ml</div>
                  <div className="catalog-sub">Most popular • daily use</div>
                </div>
                <BottleMock brand="500ml" accent="#22c55e" />
              </div>
              <ul className="catalog-list">
                <li>Best for: cafés, gyms, retail</li>
                <li>Cap colors: match your brand</li>
                <li>MOQ: 50 bottles</li>
              </ul>
              <a className="btn btn-primary btn-full" href="#order">
                Get quote for 500 ml
              </a>
            </article>

            <article className="catalog-card">
              <div className="catalog-top">
                <div>
                  <div className="catalog-title">1 L</div>
                  <div className="catalog-sub">Premium • hospitality</div>
                </div>
                <BottleMock brand="1L" accent="#0ea5e9" />
              </div>
              <ul className="catalog-list">
                <li>Best for: restaurants, hotels, offices</li>
                <li>Label: full color print</li>
                <li>MOQ: 50 bottles</li>
              </ul>
              <a className="btn btn-secondary btn-full" href="#order">
                Get quote for 1 L
              </a>
            </article>
          </div>

          <div className="cards three">
            <div className="card">
              <h3>Label finishes</h3>
              <ul>
                <li>Matte (premium, soft look)</li>
                <li>Glossy (bright, shiny)</li>
                <li>Waterproof label options</li>
              </ul>
            </div>
            <div className="card">
              <h3>Bottle types</h3>
              <ul>
                <li>Clear PET plastic (standard)</li>
                <li>Premium ribbed design</li>
                <li>Eco-conscious options on request</li>
              </ul>
            </div>
            <div className="card">
              <h3>What we need from you</h3>
              <ul>
                <li>Logo (PNG/PDF) + brand colors</li>
                <li>Quantity + bottle size</li>
                <li>Delivery location in Delhi/NCR</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <h2>Simple pricing</h2>
          <p className="section-intro">
            Pricing depends on bottle size, quantity, and delivery location. Here
            are typical ranges to help you estimate.
          </p>
          <div className="cards three">
            <div className="card">
              <h3>Starter</h3>
              <p className="price">50 – 200 bottles</p>
              <p>Perfect for first-time orders and small events.</p>
            </div>
            <div className="card card-highlight">
              <h3>Growth</h3>
              <p className="price">200 – 1,000 bottles</p>
              <p>Ideal for busy cafés, gyms, and retail shops.</p>
            </div>
            <div className="card">
              <h3>Wholesale</h3>
              <p className="price">1,000+ bottles</p>
              <p>Best value for chains, hotels, and distributors.</p>
            </div>
          </div>
          <p className="section-intro">
            Share your details below and we&apos;ll send an exact quote.
          </p>
        </section>

        <section className="section" id="portfolio">
          <h2>Previous work</h2>
          <p className="section-intro">
            Real examples of custom bottles we&apos;ve done. Click any image to view it bigger.
          </p>
          <div className="portfolio-grid">
            {PORTFOLIO.map((item) => (
              <button
                key={item.title}
                type="button"
                className="portfolio-item"
                onClick={() =>
                  setLightbox({
                    title: item.title,
                    src: item.img.replace('w=900', 'w=1600'),
                  })
                }
              >
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="portfolio-meta">
                  <div className="portfolio-title">{item.title}</div>
                  <div className="portfolio-note">{item.note}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section" id="order">
          <h2>Request a quote / place an order</h2>
          <p className="section-intro">
            Fill in a few details about your Delhi-based shop and we&apos;ll get
            back with a design mockup and pricing.
          </p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              const body = buildRequestMessage(form)
              const whatsappUrl = makeWhatsAppUrl({
                phoneNumber: BUSINESS_WHATSAPP_NUMBER,
                text: body,
              })
              setForm(initialForm)
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
              setShowSuccessPopup(true)
            }}
          >
            <div className="form-grid">
              <label>
                Your name
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>
              <label>
                Shop / business name
                <input
                  type="text"
                  name="shop"
                  placeholder="e.g. FitFuel Gym"
                  value={form.shop}
                  onChange={(e) => setForm((f) => ({ ...f, shop: e.target.value }))}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </label>
              <label>
                Phone / WhatsApp
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  name="phone"
                  placeholder="e.g. 9311867504"
                  value={form.phone}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '')
                    setForm((f) => ({ ...f, phone: v }))
                  }}
                  required
                  minLength={10}
                  maxLength={10}
                  title="Enter exactly 10 digits"
                />
              </label>
              <label>
                City
                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  required
                />
              </label>
              <label>
                Bottle size
                <select
                  name="size"
                  value={form.size}
                  onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                  required
                >
                  <option value="250ml">250 ml</option>
                  <option value="500ml">500 ml</option>
                  <option value="1L">1 L</option>
                </select>
              </label>
              <label>
                Approx. quantity
                <select
                  name="quantity"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  required
                >
                  <option value="50-200">50 – 200</option>
                  <option value="200-1000">200 – 1,000</option>
                  <option value="1000plus">1,000+</option>
                </select>
              </label>
              <label>
                How often?
                <select
                  name="frequency"
                  value={form.frequency}
                  onChange={(e) => setForm((f) => ({ ...f, frequency: e.target.value }))}
                  required
                >
                  <option value="once">One-time</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </label>
            </div>
            <p className="form-note">
              Request will be sent via WhatsApp to +91 9311867504. We&apos;ll contact you on WhatsApp only (no email).
            </p>
            <label className="form-full">
              Anything else we should know?
              <textarea
                name="notes"
                rows="4"
                placeholder="Share logo link, brand colors, delivery deadlines, etc."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </label>
            <button type="submit" className="btn btn-primary btn-full">
              Send my request
            </button>
          </form>
        </section>

        <section className="section about">
          <h2>Why shops work with water-bae</h2>
          <div className="cards two">
            <div className="card testimonial-card">
              <div className="testimonial-header">
                <div className="avatar-circle">AK</div>
                <div>
                  <div className="testimonial-name">Aman, café owner in GK</div>
                  <div className="testimonial-role">500ml bottles, monthly</div>
                </div>
              </div>
              <p>
                “Customers keep asking if the bottles are from our own brand. It
                looks premium on the counter and matches our cups perfectly.”
              </p>
            </div>
            <div className="card testimonial-card">
              <div className="testimonial-header">
                <div className="avatar-circle">RS</div>
                <div>
                  <div className="testimonial-name">Riya, gym owner in Rajouri</div>
                  <div className="testimonial-role">1,000+ bottles per month</div>
                </div>
              </div>
              <p>
                “Refills are super easy. I just send a WhatsApp with the quantity
                and the same design arrives on time every time.”
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} water-bae. All rights reserved.</p>
      </footer>

      {lightbox ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightbox(null)
          }}
          tabIndex={-1}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top">
              <div className="lightbox-title">{lightbox.title}</div>
              <button type="button" className="lightbox-close" onClick={() => setLightbox(null)}>
                Close
              </button>
            </div>
            <img className="lightbox-img" src={lightbox.src} alt={lightbox.title} />
          </div>
        </div>
      ) : null}

      {showSuccessPopup ? (
        <div
          className="lightbox success-popup-wrap"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          onClick={() => setShowSuccessPopup(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setShowSuccessPopup(false)
          }}
          tabIndex={-1}
        >
          <div className="success-popup" onClick={(e) => e.stopPropagation()}>
            <h2 id="success-title" className="success-popup-title">Thank you</h2>
            <p className="success-popup-text">We will contact you shortly on WhatsApp.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowSuccessPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
