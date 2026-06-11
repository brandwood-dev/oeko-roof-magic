import { Mail, MapPin, Phone } from "lucide-react";

const LOGO = "https://res.cloudinary.com/dxkxiy900/image/upload/v1772626532/ok_tefpqi.png";
const OEKO_PHONE = "01 89 70 17 27";
const OEKO_PHONE_HREF = "tel:+33189701727";
const OEKO_ADDRESS = "16 Bis Bd Chamblain 77000 Melun";
const OEKO_EMAIL = "contact@oeko.fr";

type SocialIconProps = {
  name: "facebook" | "instagram" | "linkedin";
};

function SocialIcon({ name }: SocialIconProps) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth="1.8">
        <path d="M14 8h3V4.5A8 8 0 0 0 14.5 4C12 4 10 5.5 10 8.5V11H7v4h3v5h4v-5h3l.5-4H14V8.8c0-.5.2-.8.8-.8H17" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
    </svg>
  );
}

const socialLinks = [
  { name: "facebook" as const, label: "Facebook OEKO", href: "https://www.facebook.com/oeko.idf/" },
  { name: "instagram" as const, label: "Instagram OEKO", href: "https://www.instagram.com/oeko.idf/" },
  { name: "linkedin" as const, label: "LinkedIn OEKO", href: "https://www.linkedin.com/company/oeko-fr/" },
];

export function OekoFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <img src={LOGO} alt="OEKO" width={120} height={36} className="h-9 w-auto" />
          <p className="mt-4 text-sm">
            Spécialiste rénovation toiture & couverture pour maisons à ossature métallique. Île-de-France et limitrophes.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-10 place-items-center rounded-full border border-white/20 text-primary-foreground transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
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
        <div>
          <h4 className="font-bold text-primary-foreground">Coordonnées</h4>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{OEKO_ADDRESS}</span>
            </li>
            <li>
              <a href={OEKO_PHONE_HREF} className="flex items-center gap-2 hover:text-accent">
                <Phone className="size-4 shrink-0 text-accent" />
                <span>{OEKO_PHONE}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${OEKO_EMAIL}`} className="flex items-center gap-2 hover:text-accent">
                <Mail className="size-4 shrink-0 text-accent" />
                <span>{OEKO_EMAIL}</span>
              </a>
            </li>
            <li><a href="https://www.oeko.fr/mentions-legales" target="_top" className="hover:text-accent">Mentions légales</a></li>
            <li><a href="https://www.oeko.fr/politique-de-confidentialite" target="_top" className="hover:text-accent">Politique de confidentialité</a></li>
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("oeko:open-cookie-settings"))}
                className="hover:text-accent"
              >
                Gérer mes cookies
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs">
          <span>© {new Date().getFullYear()} OEKO. Tous droits réservés.</span>
          <span>
            Phénix®, Alskanor® et Castor® sont des marques déposées appartenant à leurs ayants droit respectifs. OEKO est une entreprise indépendante sans lien commercial ni capitalistique avec ces marques.
          </span>
        </div>
      </div>
    </footer>
  );
}
