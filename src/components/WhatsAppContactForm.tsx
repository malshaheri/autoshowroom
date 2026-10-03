"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type WhatsAppContactFormProps = {
  locale: "de" | "en";
};

export function WhatsAppContactForm({
  locale,
}: WhatsAppContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const labels =
    locale === "de"
      ? {
          name: "Name",
          email: "E-Mail",
          phone: "Telefon",
          message: "Nachricht",
          namePlaceholder: "Dein Name",
          emailPlaceholder: "name@example.com",
          phonePlaceholder: "+49 ...",
          messagePlaceholder: "Wie können wir dir helfen?",
          button: "Jetzt senden",
          note:
            "Demo-Funktion – die Nachricht wird in WhatsApp geöffnet und nicht automatisch versendet.",
        }
      : {
          name: "Name",
          email: "Email",
          phone: "Phone",
          message: "Message",
          namePlaceholder: "Your name",
          emailPlaceholder: "name@example.com",
          phonePlaceholder: "+49 ...",
          messagePlaceholder: "How can we help?",
          button: "Send Now",
          note:
            "Demo feature – the message opens in WhatsApp and is not sent automatically.",
        };

  const handleSubmit = () => {
    const whatsappNumber = "490000000000";

    const text =
      locale === "de"
        ? `Hallo AutoShowroom,

ich interessiere mich für ein Fahrzeug.

Name: ${name || "-"}
Telefon: ${phone || "-"}
E-Mail: ${email || "-"}

Nachricht:
${message || "-"}`
        : `Hello AutoShowroom,

I am interested in a vehicle.

Name: ${name || "-"}
Phone: ${phone || "-"}
Email: ${email || "-"}

Message:
${message || "-"}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contactFormCard">
      <h2>
        {locale === "de"
          ? "Nachricht senden"
          : "Send a message"}
      </h2>

      <form
        className="contactForm"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="formGroup">
          <label htmlFor="name">{labels.name}</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={labels.namePlaceholder}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email">{labels.email}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={labels.emailPlaceholder}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="phone">{labels.phone}</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={labels.phonePlaceholder}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="message">{labels.message}</label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={labels.messagePlaceholder}
          />
        </div>

        <button className="primaryButton contactSubmit" type="submit">
          <FaWhatsapp className="whatsappLogo" aria-hidden="true" />
          {labels.button}
        </button>

        <p className="contactFormNote">
          {labels.note}
        </p>
      </form>
    </div>
  );
}