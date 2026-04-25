"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Globe, Loader2, ChevronRight } from "lucide-react";

const EMAILJS_SERVICE_ID  = "service_60356x5";
const EMAILJS_TEMPLATE_ID = "template_1yw7vub";
const EMAILJS_PUBLIC_KEY  = "uvXmnh-oC4rf66_pc";

const INFOS = [
  {
    icon: Phone,
    title: "Téléphones",
    lines: ["+221 78 730 25 25", "+221 78 732 24 24", "+221 78 426 24 24"],
  },
  {
    icon: Mail,
    title: "Emails",
    lines: ["scolarite.imfp@gmail.com", "imfp.infos@gmail.com", "contact@imfp.com"],
  },
  {
    icon: Globe,
    title: "Site web",
    lines: ["www.imfp.com"],
  },
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Lun – Ven : 8h – 18h", "Sam : 9h – 13h"],
  },
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["Sacré-Cœur 2, en face arrêt BRT", "Villa N° 8602/B, Dakar, Sénégal"],
  },
];

const inputBase =
  "w-full rounded-xl px-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 min-h-[48px] transition-all duration-200 outline-none bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#00B4A6] focus:shadow-[0_0_0_3px_rgba(0,180,166,0.12)]";

const iconInputBase =
  "w-full rounded-xl pl-11 pr-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 min-h-[48px] transition-all duration-200 outline-none bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#00B4A6] focus:shadow-[0_0_0_3px_rgba(0,180,166,0.12)]";

export default function Contact() {
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({
    nom: "", telephone: "", email: "", message: "", formation: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.nom,
          telephone:  form.telephone,
          from_email: form.email,
          formation:  form.formation,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error("[EmailJS error]", err);
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#0A1F44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#00B4A6]/20 text-[#00B4A6] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Prenez <span className="text-[#00B4A6]">rendez-vous</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Notre équipe vous accueille pour répondre à toutes vos questions sur nos formations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-24">

          {/* ── Form column (premier dans le DOM = premier sur mobile) ── */}
          <div className="lg:flex-1">
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "white",
                boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "rgba(0,180,166,0.12)", boxShadow: "0 8px 32px rgba(0,180,166,0.2)" }}
                  >
                    <CheckCircle className="w-10 h-10 text-[#00B4A6]" />
                  </div>
                  <h3 className="text-[#0A1F44] font-bold text-2xl mb-2">Message envoyé !</h3>
                  <p className="text-gray-500">Nous vous contacterons dans les plus brefs délais.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ nom: "", telephone: "", email: "", message: "", formation: "" }); }}
                    className="mt-6 text-white px-6 py-3 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #0A1F44, #1a3a6e)" }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Nom */}
                      <div>
                        <label htmlFor="nom" className="block text-[#0A1F44] text-sm font-semibold mb-2">
                          Nom complet *
                        </label>
                        <input
                          id="nom" name="nom" type="text" required
                          value={form.nom} onChange={handleChange}
                          placeholder="Prénom Nom"
                          className={inputBase}
                        />
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label htmlFor="telephone" className="block text-[#0A1F44] text-sm font-semibold mb-2">
                          Téléphone *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Phone className="w-4 h-4 text-gray-400" />
                          </div>
                          <input
                            id="telephone" name="telephone" type="tel" required
                            value={form.telephone} onChange={handleChange}
                            placeholder="+221 XX XXX XX XX"
                            className={iconInputBase}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[#0A1F44] text-sm font-semibold mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          id="email" name="email" type="email"
                          value={form.email} onChange={handleChange}
                          placeholder="vous@exemple.com"
                          className={iconInputBase}
                        />
                      </div>
                    </div>

                    {/* Formation */}
                    <div>
                      <label htmlFor="formation" className="block text-[#0A1F44] text-sm font-semibold mb-2">
                        Formation souhaitée
                      </label>
                      <select
                        id="formation" name="formation"
                        value={form.formation} onChange={handleChange}
                        className={`${inputBase} cursor-pointer`}
                      >
                        <option value="">Sélectionnez une formation</option>
                        <option value="bts">BTS (Bac +2)</option>
                        <option value="licence">Licence Professionnelle (Bac +3)</option>
                        <option value="master">Master Professionnel (Bac +5)</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-[#0A1F44] text-sm font-semibold mb-2">
                        Message
                      </label>
                      <textarea
                        id="message" name="message" rows={4}
                        value={form.message} onChange={handleChange}
                        placeholder="Décrivez votre projet de formation..."
                        className={`${inputBase} resize-none`}
                        style={{ minHeight: "unset" }}
                      />
                    </div>

                    {error && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 text-base min-h-[56px] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                      style={{
                        background: sending
                          ? "linear-gradient(135deg, #0A1F44, #1a3a6e)"
                          : "linear-gradient(135deg, #0A1F44 0%, #1a3a6e 50%, #0A1F44 100%)",
                        boxShadow: "0 8px 32px rgba(10,31,68,0.25)",
                      }}
                      onMouseEnter={e => {
                        if (!sending) {
                          (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #00B4A6, #009183)";
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(0,180,166,0.4)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!sending) {
                          (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #0A1F44 0%, #1a3a6e 50%, #0A1F44 100%)";
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(10,31,68,0.25)";
                        }
                      }}
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Prendre rendez-vous
                          <ChevronRight className="w-4 h-4 opacity-70" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* ── Info column (second dans le DOM = second sur mobile, gauche sur desktop) ── */}
          <div className="lg:w-80 lg:shrink-0 space-y-5">
            {INFOS.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4 group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(0,180,166,0.18)",
                    boxShadow: "0 4px 12px rgba(0,180,166,0.15)",
                  }}
                >
                  <Icon className="w-5 h-5 text-[#00B4A6]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  {lines.map((l) => (
                    <p key={l} className="text-white/55 text-sm">{l}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Google Maps */}
            <div
              className="mt-4 rounded-2xl overflow-hidden w-full relative"
              style={{
                height: "208px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <iframe
                src="https://maps.google.com/maps?q=14.7162747,-17.4660665&output=embed&hl=fr&z=17&markers=14.7162747,-17.4660665"
                style={{ border: 0, width: "100%", height: "100%", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation IMFP – Sacré-Cœur 2, Dakar"
              />
              <a
                href="https://maps.app.goo.gl/HxuqXmAViL7ELmfz5"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 flex items-center gap-2 text-[#0A1F44] text-xs font-bold px-3 py-2 rounded-xl shadow-lg cursor-pointer z-10 transition-all duration-200"
                style={{ background: "white" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#00B4A6";
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "white";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#0A1F44";
                }}
              >
                <MapPin className="w-3.5 h-3.5" />
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
