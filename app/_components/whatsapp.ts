// The same number the old page uses. Messages come from the dictionaries.
const WHATSAPP_NUMBER = "201069160401";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
