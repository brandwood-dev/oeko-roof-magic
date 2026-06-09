import process from "node:process";

type QuoteLead = {
  project: string;
  roof: string;
  postal: string;
  city: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  pageUrl?: string;
  submittedAt: string;
};

const REQUIRED_RECIPIENTS = [
  "brandwoodadvertising@gmail.com",
  "contact@oeko.fr",
  "laurent.ferrand@oeko.fr",
  "foued.agrebi@oeko.fr",
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const parseRecipients = () => {
  const envRecipients = (process.env.EMAIL_TO ?? "")
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean);

  return Array.from(new Set([...envRecipients, ...REQUIRED_RECIPIENTS])).map((email) => ({
    email,
  }));
};

const buildEmailText = (lead: QuoteLead) =>
  [
    "LP OEKO TOITURE 2026 - Nouveau lead",
    "",
    `Nom: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email || "Non renseigne"}`,
    `Telephone: ${lead.phone}`,
    `Code postal: ${lead.postal}`,
    `Ville: ${lead.city}`,
    `Projet: ${lead.project}`,
    `Type de toiture: ${lead.roof}`,
    `Page: ${lead.pageUrl || "Non renseignee"}`,
    `Date: ${lead.submittedAt}`,
  ].join("\n");

const buildEmailHtml = (lead: QuoteLead) => {
  const fields = [
    ["Nom", `${lead.firstName} ${lead.lastName}`],
    ["Email", lead.email || "Non renseigne"],
    ["Telephone", lead.phone],
    ["Code postal", lead.postal],
    ["Ville", lead.city],
    ["Projet", lead.project],
    ["Type de toiture", lead.roof],
    ["Page", lead.pageUrl || "Non renseignee"],
    ["Date", lead.submittedAt],
  ];

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; color: #222; line-height: 1.5; }
          .container { max-width: 640px; margin: 0 auto; padding: 24px; }
          .header { background: #352c5b; color: #fff; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { border: 1px solid #e5e5e5; border-top: 0; padding: 24px; }
          .field { margin-bottom: 16px; }
          .label { color: #352c5b; font-weight: 700; font-size: 13px; text-transform: uppercase; }
          .value { margin-top: 4px; padding: 10px 12px; background: #f7f7f7; border-radius: 6px; }
          .footer { color: #777; font-size: 12px; margin-top: 18px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;font-size:22px;">LP OEKO TOITURE 2026</h1>
            <p style="margin:8px 0 0;">Nouveau lead recu depuis le formulaire</p>
          </div>
          <div class="content">
            ${fields
              .map(
                ([label, value]) => `
                  <div class="field">
                    <div class="label">${escapeHtml(label)}</div>
                    <div class="value">${escapeHtml(value)}</div>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="footer">Email envoye automatiquement depuis la landing page OEKO.</div>
        </div>
      </body>
    </html>
  `;
};

async function addContactToBrevoList(lead: QuoteLead) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !listId || !lead.email) return;

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: lead.email,
      attributes: {
        FIRSTNAME: lead.firstName,
        LASTNAME: lead.lastName,
        SMS: lead.phone,
        SOURCE: "LP OEKO TOITURE 2026",
      },
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Brevo contact failed with ${response.status}: ${body}`);
  }
}

export async function sendQuoteLead(lead: QuoteLead) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "OEKO LP Toiture",
        email: "reseaux@oeko.fr",
      },
      to: parseRecipients(),
      replyTo: lead.email
        ? {
            email: lead.email,
            name: `${lead.firstName} ${lead.lastName}`.trim(),
          }
        : undefined,
      subject: "LP OEKO TOITURE 2026 - Nouveau lead",
      textContent: buildEmailText(lead),
      htmlContent: buildEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Brevo email failed with ${response.status}: ${body}`);
  }

  try {
    await addContactToBrevoList(lead);
  } catch (error) {
    console.warn("Brevo contact sync failed:", error);
  }
}
