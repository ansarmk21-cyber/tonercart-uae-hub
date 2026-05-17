import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl("Hi Tonercart, I need help finding a toner cartridge.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-30 inline-flex items-center gap-2 rounded-full bg-whatsapp text-white shadow-card-hover h-14 px-4 hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden lg:inline font-semibold">Chat on WhatsApp</span>
    </a>
  );
}
