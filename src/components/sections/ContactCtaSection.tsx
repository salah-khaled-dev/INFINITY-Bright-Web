import React from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface ContactCtaSectionProps {
  locale: Locale;
  dict: Dictionary["contactSection"];
  servicesCatalog: Dictionary["servicesCatalog"];
}

export function ContactCtaSection({
  locale,
  dict,
  servicesCatalog,
}: ContactCtaSectionProps) {
  const configuredEmail = BUSINESS_CONFIG.contact.email;
  const configuredAddress = BUSINESS_CONFIG.contact.address[locale];
  const configuredMapUrl = BUSINESS_CONFIG.contact.mapUrl;
  const configuredHours = BUSINESS_CONFIG.contact.workingHours[locale];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--bg-elevated)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left / Start Direct Concierge Channels */}
          <div className="space-y-8 lg:col-span-5">
            <Reveal className="space-y-4">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                {dict.eyebrow}
              </p>
              <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.26]">
                {dict.headline}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {dict.description}
              </p>
            </Reveal>

            {/* Primary Clickable Phone & WhatsApp Cards */}
            <Reveal delay={0.1} className="space-y-4">
              <a
                href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-400/40 bg-[#25D366] p-5 text-zinc-950 shadow-[0_12px_34px_rgba(37,211,102,0.28)] transition-all duration-300 hover:bg-[#20ba5a]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/10">
                    <WhatsAppIcon className="h-6 w-6 text-zinc-950" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-90 rtl:tracking-normal">
                      {dict.whatsappLabel}
                    </p>
                    <p className="text-lg font-bold">{dict.whatsappAction}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
              </a>

              <a
                href={BUSINESS_CONFIG.contact.phoneHref}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-[var(--text-primary)] transition-all duration-300 hover:border-[#FBE90A]"
              >
                <div className="flex items-center gap-4">
                  <LuxuryIconBadge icon={Phone} size="md" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--text-muted)] uppercase rtl:tracking-normal">
                      {dict.directCallLabel}
                    </p>
                    <p dir="ltr" className="text-lg font-bold tracking-wide">
                      {BUSINESS_CONFIG.contact.phoneDisplay}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 opacity-60 transition-transform duration-300 group-hover:opacity-100 rtl:-scale-x-100" />
              </a>
            </Reveal>

            {/* Studio Location & Configurable Info Card */}
            <Reveal delay={0.18}>
              <div className="space-y-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold tracking-[0.15em] text-[var(--text-primary)] uppercase rtl:tracking-normal">
                    {dict.studioInfoTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--brand-accent-label)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
                    {dict.configurableHint}
                  </span>
                </div>

                <div className="space-y-2.5 border-t border-[var(--border-subtle)] pt-3.5 text-[var(--text-secondary)]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        {dict.addressLabel}:
                      </strong>{" "}
                      {configuredMapUrl ? (
                        <a
                          href={configuredMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[var(--text-primary)] underline decoration-[#FBE90A] underline-offset-4 hover:text-[var(--brand-accent-label)]"
                        >
                          <span>{configuredAddress}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                        </a>
                      ) : (
                        configuredAddress
                      )}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        {dict.emailLabel}:
                      </strong>{" "}
                      {configuredEmail ?? (
                        <em className="text-[var(--text-muted)]">
                          {BUSINESS_CONFIG.placeholders.email[locale]}
                        </em>
                      )}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        {dict.hoursLabel}:
                      </strong>{" "}
                      {configuredHours ?? (
                        <em className="text-[var(--text-muted)]">
                          {BUSINESS_CONFIG.placeholders.workingHours[locale]}
                        </em>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right / End Structured Inquiry Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.14}>
              <ContactForm
                locale={locale}
                dict={dict.form}
                servicesCatalog={servicesCatalog}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
