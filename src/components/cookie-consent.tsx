import { Cookie, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";

const CONSENT_KEY = "oeko-cookie-consent-v1";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

function applyConsent(preferences: CookiePreferences) {
  const browserWindow = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  browserWindow.dataLayer ||= [];
  browserWindow.gtag ||= (...args: unknown[]) => browserWindow.dataLayer?.push(args);
  browserWindow.gtag("consent", "update", {
    functionality_storage: "granted",
    security_storage: "granted",
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
  });
  window.dispatchEvent(new CustomEvent("oeko:cookie-consent", { detail: preferences }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (!storedConsent) {
      setVisible(true);
    } else {
      try {
        const preferences = JSON.parse(storedConsent) as CookiePreferences;
        setAnalytics(preferences.analytics);
        setMarketing(preferences.marketing);
        applyConsent(preferences);
      } catch {
        localStorage.removeItem(CONSENT_KEY);
        setVisible(true);
      }
    }

    const openSettings = () => {
      setVisible(true);
      setCustomizing(true);
    };
    window.addEventListener("oeko:open-cookie-settings", openSettings);
    return () => window.removeEventListener("oeko:open-cookie-settings", openSettings);
  }, []);

  const save = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    applyConsent(preferences);
    setVisible(false);
    setCustomizing(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-white text-foreground shadow-[0_-12px_35px_rgba(26,19,62,0.15)]">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-3xl items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Cookie className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-primary">Gestion des cookies</h2>
                <button
                  type="button"
                  onClick={() => save(false, false)}
                  aria-label="Continuer avec les cookies nécessaires"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  <X className="size-4" />
                </button>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Nous utilisons des cookies pour améliorer votre expérience, personnaliser le contenu et mesurer notre trafic.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => save(true, true)}
              className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:brightness-95"
            >
              Accepter tous les cookies
            </button>
            <button
              type="button"
              onClick={() => save(false, false)}
              className="rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              Refuser tout
            </button>
            <button
              type="button"
              onClick={() => setCustomizing((current) => !current)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Settings2 className="size-4" /> Personnaliser
            </button>
          </div>
        </div>

        {customizing && (
          <div className="mt-5 grid gap-3 border-t border-border pt-5 md:grid-cols-3">
            <CookieOption title="Nécessaires" description="Indispensables au fonctionnement du site." checked disabled onChange={() => undefined} />
            <CookieOption title="Mesure d’audience" description="Aide à comprendre l’utilisation du site." checked={analytics} onChange={setAnalytics} />
            <CookieOption title="Publicité" description="Permet la mesure et la personnalisation des campagnes." checked={marketing} onChange={setMarketing} />
            <div className="md:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={() => save(analytics, marketing)}
                className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-deep"
              >
                Enregistrer mes choix
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CookieOption({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <span>
        <span className="block text-sm font-bold">{title}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 accent-primary"
      />
    </label>
  );
}
