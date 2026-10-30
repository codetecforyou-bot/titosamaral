"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappLink } from "@/config/site";
import { useSmartForm } from "@/components/SmartForm/SmartFormProvider";
import { WhatsAppIcon } from "@/components/ui/icons";
import logo from "@/assets/images/logo-tsa.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useSmartForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  // Libera a rolagem antes da navegação, para o link âncora conseguir rolar até a seção.
  function closeMenu() {
    document.body.style.overflow = "";
    setMenuOpen(false);
  }

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-premium)] ${
        solid ? "border-b border-gold/15 bg-brown/85 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-[76px]" : "h-[92px]"}`}>
        <Link href="/" aria-label={`${site.name}, página inicial`} className="relative z-10 flex min-h-12 flex-none items-center">
          <Image src={logo} alt="" priority width={244} height={48} sizes="244px" className={`w-auto transition-[height] duration-500 ${scrolled ? "h-10" : "h-11 sm:h-12"}`} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[13px] font-medium tracking-[0.06em] text-white/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => open()} aria-haspopup="dialog" className="btn btn-gold hidden min-h-11 px-5 py-2.5 text-[12px] sm:inline-flex">
            Agendar atendimento
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="relative z-10 flex size-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-gold lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-400 ease-[var(--ease-premium)] ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-all duration-300 ${menuOpen ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px bg-current transition-all duration-400 ease-[var(--ease-premium)] ${menuOpen ? "top-1.5 w-5 -rotate-45" : "top-3 w-3.5"}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Menu do celular (fora do header: o desfoque do header limitaria o "fixed") */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-[45] flex flex-col bg-brown/97 pt-[92px] backdrop-blur-xl transition-all duration-500 ease-[var(--ease-premium)] lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Menu" className="container-site flex flex-1 flex-col overflow-y-auto pb-10">
          <ul className="mt-6 border-t border-gold/15">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-gold/15 transition-all duration-500 ease-[var(--ease-premium)] ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex min-h-16 items-center justify-between font-serif text-[30px] text-white transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={`mt-10 flex flex-col gap-3 transition-all delay-300 duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}>
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                closeMenu();
                open();
              }}
              className="btn btn-gold w-full"
            >
              Encontre a solução jurídica ideal
            </button>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1} className="btn btn-outline-light w-full">
              <WhatsAppIcon className="size-4" /> {site.whatsapp.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
