"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { vehicles } from "@/data/vehicles";

type TestDriveFormProps = {
  locale: "de" | "en";
  vehicleSlug: string;
};

export function TestDriveForm({
  locale,
  vehicleSlug,
}: TestDriveFormProps) {
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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const now = new Date();

  const minDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const labels =
    locale === "de"
      ? {
          title: "Probefahrt buchen",
          vehicle: "Fahrzeug",
          firstName: "Vorname",
          lastName: "Nachname",
          phone: "Telefon",
          email: "E-Mail",
          date: "Datum",
          time: "Uhrzeit",
          message: "Nachricht",
          send: "Probefahrt buchen",
          note:
            "Die Anfrage wird in WhatsApp geöffnet und nicht automatisch versendet.",
        }
      : {
          title: "Request a Test Drive",
          vehicle: "Vehicle",
          firstName: "First Name",
          lastName: "Last Name",
          phone: "Phone",
          email: "Email",
          date: "Date",
          time: "Time",
          message: "Message",
          send: "Book a Test Drive",
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

ich möchte eine Probefahrt buchen.

Fahrzeug: ${vehicleName}
Vorname: ${firstName}
Nachname: ${lastName}
Telefon: ${phone}
E-Mail: ${email || "-"}
Datum: ${date}
Uhrzeit: ${time}

Nachricht:
${message || "-"}`
        : `Hello AutoShowroom,

I would like to request a test drive.

Vehicle: ${vehicleName}
First Name: ${firstName}
Last Name: ${lastName}
Phone: ${phone}
Email: ${email || "-"}
Date: ${date}
Time: ${time}

Message:
${message || "-"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="testDriveFormCard">
      <h2>{labels.title}</h2>

      <form
        className="testDriveForm"
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
            <label>
              {labels.date} <span className="requiredMark">*</span>
            </label>
            <input
              type="date"
              min={minDate}
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              required
            />
          </div>

          <div className="formGroup">
            <label>
              {labels.time} <span className="requiredMark">*</span>
            </label>
            <input
              type="time"
              value={time}
              onChange={(event) =>
                setTime(event.target.value)
              }
              required
            />
          </div>
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
          className="testDriveSubmit"
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