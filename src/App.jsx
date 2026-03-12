import { useMemo, useState } from 'react'
import './App.css'

const BUSINESS_EMAIL = 'orders@water-bae.in'
const BUSINESS_WHATSAPP_NUMBER = '919999999999' // include country code, digits only (example)

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

function makeMailtoUrl({ to, subject, body }) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`
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
      sendVia: 'whatsapp',
    }),
    [],
  )

  const [form, setForm] = useState(initialForm)

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
            <div className="bottle-row">
              <div className="bottle bottle-small">
                <span>Your logo</span>
              </div>
              <div className="bottle bottle-medium">
                <span>Your logo</span>
              </div>
              <div className="bottle bottle-large">
                <span>Your logo</span>
              </div>
            </div>
            <p className="hero-note">Mock bottles – we customize to your brand.</p>
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
          <h2>Bottle & label options</h2>
          <div className="cards three">
            <div className="card">
              <h3>Sizes</h3>
              <ul>
                <li>250 ml – ideal for salons, clinics, events</li>
                <li>500 ml – perfect for gyms, cafés, retail</li>
                <li>1 L – restaurants, hotels, office spaces</li>
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
              <h3>Branding details</h3>
              <ul>
                <li>Full-color logo labels</li>
                <li>Matte or glossy finish</li>
                <li>Cap colors to match your brand</li>
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
              const subject = `Custom bottle request - ${form.shop || form.name || 'Delhi'}`

              const emailUrl = makeMailtoUrl({
                to: BUSINESS_EMAIL,
                subject,
                body,
              })
              const whatsappUrl = makeWhatsAppUrl({
                phoneNumber: BUSINESS_WHATSAPP_NUMBER,
                text: body,
              })

              const sendVia = form.sendVia
              setForm(initialForm)

              if (sendVia === 'email') {
                window.location.href = emailUrl
                return
              }
              if (sendVia === 'both') {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
                window.location.href = emailUrl
                return
              }

              window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
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
                  name="phone"
                  placeholder="+91 ..."
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  required
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
              <label>
                Send request via
                <select
                  name="sendVia"
                  value={form.sendVia}
                  onChange={(e) => setForm((f) => ({ ...f, sendVia: e.target.value }))}
                  required
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="both">Both</option>
                </select>
              </label>
            </div>
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
            <div className="card">
              <h3>Looks premium, feels on-brand</h3>
              <p>
                Your water should feel like a part of your brand, not an
                afterthought. We focus on clean, modern label designs that fit
                your vibe.
              </p>
            </div>
            <div className="card">
              <h3>Reliable and easy to reorder</h3>
              <p>
                Once we know your preferences, reorders are just a quick message
                away. Same design, consistent quality, every time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} water-bae. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
