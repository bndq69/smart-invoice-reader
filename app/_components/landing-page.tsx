import Image from "next/image";
import { getDictionary, localeSettings, type Locale } from "@/app/_dictionaries";
import { ContactForm } from "./contact-form";
import { EventTracker } from "./event-tracker";
import { ExchangeDiagram } from "./exchange-diagram";
import {
  BoltIcon,
  CheckIcon,
  CrossIcon,
  PlusIcon,
  PowerIcon,
  SignalIcon,
  WhatsAppIcon,
  problemIcons,
  trustIcons,
} from "./icons";
import { RevealOnScroll } from "./reveal-on-scroll";
import { whatsappLink } from "./whatsapp";

// Card styling from the old page, in the same order as the dictionary lists.
const problemColors = ["b", "g", "r", "a", "b", "g", "a"];
const featureColors = ["g", "b", "b", "r", "a", "g", "b", "g", "a", "r"];
const planColors = ["g", "b", "a"];
const planButtons = ["trial", "monthly", "yearly"];

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

// `track` names the button in the WhatsApp click counts (see EventTracker).
function WhatsAppButton({
  message,
  track,
  className,
  children,
}: {
  message: string;
  track: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a className={className} href={whatsappLink(message)} target="_blank" rel="noopener" data-wa={track}>
      {children}
    </a>
  );
}

// Every section of the old landing page, in the same order and with the same anchors.
export function LandingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const rtl = localeSettings[locale].dir === "rtl";
  const defaultWa = t.whatsapp.defaultMessage;
  const roles = [
    { key: "owner", ...t.roles.owner, blockedIcon: <PlusIcon /> },
    { key: "manager", ...t.roles.manager, blockedIcon: <CrossIcon /> },
    { key: "rep", ...t.roles.rep, blockedIcon: <CrossIcon /> },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <BoltIcon />
              {t.hero.eyebrow}
            </span>
            <h1>
              {t.hero.titleStart}
              <br />
              <span className="accent">{t.hero.titleAccent}</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-actions">
              <a className="btn btn-outline btn-lg" href="#how">
                {t.hero.howButton}
              </a>
            </div>
            <ul className="hero-badges">
              {t.hero.badges.map((badge) => (
                <li key={badge}>
                  <CheckIcon /> {badge}
                </li>
              ))}
            </ul>
          </div>

          <div className="phone-wrap">
            <div className="phone">
              <div className="screen">
                <Image src="/assets/app-home.png" width={1080} height={2400} sizes="276px" preload alt={t.hero.imageAlt} />
              </div>
            </div>
            <div className="float-tag t1" aria-hidden="true">
              <CheckIcon />
              {t.hero.tagRead}
            </div>
            <div className="float-tag t2" aria-hidden="true">
              <SignalIcon />
              {t.hero.tagOffline}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="trust">
        <div className="container">
          <ul>
            {t.trust.map((item, i) => (
              <li key={item}>
                <span className="ico">{trustIcons[i]}</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Problems */}
      <section className="section" id="problems">
        <div className="container">
          <SectionHead {...t.problems} />
          <div className="grid grid-3">
            {t.problems.cards.map((card, i) => (
              <div key={card.title} className={i === t.problems.cards.length - 1 ? "card card-wide reveal" : "card reveal"}>
                <div className={`ic ${problemColors[i]}`}>{problemIcons[i]}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-soft" id="features">
        <div className="container">
          <SectionHead {...t.features} />
          <div className="grid grid-3">
            {t.features.cards.map((card, i) => (
              <div key={card.title} className={i === t.features.cards.length - 1 ? "card card-wide-lg reveal" : "card reveal"}>
                <span className={`tag ${featureColors[i]}`}>{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how">
        <div className="container">
          <SectionHead {...t.how} />
          <div className="steps">
            {t.how.steps.map((step, i) => (
              <div key={step.title} className="step reveal">
                <div className="num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team exchange */}
      <section className="section section-soft" id="exchange">
        <div className="container">
          <SectionHead {...t.exchange} />
          <div className="sync-grid">
            {[
              { ...t.exchange.file, color: "g" },
              { ...t.exchange.online, color: "b" },
            ].map((way) => (
              <div key={way.title} className="card sync-card reveal">
                <span className={`tag ${way.color}`}>{way.tag}</span>
                <h3>{way.title}</h3>
                <ul>
                  {way.points.map((point) => (
                    <li key={point}>
                      <CheckIcon /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ExchangeDiagram text={t.exchange.diagram} rtl={rtl} />
        </div>
      </section>

      {/* Roles */}
      <section className="section" id="roles">
        <div className="container">
          <SectionHead {...t.roles} />
          <div className="grid grid-3">
            {roles.map((role) => (
              <div key={role.key} className="card role-card reveal">
                <span className={`badge ${role.key}`}>{role.name}</span>
                <h4>{t.roles.allowedLabel}</h4>
                <ul className="ok">
                  {role.allowed.map((item) => (
                    <li key={item}>
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
                <h4>{role.blockedLabel}</h4>
                <ul className="no">
                  {role.blocked.map((item) => (
                    <li key={item}>
                      {role.blockedIcon} {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="kill reveal">
            <div className="ic">
              <PowerIcon />
            </div>
            <div className="kill-text">
              <h3>{t.roles.kill.title}</h3>
              <p>{t.roles.kill.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section section-soft" id="pricing">
        <div className="container">
          <SectionHead {...t.pricing} />
          <div className="grid grid-3">
            {t.pricing.plans.map((plan, i) => {
              const featured = i === t.pricing.plans.length - 1;
              return (
                <div key={plan.name} className={featured ? "card plan featured reveal" : "card plan reveal"}>
                  <span className={`tag ${planColors[i]}`}>{plan.tag}</span>
                  <h3>{plan.name}</h3>
                  <div className="price">
                    {plan.price} <small>{plan.period}</small>
                  </div>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <CheckIcon /> {feature}
                      </li>
                    ))}
                  </ul>
                  <WhatsAppButton message={plan.waMessage} track={planButtons[i]} className={featured ? "btn btn-whatsapp" : "btn btn-outline"}>
                    {plan.button}
                  </WhatsAppButton>
                </div>
              );
            })}
          </div>
          <p className="plans-note reveal">{t.pricing.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHead {...t.faq} />
          <div className="faq reveal">
            {t.faq.items.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>
                  {item.q}
                  <span className="plus">
                    <PlusIcon strokeWidth="3" />
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section section-soft" id="contact">
        <div className="container">
          <SectionHead {...t.contact} />
          <div className="contact-grid">
            <div className="card contact-info reveal">
              <h3>{t.contact.info.title}</h3>
              <p>{t.contact.info.body}</p>
              <ul>
                {t.contact.info.points.map((point) => (
                  <li key={point}>
                    <CheckIcon /> {point}
                  </li>
                ))}
              </ul>
              <p>{t.contact.info.urgent}</p>
              <WhatsAppButton message={defaultWa} track="contact" className="btn btn-whatsapp">
                <WhatsAppIcon />
                {t.contact.info.whatsapp}
              </WhatsAppButton>
            </div>
            <ContactForm locale={locale} text={t.contact.form} whatsappUrl={whatsappLink(defaultWa)} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-final">
        <div className="container">
          <div className="cta-box reveal">
            <h2>{t.cta.title}</h2>
            <p>{t.cta.body}</p>
            <WhatsAppButton message={defaultWa} track="final_cta" className="btn btn-whatsapp btn-lg btn-cta">
              <WhatsAppIcon />
              {t.cta.button}
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <RevealOnScroll />
      <EventTracker locale={locale} />
    </>
  );
}
