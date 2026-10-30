"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { mapsLink, site } from "@/config/site";

/**
 * O mapa do Google só é carregado quando o visitante pede.
 * Isso evita cookies de terceiros sem consentimento (LGPD) e deixa a página mais leve.
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&z=16&output=embed`;

  if (load) {
    return (
      <iframe
        title={`Mapa: ${site.name}`}
        src={src}
        className="h-full min-h-[440px] w-full border-0 grayscale-[0.4] sepia-[0.15]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="grain relative flex h-full min-h-[440px] flex-col items-center justify-center gap-6 overflow-hidden bg-brown px-6 py-10 text-center text-white sm:p-10">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.12]" preserveAspectRatio="none" viewBox="0 0 600 440">
        <g stroke="#C9A36A" fill="none">
          <path d="M0 120 L600 80" strokeWidth="10" />
          <path d="M0 320 L600 360" strokeWidth="10" />
          <path d="M180 0 L220 440" strokeWidth="10" />
          <path d="M430 0 L390 440" strokeWidth="10" />
          <path d="M0 220 L600 210" strokeWidth="3" />
          <path d="M90 0 L110 440" strokeWidth="3" />
          <path d="M520 0 L500 440" strokeWidth="3" />
        </g>
      </svg>
      <span className="relative flex size-16 items-center justify-center rounded-full bg-gold text-brown">
        <MapPin className="size-7" aria-hidden="true" />
      </span>
      <div className="relative">
        <p className="font-serif text-3xl">{site.shortName}</p>
        <p className="mt-2 text-sm text-muted">
          {site.address.street}, {site.address.district}, {site.address.city}, {site.address.state}
        </p>
      </div>
      <div className="relative flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => setLoad(true)} className="btn btn-gold px-5">
          Carregar mapa
        </button>
        <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light px-5">
          Abrir rota no Google Maps
        </a>
      </div>
      <p className="relative max-w-xs text-[13px] text-muted/80">Ao carregar, o Google poderá coletar dados de navegação.</p>
    </div>
  );
}
