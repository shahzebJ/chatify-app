import { Resend } from "resend";
import { buildWelcomeEmailTemplate } from "./emailTemplates.js";
import { ENV } from "../lib/env.js";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const sendWelcomeEmail = async ({ to, name }) => {
  if (!resend) {
    console.warn("RESEND_API_KEY is missing. Skipping welcome email.");
    return;
  }

  const { data, error } = await resend.emails.send({
    from: ENV.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to,
    subject: "Welcome to Chatify",
    html: buildWelcomeEmailTemplate(name),
  });

  if (error) {
    console.error("Error", error);
  }

  console.log("Welcome Email sent successfully", data);
};
