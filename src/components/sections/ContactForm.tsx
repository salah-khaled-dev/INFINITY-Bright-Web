"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  dict: Dictionary["contactSection"]["form"];
  servicesCatalog?: Dictionary["servicesCatalog"];
}

const BODY_TYPES = [
  { id: "jeep", labelAr: "جيب / SUV", labelEn: "Jeep / SUV" },
  { id: "saloon", labelAr: "صالون", labelEn: "Saloon" },
  { id: "sedan", labelAr: "سيدان", labelEn: "Sedan" },
];

const CORE_SERVICES = [
  { id: "ppf", labelAr: "حماية (أفلام حماية الطلاء PPF)", labelEn: "Protection (PPF)" },
  { id: "tinting", labelAr: "تظليل (عزل حراري وتظليل النوافذ)", labelEn: "Window Tinting" },
  { id: "color-change", labelAr: "تغيير لون (تجليد وتغيير اللون)", labelEn: "Color Change / Wrap" },
  { id: "ceramic", labelAr: "نانو سيراميك (حماية السيراميك)", labelEn: "Nano Ceramic" },
  { id: "polishing", labelAr: "تلميع (تصحيح وتلميع ساطع)", labelEn: "Polishing & Detailing" },
];

export function ContactForm({ dict }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState<string>("jeep");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, dict.errors.nameMin),
        phone: z.string().trim().min(8, dict.errors.phoneMin),
        vehicle: z.string().trim().min(2, dict.errors.vehicleMin),
        service: z.string().min(1, dict.errors.serviceRequired),
        notes: z.string().trim().optional(),
      }),
    [dict.errors]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      vehicle: "",
      service: "ppf",
      notes: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const bodyTypeObj = BODY_TYPES.find((b) => b.id === selectedBodyType);
    const bodyTypeLabel = bodyTypeObj ? bodyTypeObj.labelAr : selectedBodyType;
    const serviceObj = CORE_SERVICES.find((s) => s.id === values.service);
    const serviceLabel = serviceObj ? serviceObj.labelAr : values.service;

    const lines = [
      dict.whatsappTemplate.greeting,
      `• ${dict.whatsappTemplate.name}: ${values.name}`,
      `• ${dict.whatsappTemplate.phone}: ${values.phone}`,
      `• فئة هيكل السيارة: ${bodyTypeLabel}`,
      `• ${dict.whatsappTemplate.vehicle}: ${values.vehicle}`,
      `• ${dict.whatsappTemplate.service}: ${serviceLabel}`,
    ];

    if (values.notes) {
      lines.push(`• ${dict.whatsappTemplate.notes}: ${values.notes}`);
    }

    const url = buildWhatsAppUrl(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center space-y-5 rounded-2xl border border-[#25D366]/50 bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-elevated)] sm:p-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          {dict.successTitle}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {dict.successBody}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{dict.resetButton}</span>
        </button>
      </div>
    );
  }

  const inputBaseClass =
    "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3.5 text-base sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[#FBE90A] focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-elevated)] sm:p-9"
    >
      <div className="space-y-1.5">
        <h3 className="font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
          {dict.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          {dict.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="ib-name"
            className="block text-xs font-semibold text-[var(--text-primary)]"
          >
            {dict.nameLabel}
          </label>
          <input
            id="ib-name"
            type="text"
            placeholder={dict.namePlaceholder}
            {...register("name")}
            className={inputBaseClass}
          />
          {errors.name && (
            <p role="alert" className="text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div className="space-y-1.5">
          <label
            htmlFor="ib-phone"
            className="block text-xs font-semibold text-[var(--text-primary)]"
          >
            {dict.phoneLabel}
          </label>
          <input
            id="ib-phone"
            type="tel"
            dir="ltr"
            placeholder={dict.phonePlaceholder}
            {...register("phone")}
            className={`${inputBaseClass} rtl:text-end`}
          />
          {errors.phone && (
            <p role="alert" className="text-xs font-medium text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Vehicle Body Type Selector (جيب / صالون / سيدان) */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[var(--text-primary)]">
          فئة هيكل السيارة
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {BODY_TYPES.map((type) => {
            const active = selectedBodyType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedBodyType(type.id)}
                className={cn(
                  "rounded-xl border py-3 text-xs font-bold transition-all sm:text-sm",
                  active
                    ? "border-[#FBE90A] bg-[#FBE90A] text-[#060608] shadow-[0_4px_14px_rgba(251,233,10,0.25)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[#FBE90A]/50 hover:text-[var(--text-primary)]"
                )}
              >
                {type.labelAr}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Vehicle Make / Model Text Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="ib-vehicle"
            className="block text-xs font-semibold text-[var(--text-primary)]"
          >
            {dict.vehicleLabel}
          </label>
          <input
            id="ib-vehicle"
            type="text"
            placeholder="اكتب نوع وموديل سيارتك (مثال: تورس 2024 / باترول / S500)"
            {...register("vehicle")}
            className={inputBaseClass}
          />
          {errors.vehicle && (
            <p role="alert" className="text-xs font-medium text-red-500">
              {errors.vehicle.message}
            </p>
          )}
        </div>

        {/* Core Services Selector (5 Services Only) */}
        <div className="space-y-1.5">
          <label
            htmlFor="ib-service"
            className="block text-xs font-semibold text-[var(--text-primary)]"
          >
            {dict.serviceLabel}
          </label>
          <select
            id="ib-service"
            {...register("service")}
            className={inputBaseClass}
          >
            {CORE_SERVICES.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {svc.labelAr}
              </option>
            ))}
          </select>
          {errors.service && (
            <p role="alert" className="text-xs font-medium text-red-500">
              {errors.service.message}
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label
          htmlFor="ib-notes"
          className="block text-xs font-semibold text-[var(--text-primary)]"
        >
          {dict.notesLabel}
        </label>
        <textarea
          id="ib-notes"
          rows={3}
          placeholder="أي استفسار أو الفرع المفضل (المروج / لبن / النرجس / خريص / الشفاء)..."
          {...register("notes")}
          className={inputBaseClass}
        />
      </div>

      {/* WhatsApp Green Submit Action */}
      <button
        type="submit"
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 text-xs font-bold tracking-[0.15em] text-white uppercase shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all duration-300 hover:bg-[#20ba5a] hover:shadow-[0_14px_38px_rgba(37,211,102,0.45)] hover:scale-[1.01] rtl:text-sm rtl:tracking-normal"
      >
        <WhatsAppIcon className="h-5 w-5 text-white" />
        <span>{dict.submitWhatsapp}</span>
      </button>
    </form>
  );
}
