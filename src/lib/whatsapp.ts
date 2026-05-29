export const WHATSAPP_NUMBER = "971563633939";
export const COMPANY_PHONE = "+971 56 363 3939";
export const COMPANY_EMAIL = "sales@tonercart.llc";
export const COMPANY_ADDRESS = "Dubai, United Arab Emirates";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
