export const WHATSAPP_NUMBER = "971500000000"; // TODO: replace with real number
export const COMPANY_PHONE = "+971 50 000 0000";
export const COMPANY_EMAIL = "sales@tonercart.llc";
export const COMPANY_ADDRESS = "Dubai, United Arab Emirates";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
