"use client"

import { useState } from 'react'
import { ArrowUpRight, Menu, X, Radio, ShieldCheck, Layers3, ChevronRight } from 'lucide-react'

const assets = {
  hero: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/hero-animation',
  heroFallback: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.%20Hero-3H8LNQwOPz7CpM0fRse91pEH3hXGHj.png',
  fusion: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/Tactical_UI_animation_with_data_202609011714.webp',
  evidence: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/Animate_UI_diagram_image_202609011810.webp',
  events: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/Animate_UI_diagram_image_202609011820.webp',
  ai: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/Animate_UI_diagram_image_elements_202609011832.webp',
  domains: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/Animate_UI_diagram_image_elements_202609011847.webp',
  compact: 'https://b26idl49aps3cfpr.public.blob.vercel-storage.com/Animate_UI_diagram_image_202609011859.webp',
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lo%20go-I7FLmVLNRKhSh74uY7rjwf6eRSBvnj.png'
}

const steps = [
  ['Sense', 'Integrate observations from sensors, systems and external sources'],
  ['Detect', 'Identify events, conditions and behaviours requiring attention'],
  ['Understand', 'Correlate context, evidence and provenance'],
  ['Assist', 'Support investigation and decision-making'],
  ['Act', 'Enable human-directed, assisted or authorized workflows.'],
  ['Improve', 'Strengthen performance through validated experience']
]

const nav = ['Platform', 'Capabilities', 'Contexts', 'Deployment', 'About']

export default function Home() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setStatus('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/contact', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(Object.fromEntries(form)) 
    })
    setSending(false)
    if (response.ok) {
      event.currentTarget.reset()
      setStatus('Thank you. Your request has been sent to contact@eryon.com.')
    } else {
      const result = await response.json().catch(() => ({}))
      setStatus(result.error || 'Unable to send your request right now.')
    }
  }

  return <main>
    <header className="site-header">
      <a href="#top" className="brand"><img src={assets.logo} alt="ERYON" /></a>
      <nav>
        {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}
      </nav>
      <a className="header-cta" href="#contact">Request a demo <ArrowUpRight /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="mobile-nav">
          {nav.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>Request a demo <ArrowUpRight /></a>
        </div>
      )}
    </header>

    <section id="top" className="hero" style={{ backgroundImage: `url(${assets.hero})` }}>
      <div className="hero-shade"/>
      <div className="hero-copy">
        <p className="eyebrow">MULTI-DOMAIN SITUATIONAL AWARENESS PLATFORM</p>
        <h1>One operational picture.<br/><em>Across sensors, systems and domains.</em></h1>
        <p className="hero-lede">From sensor data to operational awareness. ERYON unifies observations from sensors, operational systems and external sources into a single operational environment designed for monitoring, investigation, decision support and progressively more controlled action.</p>
        <div className="actions">
          <a className="button primary" href="#contact">Request a demo <ArrowUpRight /></a>
          <a className="text-link" href="#platform">Explore the platform <ChevronRight /></a>
        </div>
      </div>
    </section>

    <section className="statement">
      <p className="eyebrow">THE ERYON ENVIRONMENT</p>
      <h2>Complex operations do not need more data.<br/><span>They need coherent understanding.</span></h2>
      <p>ERYON is a unified environment for making sense of heterogeneous observations — and turning them into operational clarity without forcing every domain into the same shape.</p>
    </section>

    <section id="platform" className="feature-block split">
      <div className="feature-text">
        <p className="eyebrow">FUSION</p>
        <h2>Turn live activity into <em>operational events.</em></h2>
        <p>Disparate data. Correlated. Contextualized. Actionable. ERYON brings sensor and system inputs into a shared operational picture, so teams can see emerging conditions before they become disconnected incidents.</p>
        <a className="text-link" href="#capabilities">Explore capabilities <ChevronRight /></a>
      </div>
      <figure>
        <img 
          src={assets.fusion} 
          alt="Conceptual illustration of sensor data converging through a fusion engine"
          loading="lazy"
          className="seamless-image"
        />
      </figure>
    </section>

    <section className="narrative">
      <figure className="events-visual">
        <img 
          src={assets.events} 
          alt="Operational events detected across a maritime environment"
          loading="lazy"
          className="seamless-image"
        />
      </figure>
      <div className="narrative-intro">
        <p className="eyebrow">THE OPERATIONAL LOOP</p>
        <h2>From observation<br/>to better outcomes.</h2>
        <p>Move from raw signals to validated action through a continuous operational loop.</p>
      </div>
      <div className="step-list">
        {steps.map(([title, desc], i) => (
          <div className="process-point" key={title}>
            <span>0{i + 1}</span>
            <div>
              <strong>{title}</strong>
              <small>{desc}</small>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section id="capabilities" className="feature-block dark-panel">
      <div className="feature-text">
        <p className="eyebrow">EVIDENCE & CONTEXT</p>
        <h2>See what happened — <em>and why.</em></h2>
        <p>Investigation becomes a connected story. Trace events across time, sources and domains with the evidence, provenance and confidence needed to move from suspicion to understanding.</p>
      </div>
      <figure>
        <img 
          src={assets.evidence} 
          alt="Conceptual incident reconstruction and evidence timeline"
          loading="lazy"
          className="seamless-image"
        />
      </figure>
    </section>

    <section id="contexts" className="feature-block split reverse">
      <div className="feature-text">
        <p className="eyebrow">MULTI-DOMAIN</p>
        <h2>Designed for operations<br/><em>across domains.</em></h2>
        <p>Sea. Air. Land. Subsurface. Extend situational awareness across the environments your operation depends on, while preserving the detail each domain requires.</p>
      </div>
      <figure>
        <img 
          src={assets.domains} 
          alt="Conceptual multi-domain operational picture across sea air land and subsurface"
          loading="lazy"
          className="seamless-image"
        />
      </figure>
    </section>

    <section id="deployment" className="deployment">
      <div className="deployment-copy">
        <p className="eyebrow">DEPLOYMENT</p>
        <h2>High performance.<br/><em>Compact footprint.</em></h2>
        <p>Deploy where operational reality demands it: at the edge, on-premise, in the cloud, or across a considered combination of all three.</p>
        <div className="mini-grid">
          <span><Radio/>Real-time processing</span>
          <span><Layers3/>Data fusion & analytics</span>
          <span><ShieldCheck/>Secure integration</span>
        </div>
      </div>
      <img 
        src={assets.compact} 
        alt="Conceptual compact ERYON edge processing infrastructure"
        loading="lazy"
        className="seamless-image"
      />
    </section>

    <section className="ai-strip">
      <p className="eyebrow">CONTROLLED AUTOMATION</p>
      <h2>AI where it improves operations.<br/><em>Deterministic systems where predictability matters.</em></h2>
      <p>Automation is earned, not assumed. Progressive automation. Explicit human control. Measurable operational performance.</p>
      <img 
        src={assets.ai} 
        alt="Conceptual human-in-the-loop AI assistance workflow"
        loading="lazy"
        className="seamless-image"
      />
    </section>

    <section id="about" className="closing">
      <p className="eyebrow">BUILT FOR THE LONG VIEW</p>
      <h2>Built to improve through<br/><em>operational experience.</em></h2>
      <p>ERYON is designed to become more useful with the people, systems and environments it serves.</p>
    </section>

    <section id="contact" className="contact">
      <div>
        <p className="eyebrow">START A CONVERSATION</p>
        <h2>Bring clarity to<br/><em>complex operations.</em></h2>
        <p>Tell us about your organization, operational environment and requirements. We'll tailor the discussion to your use case, integration needs and deployment context.</p>
      </div>
      <form onSubmit={submitContact}>
        <label>Name
          <input name="name" placeholder="Your name" required />
        </label>
        <label>Organization
          <input name="organization" placeholder="Your organization" required />
        </label>
        <label>Work email
          <input name="email" type="email" placeholder="you@company.com" required />
        </label>
        <label>Project / requirements
          <textarea name="requirements" placeholder="Briefly describe your operational requirements, existing systems or project context." rows={4} />
        </label>
        <button className="button primary" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Request a demo'} <ArrowUpRight />
        </button>
        {status && <p className="form-status" role="status">{status}</p>}
      </form>
    </section>

    <footer>
      <img src={assets.logo} alt="ERYON" />
      <a className="email-link" href="mailto:contact@eryon.com">contact@eryon.com</a>
      <a className="linkedin-link" href="https://www.linkedin.com/company/eryon" target="_blank" rel="noreferrer" aria-label="ERYON on LinkedIn">LinkedIn</a>
      <span>ERYON is a product of Atlas Digital Solutions LLC.</span>
      <span>© 2026 ERYON. Privacy · Terms</span>
    </footer>
  </main>
}