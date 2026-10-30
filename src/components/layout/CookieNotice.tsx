"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "tsa-cookie-notice";

/** Aviso de cookies. O site usa apenas armazenamento essencial; o mapa do Google só carrega com permissão. */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  function accept() {
    try {
      localStorage.setItem(KEY, new Date().toISOString());
    } catch {}
    setShow(false);
  }

  return (
    <div role="region" aria-label="Aviso de cookies" className="fixed bottom-3 left-3 right-20 z-[60] flex max-w-lg items-center gap-4 border border-gold/25 bg-brown/95 px-4 py-3 text-xs leading-relaxed text-muted shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:px-5 sm:py-4 sm:text-[13px]">
      <p>
        Usamos apenas recursos essenciais. O mapa do Google só carrega com a sua permissão.{" "}
        <Link href="/politica-de-privacidade#cookies" className="text-gold underline underline-offset-2">
          Saiba mais
        </Link>
      </p>
      <button type="button" onClick={accept} className="btn btn-gold min-h-10 flex-none px-4 py-2 text-[11px]">
        Entendi
      </button>
    </div>
  );
}
