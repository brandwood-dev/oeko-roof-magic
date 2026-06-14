import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import {
  ShieldCheck, Award, HardHat, HeartHandshake, Wrench, Sparkles, CloudRain, Home, Loader2,
  Star, Phone, ArrowRight, CheckCircle2, ChevronDown, MapPin, Clock, ArrowUp,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { OekoFooter } from "@/components/oeko-footer";
import { submitQuoteLead } from "@/lib/api/quote-email.functions";
import heroRoof from "@/assets/hero-roof.jpg";
import rooferWork from "@/assets/roofer-work.jpg";
import beforeAfter from "@/assets/before-after.jpg";
import phenixHouse from "@/assets/phenix-house.jpg";

const LOGO = "https://res.cloudinary.com/dxkxiy900/image/upload/v1772626532/ok_tefpqi.png";
const HERO_IMAGE = "https://res.cloudinary.com/dxkxiy900/image/upload/v1781211097/AP_zg57w6.jpg";
const OEKO_PHONE_HREF = "tel:+33189701727";
const WEBFLOW_LP_PATH = "/lp/devis-toiture";
const SECTION_PATHS = {
  prestations: `${WEBFLOW_LP_PATH}/prestations`,
  expertise: `${WEBFLOW_LP_PATH}/expertise`,
  etapes: `${WEBFLOW_LP_PATH}/etapes`,
  faq: `${WEBFLOW_LP_PATH}/faq`,
} as const;

type SectionId = keyof typeof SECTION_PATHS;

function navigateToSection(event: MouseEvent<HTMLAnchorElement>, section: SectionId) {
  event.preventDefault();
  document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const path = SECTION_PATHS[section];
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "oeko:navigate-section", path, section }, "https://www.oeko.fr");
    return;
  }

  window.history.pushState({}, "", path);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OEKO • Rénovation de Toiture en Île-de-France | Spécialiste Phénix, Alskanor, Castor" },
      { name: "description", content: "Expert rénovation toiture et travaux de couverture en Île-de-France. Spécialiste maisons à ossature métallique Phénix®, Alskanor®, Castor®. Devis gratuit sous 48h. RGE Qualibat." },
      { property: "og:title", content: "OEKO • Rénovation de Toiture en Île-de-France" },
      { property: "og:description", content: "Spécialiste maisons à ossature métallique Phénix®, Alskanor®, Castor®. Devis gratuit sous 48h." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <Hero />
      <TrustStrip />
      <WhyOeko />
      <Services />
      <Expertise />
      <Steps />
      <SocialProof />
      <QuoteForm />
      <FAQ />
      <FinalCTA />
      <OekoFooter />
      <StickyMobileCTA />
      <BackToTop />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/85">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={LOGO} alt="OEKO" width={120} height={36} className="h-9 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6 text-primary-foreground/90 text-sm font-medium">
          <a href={SECTION_PATHS.prestations} onClick={(event) => navigateToSection(event, "prestations")} className="hover:text-accent">Prestations</a>
          <a href={SECTION_PATHS.expertise} onClick={(event) => navigateToSection(event, "expertise")} className="hover:text-accent">Expertise</a>
          <a href={SECTION_PATHS.etapes} onClick={(event) => navigateToSection(event, "etapes")} className="hover:text-accent">Étapes</a>
          <a href={SECTION_PATHS.faq} onClick={(event) => navigateToSection(event, "faq")} className="hover:text-accent">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          <a href={OEKO_PHONE_HREF} target="_top" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white/10 text-primary-foreground ring-1 ring-white/25 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition">
            <Phone className="size-4" /> <span className="hidden sm:inline">01 89 70 17 27</span>
          </a>
          <a href="#devis" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold hover:brightness-95 transition">
            <span className="hidden sm:inline">Devis gratuit</span>
            <span className="sm:hidden">Devis</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
      <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]">
        <div className="absolute -top-32 -right-24 size-[480px] rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-10 md:pt-14 md:pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs font-medium mb-5">
            <span className="size-2 rounded-full bg-accent" /> 17 ans d'expertise • RGE Qualibat
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15]">
            Rénovation de Toiture & Travaux de Couverture en{" "}
            <span className="text-accent">Île-de-France</span>
            <span className="block text-base md:text-lg font-semibold text-primary-foreground/80 mt-3">
              Spécialiste Maisons à Ossature Métallique
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-primary-foreground/85 max-w-xl">
            Expert <strong className="text-accent">Phénix®, Alskanor®, Castor®</strong> • Devis gratuit sous 48h • Intervention dans toute l'Île-de-France (77, 78, 91) et départements limitrophes (45, 60, 27, 28, 89, 10).
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="#devis" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-4 text-base font-bold shadow-soft hover:brightness-95 transition">
              Obtenir mon devis gratuit <ArrowRight className="size-5" />
            </a>
            <a href={OEKO_PHONE_HREF} target="_top" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 px-6 py-4 text-base font-semibold hover:bg-white/15 transition">
              <Phone className="size-5" /> Nous appeler
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}
              <span className="ml-1 font-semibold">4,9/5</span>
              <span className="text-primary-foreground/70">sur Google</span>
            </div>
            <span className="hidden sm:inline text-primary-foreground/30">•</span>
            <span className="inline-flex items-center gap-1.5 text-primary-foreground/85">
              <CheckCircle2 className="size-4 text-accent" /> Devis & déplacement gratuit
            </span>
          </div>
        </div>
        <div className="relative">
          {/* Mobile : image hero (inchangé) */}
          <div className="md:hidden relative rounded-3xl overflow-hidden shadow-soft ring-1 ring-white/10">
            <img src={HERO_IMAGE} alt="Toiture rénovée par OEKO" width={1536} height={1024} className="w-full h-[280px] object-cover" />
            <div className="absolute -bottom-5 -left-3 bg-card text-card-foreground rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <div className="size-10 rounded-full bg-accent grid place-items-center">
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <div className="text-sm">
                <div className="font-bold">Garantie Décennale</div>
                <div className="text-muted-foreground text-xs">Travaux assurés & certifiés</div>
              </div>
            </div>
          </div>
          {/* Desktop : formulaire devis intégré dans le hero */}
          <div id="devis-desktop" className="hidden md:block scroll-mt-24">
            <QuoteFormCard compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  // Marquee animé — 3 variations de messages SEO/dynamiques en boucle infinie
  const messages = [
    "✓ Spécialiste Rénovation Toiture Phénix®, Alskanor®, Castor® en Île-de-France",
    "✓ Devis Gratuit sous 48h • Intervention 7j/7 • Sans engagement",
    "✓ 17 ans d'expertise • RGE Qualibat • Garantie Décennale Couvreur Pro",
  ];
  // dupliqué pour défilement seamless
  const loop = [...messages, ...messages, ...messages, ...messages];
  return (
    <div className="border-y border-border bg-primary text-primary-foreground overflow-hidden">
      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee gap-12 py-3 pr-12 whitespace-nowrap text-sm font-semibold">
          {loop.map((msg, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span>{msg}</span>
              <span className="text-accent">★</span>
            </span>
          ))}
        </div>
        <div aria-hidden="true" className="flex shrink-0 animate-marquee gap-12 py-3 pr-12 whitespace-nowrap text-sm font-semibold">
          {loop.map((msg, i) => (
            <span key={`d-${i}`} className="inline-flex items-center gap-3">
              <span>{msg}</span>
              <span className="text-accent">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- WHY ---------------- */
function WhyOeko() {
  const cards = [
    { icon: Award, title: "17 ans d'expertise", desc: "Spécialisation exclusive sur les maisons à ossature métallique depuis 2008." },
    { icon: Home, title: "Spécialiste Phénix®, Alskanor®, Castor®", desc: "Maîtrise technique des contraintes spécifiques à ces constructions." },
    { icon: ShieldCheck, title: "RGE Qualibat + Décennale", desc: "Certifications officielles et garanties intégrales sur tous nos travaux." },
    { icon: HeartHandshake, title: "Accompagnement complet", desc: "Conseil pédagogique de l'étude au suivi post-chantier." },
  ];
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Pourquoi OEKO</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Pourquoi choisir OEKO pour votre rénovation de toiture ?</h2>
          <p className="mt-4 text-muted-foreground">
            Une expertise rare, des certifications solides, et un accompagnement humain pour des travaux de toiture sans stress.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:border-primary/30 transition">
              <div className="size-12 rounded-xl bg-primary text-primary-foreground grid place-items-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition">
                <Icon className="size-6" />
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { icon: Home, title: "Rénovation complète", desc: "Réfection totale de toiture, charpente et isolation pour une protection longue durée." },
    { icon: Wrench, title: "Réparation & Urgence", desc: "Intervention rapide en cas de fuite, tempête ou tuile cassée." },
    { icon: Sparkles, title: "Nettoyage & Démoussage", desc: "Démoussage, traitement hydrofuge et entretien préventif." },
    { icon: CloudRain, title: "Gouttières & Zinguerie", desc: "Pose, remplacement et entretien des évacuations d'eau pluviale." },
  ];
  return (
    <section id="prestations" className="py-10 md:py-14 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Prestations</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Nos Prestations de Rénovation de Toiture et Travaux de Couverture</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="rounded-2xl bg-card p-6 shadow-card ring-1 ring-border hover:ring-primary/30 transition">
              <div className="inline-flex items-center justify-center size-12 rounded-xl bg-accent text-accent-foreground mb-4">
                <Icon className="size-6" />
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <a href="#devis" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                Demander un devis <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERTISE ---------------- */
function Expertise() {
  return (
    <section id="expertise" className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <img src={phenixHouse} alt="Maison à ossature métallique Phénix rénovée" width={1024} height={1024} loading="lazy" className="rounded-3xl shadow-soft w-full object-cover aspect-[5/4]" />
          <div className="absolute -bottom-5 -right-5 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-soft hidden sm:block">
            <div className="text-3xl font-extrabold text-accent">17 ans</div>
            <div className="text-xs">d'expertise spécialisée</div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Expertise unique</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">
            Spécialiste Rénovation Toiture Maisons à Ossature Métallique{" "}
            <span className="text-primary">Phénix®, Alskanor®, Castor®</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Depuis plus de 17 ans, OEKO intervient exclusivement sur les maisons à ossature métallique.
            Ces constructions, célèbres pour leur structure acier, exigent un savoir-faire technique
            spécifique : choix de matériaux compatibles, ventilation adaptée, traitement anti-corrosion,
            et respect des contraintes de portance.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Étude technique préalable systématique",
              "Matériaux compatibles avec la structure métallique",
              "Traitement anti-condensation & ventilation optimisée",
              "Conformité aux normes constructeurs d'origine",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
          <a href="#devis" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary-deep transition">
            Étudier mon projet <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STEPS ---------------- */
function Steps() {
  const steps = [
    { n: "01", title: "Prise de contact", desc: "Échange téléphonique et compréhension de votre projet sous 48h." },
    { n: "02", title: "Diagnostic & devis", desc: "Visite technique gratuite, diagnostic complet, devis détaillé." },
    { n: "03", title: "Réalisation", desc: "Chantier propre, sécurisé, mené par nos couvreurs experts." },
    { n: "04", title: "Réception & garanties", desc: "Contrôle final, remise des garanties décennale et de parfait achèvement." },
  ];
  return (
    <section id="etapes" className="py-10 md:py-14 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">Méthode</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Les Étapes d'une Rénovation de Toiture avec OEKO</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition">
              <div className="text-5xl font-extrabold text-accent">{s.n}</div>
              <h3 className="mt-3 font-bold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOCIAL PROOF ---------------- */
function SocialProof() {
  const testimonials = [
    { name: "Sophie L.", city: "Melun (77)", text: "Rénovation complète de notre Phénix : équipe pro, chantier propre, résultat impeccable. Je recommande !" },
    { name: "Marc D.", city: "Mantes-la-Jolie (78)", text: "Spécialistes vraiment compétents sur l'ossature métallique. Devis clair, délais tenus." },
    { name: "Nadia B.", city: "Évry (91)", text: "Fuite réparée en urgence sous 24h. Diagnostic précis et tarif honnête. Merci OEKO." },
  ];
  return (
    <>
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Témoignages</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Ils nous ont confié leur rénovation de toiture</h2>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-card p-6 shadow-card ring-1 ring-border">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}
              </div>
              <blockquote className="text-sm leading-relaxed">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-bold">{t.name}</div>
                <div className="text-muted-foreground">{t.city}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
      <ProjectsRealises />
    </>
  );
}

function ProjectsRealises() {
  return (
    <section className="py-10 md:py-14 bg-secondary/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Projets Réalisés</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Nos chantiers de toiture en images</h2>
          <p className="mt-3 text-muted-foreground">
            Découvrez l'avant/après de nos rénovations en Île-de-France : nettoyage, isolation et réfection complète.
          </p>
        </div>
        <BeforeAfterGallery />
      </div>
    </section>
  );
}

/* ---------------- BEFORE / AFTER GALLERY ---------------- */
function BeforeAfterGallery() {
  const projects = [
    { before: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781208680/AV_egoyrj.jpg", after: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781208680/AP_dili7n.jpg", city: "Lardy (91)", type: "Nettoyage, démoussage, hydrofuge" },
    { before: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781210239/AV_baaxi8.jpg", after: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781210239/AP_irdue5.jpg", city: "Claye-Souilly (77)", type: "Isolation / Amélioration énergétique" },
    { before: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781210459/AV_hhh2vz.jpg", after: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781210459/AP_txbuwn.jpg", city: "Rambouillet (78)", type: "Rénovation / Réfection complète" },
    { before: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781210867/av_jzhxcz.jpg", after: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781210867/ap_ags7i1.jpg", city: "Tournan-en-Brie (77)", type: "Isolation / Amélioration énergétique" },
    { before: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781211098/AV_vdzjms.jpg", after: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781211097/AP_zg57w6.jpg", city: "Crosne (91)", type: "Nettoyage, démoussage, hydrofuge" },
    { before: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781211368/AV_qrrr1a.jpg", after: "https://res.cloudinary.com/dxkxiy900/image/upload/v1781211368/AP_xktbj3.jpg", city: "Crosne (91)", type: "Nettoyage, démoussage, hydrofuge" },
  ];
  return (
    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p, i) => (
        <article key={i} className="group rounded-2xl bg-card ring-1 ring-border shadow-card overflow-hidden hover:-translate-y-1 hover:ring-primary/30 transition">
          <div className="relative grid grid-cols-2 aspect-[16/10] bg-muted">
            <div className="relative overflow-hidden">
              <img src={p.before} alt={`Toiture avant rénovation - ${p.city}`} loading="lazy" className="w-full h-full object-cover grayscale-[35%] brightness-90 group-hover:scale-105 transition duration-500" />
              <span className="absolute top-2 left-2 rounded-full bg-foreground/85 text-background px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Avant</span>
            </div>
            <div className="relative overflow-hidden">
              <img src={p.after} alt={`Toiture après rénovation par OEKO - ${p.city}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-2 right-2 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Après</span>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
            <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-white grid place-items-center shadow ring-1 ring-border">
              <ArrowRight className="size-4 text-primary" />
            </div>
          </div>
          <div className="p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-sm">{p.type}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="size-3.5" /> {p.city}
              </div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => <Star key={j} className="size-3.5 fill-accent text-accent" />)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------- QUOTE FORM ---------------- */
type FormData = {
  project?: string;
  roof?: string;
  postal?: string;
  city?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};

function QuoteForm() {
  return (
    <section id="devis" className="py-10 md:py-14 bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Devis gratuit</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Obtenez votre devis gratuit pour rénovation de toiture</h2>
          <p className="mt-3 text-muted-foreground">Réponse sous 48h • Sans engagement • 100% gratuit</p>
        </div>
        <div className="mt-8">
          <QuoteFormCard />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <ShieldCheck className="size-4" /> Vos données sont confidentielles et utilisées uniquement pour votre devis.
        </p>
      </div>
    </section>
  );
}

function QuoteFormCard({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps = ["Projet", "Toiture", "Coordonnées & Localisation"];
  const progress = ((step + 1) / steps.length) * 100;

  const projects = [
    { id: "renovation", title: "Rénovation / Réfection complète", img: heroRoof },
    { id: "reparation", title: "Réparation urgente ou fuite", img: rooferWork },
    { id: "nettoyage", title: "Nettoyage, démoussage, hydrofuge", img: beforeAfter },
    { id: "isolation", title: "Isolation / Amélioration énergétique", img: phenixHouse },
  ];
  const roofs = [
    { id: "tuiles", title: "Tuiles (terre cuite ou béton)", img: heroRoof },
    { id: "ardoise", title: "Ardoise", img: beforeAfter },
    { id: "zinc", title: "Zinc / Métal", img: rooferWork },
    { id: "autre", title: "Autre / Je ne sais pas", img: phenixHouse },
  ];

  const canNext = () => {
    if (step === 0) return !!data.project;
    if (step === 1) return !!data.roof;
    if (step === 2) return !!(
      data.postal && /^\d{5}$/.test(data.postal) && data.city &&
      data.firstName && data.lastName && data.phone &&
      /^[0-9+\s().-]{8,}$/.test(data.phone || "")
    );
    return false;
  };

  const getLabel = (items: { id: string; title: string }[], id?: string) =>
    items.find((item) => item.id === id)?.title ?? id ?? "";

  const handleSubmit = async () => {
    if (!canNext() || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitQuoteLead({
        data: {
          project: getLabel(projects, data.project),
          roof: getLabel(roofs, data.roof),
          postal: data.postal || "",
          city: data.city || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          email: data.email || "",
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        },
      });

      navigate({ to: "/merci" });
    } catch (error) {
      console.error(error);
      setSubmitError("Votre demande n'a pas pu être envoyée. Veuillez réessayer ou nous contacter par téléphone.");
      setSubmitting(false);
    }
  };

  return (
    <div className={`rounded-3xl bg-card text-card-foreground shadow-soft ring-1 ring-border ${compact ? "p-4 md:p-5" : "p-5 md:p-8"}`}>
          {compact && (
            <div className="mb-3 text-center">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Devis gratuit en 2 min</p>
              <h3 className="mt-1 text-lg font-extrabold">Estimez votre rénovation</h3>
            </div>
          )}
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
                <span>Étape {step + 1} sur {steps.length} — {steps[step]}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden mb-6">
                <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
          <>
              {step === 0 && (
                <StepGrid>
                  {projects.map((p) => (
                    <CardChoice key={p.id} active={data.project === p.id} onClick={() => setData({ ...data, project: p.id })} img={p.img} title={p.title} />
                  ))}
                </StepGrid>
              )}

              {step === 1 && (
                <StepGrid>
                  {roofs.map((r) => (
                    <CardChoice key={r.id} active={data.roof === r.id} onClick={() => setData({ ...data, roof: r.id })} img={r.img} title={r.title} />
                  ))}
                </StepGrid>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <ContactStep data={data} setData={setData} />
                  <LocationStep data={data} setData={setData} />
                </div>
              )}

              {submitError && (
                <div className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {submitError}
                </div>
              )}

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || submitting}
                  className="px-5 py-3 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary disabled:opacity-30"
                >
                  Précédent
                </button>
                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    disabled={!canNext()}
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold disabled:opacity-40 hover:bg-primary-deep transition"
                  >
                    Continuer <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canNext() || submitting}
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 font-bold disabled:opacity-40 hover:brightness-95 transition"
                  >
                    {submitting ? (
                      <>Envoi en cours… <Loader2 className="size-5 animate-spin" /></>
                    ) : (
                      <>Envoyer ma demande <CheckCircle2 className="size-5" /></>
                    )}
                  </button>
                )}
              </div>
          </>
    </div>
  );
}

function StepGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

function CardChoice({ active, onClick, img, title }: { active: boolean; onClick: () => void; img?: string; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full text-left rounded-xl ring-1 transition overflow-hidden flex items-center gap-4 ${
        active ? "ring-2 ring-primary bg-primary/5" : "ring-border bg-card hover:ring-primary/40"
      }`}
    >
      {img && (
        <div className="h-16 w-20 shrink-0 overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
        </div>
      )}
      <span className="flex-1 min-w-0 font-semibold text-sm truncate">{title}</span>
      <span className={`mr-4 size-5 rounded-full grid place-items-center shrink-0 ${active ? "bg-primary text-primary-foreground" : "border border-border"}`}>
        {active && <CheckCircle2 className="size-4" />}
      </span>
    </button>
  );
}

function LocationStep({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  const [postal, setPostal] = useState(data.postal || "");
  const [city, setCity] = useState(data.city || "");
  const [suggestions, setSuggestions] = useState<{ nom: string; codesPostaux: string[] }[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!/^\d{5}$/.test(postal)) { setSuggestions([]); return; }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postal}&fields=nom,codesPostaux&format=json`);
        const json = await res.json();
        setSuggestions(json || []);
        if (json?.length === 1) {
          setCity(json[0].nom);
          setData({ ...data, postal, city: json[0].nom });
        } else {
          setOpen(true);
        }
      } catch { setSuggestions([]); }
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postal]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-accent/30 ring-1 ring-accent/50 p-4 text-sm flex items-start gap-3">
        <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
        <p>
          Nous intervenons en <strong>Île-de-France (77, 78, 91)</strong> et départements limitrophes
          (45, 60, 27, 28, 89, 10).
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold">Code postal</label>
          <input
            type="text" inputMode="numeric" maxLength={5} value={postal}
            onChange={(e) => setPostal(e.target.value.replace(/\D/g, ""))}
            onBlur={() => setData({ ...data, postal, city })}
            placeholder="75001"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <label className="text-sm font-semibold">Ville</label>
          <input
            type="text" value={city}
            onChange={(e) => { setCity(e.target.value); setOpen(true); }}
            onBlur={() => { setData({ ...data, postal, city }); setTimeout(() => setOpen(false), 150); }}
            placeholder="Votre ville"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary"
          />
          {open && suggestions.length > 1 && (
            <ul className="absolute z-10 left-0 right-0 mt-1 max-h-56 overflow-auto rounded-xl bg-popover ring-1 ring-border shadow-soft">
              {suggestions.map((s) => (
                <li key={s.nom}>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); setCity(s.nom); setData({ ...data, postal, city: s.nom }); setOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary">
                    {s.nom}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactStep({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Prénom *" value={data.firstName || ""} onChange={(v) => setData({ ...data, firstName: v })} placeholder="Marie" />
        <Field label="Nom *" value={data.lastName || ""} onChange={(v) => setData({ ...data, lastName: v })} placeholder="Dupont" />
      </div>
      <div className="rounded-2xl bg-primary/5 ring-1 ring-primary/20 p-4">
        <label className="text-sm font-bold text-primary flex items-center gap-2"><Phone className="size-4" /> Téléphone * <span className="text-xs font-normal text-muted-foreground">(pour vous rappeler rapidement)</span></label>
        <input
          type="tel" value={data.phone || ""}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          placeholder="06 12 34 56 78"
          className="mt-2 w-full rounded-xl border-2 border-primary/30 bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <Field label="Email" type="email" value={data.email || ""} onChange={(v) => setData({ ...data, email: v })} placeholder="marie@email.com" />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    { q: "Pourquoi faire appel à un spécialiste pour ma maison Phénix, Alskanor ou Castor ?", a: "Ces maisons à ossature métallique imposent des contraintes techniques particulières (portance, condensation, compatibilité matériaux). Un spécialiste garantit des travaux conformes et durables." },
    { q: "Sous quel délai recevrai-je mon devis ?", a: "Vous recevez votre devis détaillé sous 48h après notre visite technique, entièrement gratuite et sans engagement." },
    { q: "Quelles sont les zones d'intervention OEKO ?", a: "Toute l'Île-de-France (77, 78, 91) et les départements limitrophes : 45, 60, 27, 28, 89, 10." },
    { q: "Êtes-vous certifiés RGE ?", a: "Oui, OEKO est certifié RGE Qualibat et couvert par la garantie décennale obligatoire." },
    { q: "Puis-je bénéficier d'aides financières ?", a: "Selon les travaux (isolation notamment), vous pouvez prétendre à MaPrimeRénov', CEE, éco-PTZ. Nous vous accompagnons dans les démarches." },
  ];
  return (
    <section id="faq" className="py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Questions fréquentes</h2>
        </div>
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-5 shadow-card">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{it.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="py-10 md:py-14 bg-hero-gradient text-primary-foreground">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15]">Prêt à rénover votre toiture en toute sérénité ?</h2>
        <p className="mt-4 text-primary-foreground/85 max-w-2xl mx-auto">
          Devis gratuit sous 48h • Spécialiste maisons à ossature métallique • Intervention Île-de-France & limitrophes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#devis" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 text-base font-bold shadow-soft hover:brightness-95 transition">
            Obtenir mon devis gratuit <ArrowRight className="size-5" />
          </a>
          <a href={OEKO_PHONE_HREF} target="_top" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 px-7 py-4 text-base font-semibold hover:bg-white/15 transition">
            <Phone className="size-5" /> Appeler OEKO
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STICKY MOBILE CTA ---------------- */
function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
      <a href="#devis" className="flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground py-4 font-bold shadow-soft">
        Devis gratuit sous 48h <ArrowRight className="size-5" />
      </a>
    </div>
  );
}

/* ---------------- BACK TO TOP ---------------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-24 md:bottom-6 z-50 size-12 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-soft ring-1 ring-white/10 hover:bg-primary-deep transition"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
