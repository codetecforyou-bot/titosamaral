import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/icons";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar no WhatsApp: ${site.whatsapp.display}`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 bg-brown/90 px-4 py-2 text-xs font-medium tracking-wide text-white opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Fale conosco
      </span>
      <span className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] ring-4 ring-white/10 transition-transform duration-300 group-hover:scale-105">
        <WhatsAppIcon className="size-7" />
      </span>
    </a>
  );
}
