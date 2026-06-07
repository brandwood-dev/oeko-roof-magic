import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2, Phone, Clock, Mail, ArrowLeft, Home, ClipboardList, UserCheck,
} from "lucide-react";

const LOGO = "https://res.cloudinary.com/dxkxiy900/image/upload/v1772626532/ok_tefpqi.png";

export const Route = createFileRoute("/merci")({
  head: () => ({
    meta: [
      { title: "Merci • Votre demande de devis OEKO est bien reçue" },
      { name: "description", content: "Votre demande de devis pour rénovation de toiture a bien été envoyée à OEKO. Notre équipe vous recontacte sous 48h." },
      { property: "og:title", content: "Merci • Demande de devis bien reçue — OEKO" },
      { property: "og:description", content: "Votre demande de devis pour rénovation de toiture a bien été envoyée à OEKO. Notre équipe vous recontacte sous 48h." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/merci" }],
  }),
  component: MerciPage,
});

function MerciPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroThankYou />
        <NextSteps />
        <ContactBlock />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Header() {
  return (
    <header className="bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/85">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO} alt="OEKO" width={120} height={36} className="h-9 w-auto" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-white/15 transition"
        >
          <ArrowLeft className="size-4" /> Retour à l'accueil
        </Link>
      </div>
    </header>
  );
}

/* ---------------- HERO THANK YOU ---------------- */
function HeroThankYou() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
      <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]">
        <div className="absolute -top-32 -right-24 size-[480px] rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 text-center">
        <div className="inline-flex items-center justify-center size-20 rounded-full bg-accent/20 ring-2 ring-accent/40 mb-6">
          <CheckCircle2 className="size-10 text-accent" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1]">
          Merci ! <span className="text-accent">Votre demande est bien envoyée</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-primary-foreground/85 max-w-2xl mx-auto">
          Notre équipe d'experts en rénovation de toiture étudie votre projet. 
          Vous recevrez une réponse personnalisée sous <strong className="text-accent">48 heures ouvrées</strong>.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+33100000000"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 text-base font-bold shadow-soft hover:brightness-95 transition"
          >
            <Phone className="size-5" /> Appeler OEKO maintenant
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 px-7 py-4 text-base font-semibold hover:bg-white/15 transition"
          >
            <Home className="size-5" /> Retour à l'accueil
          </Link>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-4 py-2 text-sm">
          <Clock className="size-4 text-accent" />
          <span>Horaires : Lun–Ven 8h–18h • Sam 9h–12h</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- NEXT STEPS ---------------- */
function NextSteps() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Analyse de votre projet",
      desc: "Notre expert technique examine les informations de votre demande : type de toiture, localisation et contraintes spécifiques.",
      delay: "Sous 24h",
    },
    {
      icon: Phone,
      title: "Appel de confirmation",
      desc: "Un conseiller vous appelle pour préciser votre besoin et fixer un rendez-vous de diagnostic sur site.",
      delay: "Sous 48h",
    },
    {
      icon: UserCheck,
      title: "Visite & devis détaillé",
      desc: "Notre couvreur se déplace gratuitement pour un diagnostic complet et vous remet un devis transparent et détaillé.",
      delay: "Sur RDV",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Prochaines étapes</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Ce qui se passe maintenant</h2>
          <p className="mt-4 text-muted-foreground">
            Chez OEKO, chaque projet est unique. Voici les 3 étapes pour concrétiser votre rénovation de toiture.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:border-primary/30 transition"
            >
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold shadow-sm">
                <Clock className="size-3.5" /> {s.delay}
              </div>
              <div className="size-12 rounded-xl bg-primary text-primary-foreground grid place-items-center mb-4 mt-2">
                <s.icon className="size-6" />
              </div>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT BLOCK ---------------- */
function ContactBlock() {
  return (
    <section className="py-16 md:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 shadow-soft">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">
                Une urgence ou une question ?
              </h2>
              <p className="mt-4 text-primary-foreground/85">
                Notre équipe est disponible pour toute demande urgente (fuite, tempête, tuile cassée). 
                N'hésitez pas à nous appeler directement.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="tel:+33100000000"
                  className="flex items-center gap-4 rounded-2xl bg-white/10 ring-1 ring-white/20 p-4 hover:bg-white/15 transition"
                >
                  <div className="size-12 rounded-full bg-accent grid place-items-center shrink-0">
                    <Phone className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/70">Par téléphone</div>
                    <div className="font-bold text-lg">01 00 00 00 00</div>
                  </div>
                </a>
                <a
                  href="mailto:contact@oeko.fr"
                  className="flex items-center gap-4 rounded-2xl bg-white/10 ring-1 ring-white/20 p-4 hover:bg-white/15 transition"
                >
                  <div className="size-12 rounded-full bg-accent grid place-items-center shrink-0">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/70">Par email</div>
                    <div className="font-bold text-lg">contact@oeko.fr</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8">
              <h3 className="font-bold text-lg mb-4">Nos horaires d'ouverture</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Lundi – Vendredi</span>
                  <span className="font-semibold">8h00 – 18h00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Samedi</span>
                  <span className="font-semibold">9h00 – 12h00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Dimanche</span>
                  <span className="text-primary-foreground/60">Fermé — urgence uniquement</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-accent grid place-items-center shrink-0">
                    <CheckCircle2 className="size-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Intervention urgente 24/7</div>
                    <div className="text-primary-foreground/70 text-xs">Pour les fuites et dégâts des eaux</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground/80">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <img src={LOGO} alt="OEKO" width={120} height={36} className="h-9 w-auto" />
          <p className="mt-4 text-sm">
            Spécialiste rénovation toiture & couverture pour maisons à ossature métallique. Île-de-France et limitrophes.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground">Prestations</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Rénovation complète</li>
            <li>Réparation & urgence</li>
            <li>Nettoyage & démoussage</li>
            <li>Gouttières & zinguerie</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground">Certifications</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>RGE Qualibat</li>
            <li>Garantie Décennale</li>
            <li>17 ans d'expertise</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} OEKO. Tous droits réservés.</span>
          <span>Phénix®, Alskanor® et Castor® sont des marques de leurs propriétaires respectifs.</span>
        </div>
      </div>
    </footer>
  );
}
