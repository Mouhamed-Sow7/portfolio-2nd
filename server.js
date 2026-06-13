const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
  cors({
    origin: [
      "https://mouhamedsow.digitalesf.com",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501",
      "http://localhost:5500",
      "http://localhost:5501",
    ],
  }),
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Portfolio mailer OK ✅" });
});

// Endpoint contact form
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Champs manquants." });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sowhamedou10@gmail.com",
      replyTo: email,
      subject: `📩 Portfolio — Message de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #b8860b; margin-bottom: 4px;">Nouveau message depuis ton portfolio</h2>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message :</strong></p>
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          <p style="color: #6b7280; font-size: 12px;">Envoyé depuis mouhamedsow.digitalesf.com</p>
        </div>
      `,
    });

    res.json({ success: true, message: "Email envoyé avec succès !" });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
