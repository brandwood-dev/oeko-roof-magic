import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optionalEmail = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : undefined))
  .pipe(z.string().email().optional());

const quoteLeadSchema = z.object({
  project: z.string().min(1),
  roof: z.string().min(1),
  postal: z.string().regex(/^\d{5}$/),
  city: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(/^[0-9+\s().-]{8,}$/),
  email: optionalEmail,
  pageUrl: z.string().optional(),
});

export const submitQuoteLead = createServerFn({ method: "POST" })
  .inputValidator(quoteLeadSchema)
  .handler(async ({ data }) => {
    const { sendQuoteLead } = await import("../lead-email.server");

    await sendQuoteLead({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    return { success: true };
  });
