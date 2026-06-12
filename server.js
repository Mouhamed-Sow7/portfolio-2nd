// ─────────────────────────────────────────────────────────────────
//  server.js — Backend email pour portfolio Mouhamed Sow
//  Stack : Node.js + Express + Nodemailer + Gmail App Password
// ─────────────────────────────────────────────────────────────────
//
//  INSTALLATION :
//    npm install express nodemailer cors dotenv
//
//  FICHIER .env à créer à côté de ce fichier :
//    GMAIL_USER=sowhamedou10@gmail.com
//    GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   ← ton App Password Gmail
//    PORT=3001
//
//  LANCER EN LOCAL :
//    node server.js
//
//  DÉPLOYER SUR RENDER :
//    1. Push ce fichier + package.json sur GitHub
//    2. Créer un Web Service sur render.com
//    3. Ajouter les variables d'env dans Render Dashboard
//    4. Dans index.html, remplacer BACKEND_URL par ton URL Render
// ─────────────────────────────────────────────────────────────────

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ───────────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://mouhamedsow.digitalesf.com",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501",
    ],
  }),
);

// ── Transporter Gmail ─────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App Password, pas ton vrai mdp
  },
});

// ── Route POST /send ──────────────────────────────────────────────
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation basique
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // tu reçois sur ton propre Gmail
      replyTo: email, // répondre directement au visiteur
      subject: `📩 Nouveau message de ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px">
          <h2 style="color:#F5C518;margin-bottom:4px">Nouveau message</h2>
          <p style="color:#888;font-size:13px;margin-bottom:20px">Via ton portfolio</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;font-weight:600;width:80px">Nom</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #F5C518;border-radius:4px">
            <p style="color:#333;line-height:1.6;white-space:pre-wrap">${message}</p>
          </div>
          <p style="color:#aaa;font-size:11px;margin-top:16px">Réponds directement à cet email pour joindre ${name}.</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ── Health check ──────────────────────────────────────────────────
app.get("/", (req, res) => res.send("Portfolio mailer OK ✅"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
