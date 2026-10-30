"use client";

import type { ReactNode } from "react";
import { useSmartForm } from "./SmartFormProvider";

/** Botão que abre o formulário inteligente (pode ser usado em componentes de servidor). */
export function OpenFormButton({ area, className, children }: { area?: string; className?: string; children: ReactNode }) {
  const { open } = useSmartForm();
  return (
    <button type="button" onClick={() => open(area)} className={className} aria-haspopup="dialog">
      {children}
    </button>
  );
}
