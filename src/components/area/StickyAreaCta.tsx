"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSmartForm } from "@/components/SmartForm/SmartFormProvider";

/**
 * Botão "Avaliar meu caso" fixo na parte de baixo das landing pages.
 * Aparece depois que os botões do hero saem da tela e some sobre o
 * formulário do fim da página, onde ele seria repetido.
 */
export function StickyAreaCta({ area }: { area: string }) {
  const { open } = useSmartForm();
  const [pastHero, setPastHero] = useState(false);
  const [overForm, setOverForm] = useState(false);
  const visible = pastHero && !overForm;

  useEffect(() => {
    const heroCta = document.getElementById("area-hero-cta");
    const form = document.getElementById("formulario");
    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    // Observa só a faixa de baixo da tela, onde a barra fica.
    const formObs = new IntersectionObserver(([e]) => setOverForm(e.isIntersecting), {
      rootMargin: `-${Math.max(0, window.innerHeight - 110)}px 0px 0px 0px`,
    });
    if (heroCta) heroObs.observe(heroCta);
    if (form) formObs.observe(form);
    document.documentElement.dataset.stickyCta = "on";
    return () => {
      heroObs.disconnect();
      formObs.disconnect();
      delete document.documentElement.dataset.stickyCta;
      delete document.documentElement.dataset.stickyCtaVisible;
    };
  }, []);

  // Avisa o botão de WhatsApp para subir enquanto a barra está na tela.
  useEffect(() => {
    if (visible) document.documentElement.dataset.stickyCtaVisible = "true";
    else delete document.documentElement.dataset.stickyCtaVisible;
  }, [visible]);

  return (
    <div
      aria-hidden={!visible || undefined}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-5 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-[var(--ease-premium)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => open(area)}
        tabIndex={visible ? undefined : -1}
        aria-haspopup="dialog"
        className={`btn btn-gold w-full max-w-[360px] shadow-[0_18px_40px_-12px_rgb(0_0_0/0.55)] ${visible ? "pointer-events-auto" : ""}`}
      >
        Avaliar meu caso <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
