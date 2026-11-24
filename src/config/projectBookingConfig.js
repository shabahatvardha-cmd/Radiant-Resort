import { hotelInfo } from '../data/hotelInfo.js';

/**
 * Authoritative Project Booking & WhatsApp Configuration
 * Centralized place for all project preview deposit and communication settings.
 */
export const projectBookingConfig = {
  // Central authoritative WhatsApp contact: 10-digit number with India country code 91
  // Stored strictly as digits-only without '+', spaces, brackets, or punctuation
  whatsAppNumber: '919670111167',

  // Project branding name
  projectName: hotelInfo?.name || 'The Radiant Hotel & Resort',

  // Copy elements
  copy: {
    eyebrow: 'WEBSITE PREVIEW',
    headline: 'Your Website Is Ready for the Next Step',
    supporting: 'You’ve reviewed the frontend preview. Let’s discuss the next phase of development.',
    bookingHeading: 'RESERVE YOUR PROJECT',
    bookingLabel: 'Kickoff Booking Deposit',
    amount: '50% of the agreed project fee',
    paymentNote: 'Applied toward the total project cost; the remaining balance follows the agreed proposal.',
  },

  // Primary action: discuss proceeding
  primaryAction: {
    label: 'Discuss on WhatsApp',
    getMessage: (projectName) =>
      `Hi, I’ve reviewed the ${projectName} website preview and would like to discuss proceeding with the project. Please share the next steps for the 50% kickoff payment based on our agreed project fee and the remaining development work. Thank you.`,
  },

  // Secondary action: request changes
  secondaryAction: {
    label: 'I’d like to request a few changes',
    getMessage: (projectName) =>
      `Hi, I’ve reviewed the ${projectName} website preview. I’d like to request a few changes before proceeding. The changes I’d like are: `,
  },

  /**
   * Generates a valid wa.me link with URL-encoded editable message
   * @param {'primary' | 'secondary'} type
   * @returns {string}
   */
  getWhatsAppUrl(type = 'primary') {
    const rawNumber = this.whatsAppNumber.replace(/\D/g, '');
    const message =
      type === 'secondary'
        ? this.secondaryAction.getMessage(this.projectName)
        : this.primaryAction.getMessage(this.projectName);

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  },
};
