"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type LandingPageProps = {
  contactEmail: string;
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "What we do" },
  { href: "#process", label: "How it works" },
  { href: "#pathways", label: "Opportunities" },
  { href: "#faqs", label: "FAQs" },
];

function BrandMark({ size }: { size: number }) {
  return (
    <span className="brand-symbol" aria-hidden="true">
      <svg viewBox="0 0 44 44" width={size} height={size} role="presentation">
        <path
          d="M11 12h21M11 22h17M11 32h21"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.7"
          strokeLinecap="round"
        />
        <circle cx="32" cy="12" r="4.8" fill="#7cedd9" />
        <circle cx="28" cy="22" r="4.8" fill="#7cedd9" />
        <circle cx="32" cy="32" r="4.8" fill="#7cedd9" />
      </svg>
    </span>
  );
}

function Brand({ size = 38 }: { size?: number }) {
  return (
    <a className="brand" href="#top" aria-label="FiveNetwork home">
      <BrandMark size={size} />
      <span className="brand-word">
        Five<span>Network</span>
      </span>
    </a>
  );
}

export default function LandingPage({ contactEmail }: LandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [result, setResult] = useState("");
  const [fallbackText, setFallbackText] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (!name) {
      setFallbackText("");
      setResult("Please enter your name so we can personalize your introduction.");
      nameRef.current?.focus();
      return;
    }

    const subject = `Introduction to FiveNetwork — ${interest}`;
    const body = `Hello FiveNetwork,\n\nMy name is ${name}. I'm interested in ${interest.toLowerCase()}.\n\n${message || "I would like to learn more about FiveNetwork."}\n\nThank you,\n${name}`;
    const email = contactEmail.trim();

    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setFallbackText("");
      setResult("Your email app should open with your message. Nothing has been sent automatically.");
      return;
    }

    const fullText = `${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setFallbackText("");
      setResult(
        "Your introduction has been copied. You can paste it into a message to FiveNetwork once you have its verified contact details.",
      );
    } catch {
      setResult("Copy your introduction from the box below:");
      setFallbackText(fullText);
    }
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="container navbar">
          <Brand />
          <nav
            id="main-nav"
            className={menuOpen ? "nav-links open" : "nav-links"}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="nav-contact">
            Let&apos;s connect <span aria-hidden="true">↗</span>
          </a>
          <button
            className="mobile-menu"
            type="button"
            aria-controls="main-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-shape hero-shape-1" aria-hidden="true" />
          <div className="hero-shape hero-shape-2" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow light">
                <span className="eyebrow-dot" /> BUILD WHAT&apos;S NEXT WITH FIVENETWORK
              </div>
              <h1 id="hero-title">
                Your potential deserves <span>a bigger network.</span>
              </h1>
              <p>
                Talent can take you far. The right guidance and connections can help you go further.
                FiveNetwork supports emerging software professionals as they build confidence, sharpen
                their skills, and explore what&apos;s next.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-mint" href="#contact">
                  Join the conversation <span aria-hidden="true">↗</span>
                </a>
                <a className="btn btn-link-light" href="#services">
                  See what we do <span aria-hidden="true">↘</span>
                </a>
              </div>
              <div className="hero-trust">
                <span className="trust-spark" aria-hidden="true">
                  ✳
                </span>
                <span>US-focused technology careers</span>
                <span className="trust-sep">/</span>
                <span>Built around people</span>
              </div>
            </div>
            <div
              className="hero-art"
              role="img"
              aria-label="FiveNetwork conceptual network illustration, showing professional growth, connections and opportunity"
            >
              <svg className="orbit-lines" viewBox="0 0 600 520" fill="none" aria-hidden="true" role="presentation">
                <circle cx="315" cy="265" r="180" stroke="#FFFFFF" strokeOpacity=".10" />
                <circle cx="315" cy="265" r="244" stroke="#FFFFFF" strokeOpacity=".05" />
                <path
                  d="M98 380C200 270 200 115 329 127S455 280 548 150"
                  stroke="#7CEFD8"
                  strokeOpacity=".3"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                />
                <path
                  d="M80 238C196 218 278 396 442 400"
                  stroke="#FFFFFF"
                  strokeOpacity=".16"
                  strokeWidth="1.5"
                  strokeDasharray="3 8"
                />
              </svg>
              <div className="hero-card">
                <div className="hero-card-top">
                  <div className="tiny-brand">
                    <span className="tiny-dot" /> FIVENETWORK
                  </div>
                  <span className="hero-card-decoration">✦</span>
                </div>
                <div className="card-title-mini">Your career, connected.</div>
                <div className="card-diagram" aria-hidden="true">
                  <svg viewBox="0 0 360 190" role="presentation">
                    <defs>
                      <linearGradient id="networkLine" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#7cefd8" />
                        <stop offset="1" stopColor="#7e91f7" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M70 119L173 63L279 119L173 160L70 119Z"
                      fill="none"
                      stroke="url(#networkLine)"
                      strokeWidth="2"
                    />
                    <path
                      d="M173 63V160M70 119L279 119"
                      stroke="url(#networkLine)"
                      strokeWidth="2"
                      opacity=".58"
                    />
                    <circle cx="70" cy="119" r="22" fill="#17384f" stroke="#7cefd8" strokeWidth="2" />
                    <circle cx="173" cy="63" r="25" fill="#a5f9e9" />
                    <circle cx="279" cy="119" r="22" fill="#17384f" stroke="#7cefd8" strokeWidth="2" />
                    <circle cx="173" cy="160" r="18" fill="#7e91f7" />
                    <path d="M61 119h18M70 110v18" stroke="#a5f9e9" strokeWidth="2" strokeLinecap="round" />
                    <path
                      d="M165 63l6 6 12-13"
                      stroke="#133145"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M271 119h16" stroke="#a5f9e9" strokeWidth="2" strokeLinecap="round" />
                    <path d="M167 160h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="diagram-label label-learn">GROW</div>
                  <div className="diagram-label label-connect">CONNECT</div>
                  <div className="diagram-label label-create">EXPLORE</div>
                </div>
                <div className="hero-card-footer">
                  <span>PEOPLE FIRST. ALWAYS.</span>
                  <span>01 / 03</span>
                </div>
              </div>
              <div className="float-bubble bubble-one">
                <span className="bubble-icon">✳</span>
                <div>
                  <strong>Grow your skills</strong>
                  <small>Career development</small>
                </div>
              </div>
              <div className="float-bubble bubble-two">
                <span className="bubble-icon bubble-dark">↗</span>
                <div>
                  <strong>Find your people</strong>
                  <small>Professional connections</small>
                </div>
              </div>
              <div className="art-spark art-spark-one">✴</div>
              <div className="art-spark art-spark-two">✳</div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span>YOUR CAREER. YOUR DIRECTION.</span>
            <span>
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </span>
          </div>
        </section>

        <section className="value-strip" aria-label="FiveNetwork focus areas">
          <div className="container value-inner">
            <span>Career readiness</span>
            <span className="strip-star">✳</span>
            <span>Professional connections</span>
            <span className="strip-star">✳</span>
            <span>Interview confidence</span>
            <span className="strip-star">✳</span>
            <span>New possibilities</span>
          </div>
        </section>

        <section className="about section-light" id="about">
          <div className="container about-grid">
            <div className="section-prelude">
              <span className="eyebrow dark">
                <span className="eyebrow-dot" /> 01 / ABOUT US
              </span>
              <div className="about-decoration" aria-hidden="true">
                <span className="deco-cross">✳</span>
                <span className="deco-number">05</span>
              </div>
            </div>
            <div className="about-content">
              <h2>
                Great careers don&apos;t grow <em>in isolation.</em>
              </h2>
              <div className="about-lower">
                <p>
                  FiveNetwork is a professional network built around a simple idea: talented people
                  should have access to guidance, meaningful connections, and a clearer path forward.
                </p>
                <p>
                  We focus on aspiring and early-career software developers, offering practical career
                  support and helping members explore opportunities aligned with what they can genuinely
                  do.
                </p>
              </div>
              <a className="text-link" href="#process">
                Get to know our approach <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="services section-dark" id="services">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow light">
                  <span className="eyebrow-dot" /> 02 / WHAT WE DO
                </div>
                <h2>
                  The support behind
                  <br />
                  <span>your next step.</span>
                </h2>
              </div>
              <p>
                Not just advice. A more thoughtful way to develop your professional story, prepare for
                opportunities, and expand your network.
              </p>
            </div>
            <div className="service-grid">
              <article className="service-card">
                <div className="service-top">
                  <span className="card-index">01 / CAREER</span>
                  <span className="service-ico" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3>
                  Career
                  <br />
                  development
                </h3>
                <p>
                  Set clearer goals, identify areas to improve, and create a plan that reflects your
                  interests and ambitions.
                </p>
                <div className="service-line" />
              </article>
              <article className="service-card">
                <div className="service-top">
                  <span className="card-index">02 / BRAND</span>
                  <span className="service-ico" aria-hidden="true">
                    ▤
                  </span>
                </div>
                <h3>
                  Resume & profile
                  <br />
                  guidance
                </h3>
                <p>
                  Present your real projects, experience, and skills confidently through your resume and
                  LinkedIn profile.
                </p>
                <div className="service-line" />
              </article>
              <article className="service-card">
                <div className="service-top">
                  <span className="card-index">03 / PREPARE</span>
                  <span className="service-ico" aria-hidden="true">
                    ⌘
                  </span>
                </div>
                <h3>
                  Interview
                  <br />
                  preparation
                </h3>
                <p>
                  Practice technical and behavioral interviews and learn to explain your thinking clearly
                  and naturally.
                </p>
                <div className="service-line" />
              </article>
              <article className="service-card">
                <div className="service-top">
                  <span className="card-index">04 / CONNECT</span>
                  <span className="service-ico" aria-hidden="true">
                    ◎
                  </span>
                </div>
                <h3>
                  Opportunity
                  <br />
                  research
                </h3>
                <p>
                  Explore relevant US technology roles and make informed choices based on your
                  qualifications and goals.
                </p>
                <div className="service-line" />
              </article>
            </div>
          </div>
        </section>

        <section className="process section-light" id="process">
          <div className="container process-grid">
            <div className="process-heading">
              <div className="eyebrow dark">
                <span className="eyebrow-dot" /> 03 / HOW IT WORKS
              </div>
              <h2>
                It starts with
                <br />
                <em>a conversation.</em>
              </h2>
              <p>We keep the process personal, clear, and focused on what actually matters to you.</p>
              <a className="btn btn-dark" href="#contact">
                Start here <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-num">01</div>
                <div>
                  <h3>We get to know you</h3>
                  <p>
                    Tell us about your background, interests, technical skills, and what you&apos;d like
                    to achieve.
                  </p>
                </div>
                <span className="step-arrow">↗</span>
              </div>
              <div className="step-item">
                <div className="step-num">02</div>
                <div>
                  <h3>We explore the right support</h3>
                  <p>
                    Discuss resume feedback, interview practice, career guidance, or other resources
                    relevant to your goals.
                  </p>
                </div>
                <span className="step-arrow">↗</span>
              </div>
              <div className="step-item">
                <div className="step-num">03</div>
                <div>
                  <h3>We look for alignment</h3>
                  <p>
                    Consider potential roles or collaboration paths based on your actual experience and
                    available opportunities.
                  </p>
                </div>
                <span className="step-arrow">↗</span>
              </div>
              <div className="step-item">
                <div className="step-num">04</div>
                <div>
                  <h3>We agree on next steps</h3>
                  <p>
                    Review responsibilities and terms transparently. You decide what makes sense for you.
                  </p>
                </div>
                <span className="step-arrow">↗</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pathways section-cream" id="pathways">
          <div className="container">
            <div className="section-heading heading-dark">
              <div>
                <div className="eyebrow dark">
                  <span className="eyebrow-dot" /> 04 / POTENTIAL PATHWAYS
                </div>
                <h2>
                  Different strengths.
                  <br />
                  <em>Different ways to contribute.</em>
                </h2>
              </div>
              <p>
                Participation depends on your skills, interests, and the requirements of real
                opportunities—not a one-size-fits-all title.
              </p>
            </div>
            <div className="path-grid">
              <article className="path-card">
                <div className="path-top">
                  <span className="path-icon" aria-hidden="true">
                    ◇
                  </span>
                  <span>PATHWAY 01</span>
                </div>
                <h3>
                  Team coordination
                  <br />& communication
                </h3>
                <p>
                  For individuals interested in professional teamwork and communication-focused
                  responsibilities.
                </p>
                <ul>
                  <li>Facilitating agreed meetings and discussions</li>
                  <li>Supporting project communication</li>
                  <li>Organizing updates and collaboration</li>
                </ul>
                <div className="path-note">A coordination path—not a software developer role.</div>
              </article>
              <article className="path-card path-card-blue">
                <div className="path-top">
                  <span className="path-icon" aria-hidden="true">
                    ⌘
                  </span>
                  <span>PATHWAY 02</span>
                </div>
                <h3>
                  Software
                  <br />
                  development
                </h3>
                <p>
                  For candidates with the technical capabilities needed to contribute to real engineering
                  work.
                </p>
                <ul>
                  <li>Building and maintaining application features</li>
                  <li>Debugging and collaborating on code</li>
                  <li>Participating in technical discussions</li>
                </ul>
                <div className="path-note">Responsibilities must match demonstrated skills.</div>
              </article>
            </div>
            <p className="path-disclaimer">
              Any available paid work is subject to a separate, clearly documented role and compensation
              agreement. FiveNetwork membership itself is not a job offer.
            </p>
          </div>
        </section>

        <section className="principles section-light" id="principles">
          <div className="container principles-grid">
            <div className="principles-art" aria-hidden="true">
              <div className="principles-circle">
                <div className="big-five">
                  5<span>✳</span>
                </div>
                <div className="circle-caption">
                  Built on trust.
                  <br />
                  Designed for growth.
                </div>
              </div>
            </div>
            <div className="principles-copy">
              <div className="eyebrow dark">
                <span className="eyebrow-dot" /> THE WAY WE WORK
              </div>
              <h2>
                People first.
                <br />
                <em>Always.</em>
              </h2>
              <p>
                A great network is built on real relationships—not pressure or promises that sound too
                good to be true.
              </p>
              <ul className="principles-list">
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Transparency</strong>
                    <p>Clear communication about responsibilities, compensation, and expectations.</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Your identity stays yours</strong>
                    <p>You control your own accounts, credentials, applications, and employer interviews.</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Realistic opportunities</strong>
                    <p>We discuss genuine possibilities without guaranteeing hiring outcomes or income.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="faqs section-cream" id="faqs">
          <div className="container faq-grid">
            <div className="faq-intro">
              <div className="eyebrow dark">
                <span className="eyebrow-dot" /> 05 / GOOD QUESTIONS
              </div>
              <h2>
                Let&apos;s clear
                <br />
                <em>things up.</em>
              </h2>
              <p>
                Asking questions is a good thing. Here&apos;s what candidates often want to understand
                before taking the next step.
              </p>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  Does joining FiveNetwork guarantee me a job?{" "}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  No. We offer career-related support and help explore potential opportunities, but an
                  employer&apos;s hiring process and requirements determine whether a role is offered.
                </p>
              </details>
              <details>
                <summary>
                  Do I need professional experience to connect?{" "}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  Not necessarily. Our focus includes aspiring and junior developers. We&apos;ll want to
                  learn about your actual coursework, projects, skills, and goals to see what support may
                  fit.
                </p>
              </details>
              <details>
                <summary>
                  Is there compensation for participating?{" "}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  Career support and network participation are different from a paid assignment. If a
                  paid role or project is available, the responsibilities, compensation, and payment terms
                  must be agreed upon in writing beforehand.
                </p>
              </details>
              <details>
                <summary>
                  Will I need to share my LinkedIn login or computer access?{" "}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  No. You retain control of your accounts and computer. Profile support can be provided
                  through feedback or screen-sharing while you make changes yourself. Passwords and
                  verification codes are never required.
                </p>
              </details>
              <details>
                <summary>
                  What happens after the first conversation?{" "}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  We&apos;ll discuss your priorities and whether a suitable next step exists. You can
                  review details, ask follow-up questions, and decide whether you&apos;d like to
                  continue—without pressure.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="contact section-dark" id="contact">
          <div className="contact-noise" aria-hidden="true" />
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow light">
                <span className="eyebrow-dot" /> 06 / LET&apos;S CONNECT
              </div>
              <h2>
                Good things start
                <br />
                with <span>hello.</span>
              </h2>
              <p>
                Whether you&apos;re looking to grow your career or learn more about FiveNetwork,
                we&apos;re always happy to start with a conversation.
              </p>
              <div className="contact-small">
                NO PRESSURE. JUST A CONVERSATION. <span aria-hidden="true">✳</span>
              </div>
            </div>
            <div className="contact-panel">
              <h3>Introduce yourself.</h3>
              <p>Share a little about who you are, and we&apos;ll help you prepare a message to send.</p>
              <form id="contact-form" noValidate onSubmit={onSubmit}>
                <div className="field-row">
                  <label htmlFor="contact-name">
                    Your name
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                    />
                  </label>
                  <label htmlFor="contact-interest">
                    I&apos;m interested in
                    <select id="contact-interest" name="interest" defaultValue="Joining the talent network">
                      <option value="Joining the talent network">Joining the network</option>
                      <option value="Career development support">Career support</option>
                      <option value="Employer partnerships">Employer partnerships</option>
                      <option value="A general conversation">Something else</option>
                    </select>
                  </label>
                </div>
                <label htmlFor="contact-message">
                  Your message
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    placeholder="A little about your background or what you're looking for..."
                  />
                </label>
                <button className="btn btn-mint contact-submit" type="submit">
                  <span>Prepare my introduction</span>
                  <span aria-hidden="true">↗</span>
                </button>
                <div id="contact-result" className="contact-result" role="status" aria-live="polite">
                  {result}
                  {fallbackText ? (
                    <textarea readOnly value={fallbackText} aria-label="Prepared introduction to copy" rows={7} />
                  ) : null}
                </div>
              </form>
              <p className="form-footnote">
                This page does not send or store your information. It prepares a message you can copy.
                Set <code>NEXT_PUBLIC_FIVENETWORK_CONTACT_EMAIL</code> to a verified business email to
                open an email draft instead.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <Brand size={36} />
          <p>
            Connecting talent.
            <br />
            Creating opportunity.
            <br />
            Building careers.
          </p>
          <a href="#top" className="backtop">
            Back to top ↑
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {year} FiveNetwork. All rights reserved.</span>
          <span>Designed for real connections.</span>
          <span>Careers are personal. Your choices are yours.</span>
        </div>
      </footer>
    </>
  );
}
