"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Botão flutuante de WhatsApp. Some quando a parte de baixo da tela está sobre
 * uma área marcada com data-wa-hide (formulários, contato, rodapé, FAQ e chamadas
 * que já têm botão próprio), para não cobrir conteúdo que precisa ser tocado.
 */
export function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const zones = new Set<Element>();
    let obs: IntersectionObserver | null = null;
    const setup = () => {
      obs?.disconnect();
      zones.clear();
      // Observa só a faixa de baixo da tela, onde o botão fica.
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? zones.add(e.target) : zones.delete(e.target)));
          setHidden(zones.size > 0);
        },
        { rootMargin: `-${Math.max(0, window.innerHeight - 110)}px 0px 0px 0px` },
      );
      document.querySelectorAll("[data-wa-hide]").forEach((el) => obs!.observe(el));
    };
    setup();
    const mo = new MutationObserver(() => setup());
    mo.observe(document.getElementById("conteudo") ?? document.body, { childList: true });
    window.addEventListener("resize", setup);
    return () => {
      obs?.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar no WhatsApp: ${site.whatsapp.display}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`wa-float group fixed bottom-4 right-4 z-40 flex items-center gap-3 transition-all duration-300 sm:bottom-7 sm:right-7 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <span className="pointer-events-none hidden translate-x-2 bg-brown/90 px-4 py-2 text-sm font-medium tracking-wide text-white opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Fale conosco
      </span>
      <span className="flex size-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] ring-4 ring-white/10 transition-transform duration-300 group-hover:scale-105 sm:size-14">
        <WhatsAppIcon className="size-7" />
      </span>
    </a>
  );
}
