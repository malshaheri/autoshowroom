"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { vehicles } from "@/data/vehicles";

type FinancingFormProps = {
  locale: "de" | "en";
  vehicleSlug: string;
};

export function FinancingForm({
  locale,
  vehicleSlug,
}: FinancingFormProps) {
  const selectedVehicle = useMemo(
    () =>
      vehicles.find(
        (vehicle) => vehicle.slug === vehicleSlug,
      ),
    [vehicleSlug],
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [term, setTerm] = useState("36");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const labels =
    locale === "de"
      ? {
          title: "Finanzierung anfragen",
          vehicle: "Fahrzeug",
          firstName: "Vorname",
          lastName: "Nachname",
          phone: "Telefon",
          email: "E-Mail",
          downPayment: "Anzahlung",
          term: "Laufzeit",
          budget: "Monatliches Budget",
          message: "Nachricht",
          send: "Finanzierung anfragen",
          months: "Monate",
          note:
            "Die Anfrage wird in WhatsApp geöffnet und nicht automatisch versendet.",
        }
      : {
          title: "Request Financing",
          vehicle: "Vehicle",
          firstName: "First Name",
          lastName: "Last Name",
          phone: "Phone",
          email: "Email",
          downPayment: "Down Payment",
          term: "Term",
          budget: "Monthly Budget",
          message: "Message",
          send: "Request Financing",
          months: "Months",
          note:
            "The request opens in WhatsApp and is not sent automatically.",
        };

  const handleSubmit = () => {
    const whatsappNumber = "490000000000";

    const vehicleName =
      selectedVehicle?.name ||
      (locale === "de"
        ? "Nicht angegeben"
        : "Not specified");

    const text =
      locale === "de"
        ? `Hallo AutoShowroom,

ich interessiere mich für eine Finanzierung.

Fahrzeug: ${vehicleName}
Vorname: ${firstName}
Nachname: ${lastName}
Telefon: ${phone}
E-Mail: ${email || "-"}
Anzahlung: ${downPayment || "-"}
Laufzeit: ${term} Monate
Monatliches Budget: ${budget || "-"}

Nachricht:
${message || "-"}`
        : `Hello AutoShowroom,

I am interested in financing.

Vehicle: ${vehicleName}
First Name: ${firstName}
Last Name: ${lastName}
Phone: ${phone}
Email: ${email || "-"}
Down Payment: ${downPayment || "-"}
Term: ${term} months
Monthly Budget: ${budget || "-"}

Message:
${message || "-"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="financingFormCard">
      <h2>{labels.title}</h2>

      <form
        className="financingForm"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="formGroup">
          <label>{labels.vehicle}</label>
          <input
            type="text"
            value={
              selectedVehicle?.name ||
              vehicleSlug ||
              ""
            }
            readOnly
          />
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>
              {labels.firstName} <span className="requiredMark">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(event) =>
                setFirstName(event.target.value)
              }
              required
            />
          </div>

          <div className="formGroup">
            <label>
              {labels.lastName} <span className="requiredMark">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(event) =>
                setLastName(event.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>
              {labels.phone} <span className="requiredMark">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              required
            />
          </div>

          <div className="formGroup">
            <label>{labels.email}</label>
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>{labels.downPayment}</label>
            <input
              type="number"
              min="0"
              placeholder="€"
              value={downPayment}
              onChange={(event) =>
                setDownPayment(event.target.value)
              }
            />
          </div>

          <div className="formGroup">
            <label>{labels.term}</label>
            <select
              value={term}
              onChange={(event) =>
                setTerm(event.target.value)
              }
            >
              <option value="12">12 {labels.months}</option>
              <option value="24">24 {labels.months}</option>
              <option value="36">36 {labels.months}</option>
              <option value="48">48 {labels.months}</option>
              <option value="60">60 {labels.months}</option>
            </select>
          </div>
        </div>

        <div className="formGroup">
          <label>{labels.budget}</label>
          <input
            type="number"
            min="0"
            placeholder="€"
            value={budget}
            onChange={(event) =>
              setBudget(event.target.value)
            }
          />
        </div>

        <div className="formGroup">
          <label>{labels.message}</label>
          <textarea
            rows={5}
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
          />
        </div>

        <button
          className="financingSubmit"
          type="submit"
        >
          <FaWhatsapp aria-hidden="true" />
          {labels.send}
        </button>

        <p className="contactFormNote">
          {labels.note}
        </p>
      </form>
    </div>
  );
}