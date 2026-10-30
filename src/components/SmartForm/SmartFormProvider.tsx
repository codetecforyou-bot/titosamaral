"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SmartForm } from "./SmartForm";

type Ctx = { open: (area?: string) => void };
const SmartFormContext = createContext<Ctx | null>(null);

export function useSmartForm() {
  const ctx = useContext(SmartFormContext);
  if (!ctx) throw new Error("useSmartForm precisa estar dentro de SmartFormProvider");
  return ctx;
}

/**
 * Mantém o formulário montado entre aberturas: se o visitante fechar sem
 * querer, as respostas continuam lá. Após um envio, a próxima abertura
 * começa do zero.
 */
export function SmartFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<{ key: number; area?: string } | null>(null);
  const finished = useRef(false);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const open = useCallback((area?: string) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSession((prev) => {
      if (!prev || finished.current || (area && area !== prev.area)) {
        finished.current = false;
        return { key: (prev?.key ?? 0) + 1, area };
      }
      return prev;
    });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    opener.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => document.getElementById("smart-form-title")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        const list = Array.from(focusables).filter((el) => el.offsetParent !== null);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <SmartFormContext.Provider value={{ open }}>
      {children}
      {session && (
        <div
          className={`fixed inset-0 z-[100] items-end justify-center sm:items-center sm:p-6 ${isOpen ? "flex" : "hidden"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="smart-form-title"
        >
          <div className="backdrop-in absolute inset-0 bg-[#0d0605]/70 backdrop-blur-md" onClick={close} aria-hidden="true" />
          <div
            ref={panel}
            className="modal-in relative flex h-[100dvh] w-full flex-col overflow-hidden bg-mist shadow-[0_40px_120px_-20px_rgb(0_0_0/0.6)] sm:h-auto sm:max-h-[min(860px,92dvh)] sm:max-w-[760px] sm:border sm:border-gold/30"
          >
            <div aria-hidden="true" className="h-1 w-full flex-none bg-gradient-to-r from-brown via-gold to-brown" />
            <button
              type="button"
              onClick={close}
              aria-label="Fechar formulário"
              className="absolute right-4 top-5 z-10 flex size-11 items-center justify-center rounded-full text-brown transition-colors hover:bg-sand sm:right-6 sm:top-6"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <SmartForm
              key={session.key}
              initialArea={session.area}
              variant="modal"
              titleId="smart-form-title"
              onClose={close}
              onDone={() => (finished.current = true)}
            />
          </div>
        </div>
      )}
    </SmartFormContext.Provider>
  );
}
