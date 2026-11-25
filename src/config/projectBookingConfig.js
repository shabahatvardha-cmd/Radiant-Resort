import { hotelInfo } from '../data/hotelInfo.js';

/**
 * Master toggle to disable the client preview popup after kickoff payment is confirmed.
 * Set to `false` once payment is verified to completely disable the popup and footer trigger.
 */
export const PROJECT_PREVIEW_POPUP_ENABLED = true;

/**
 * Formats a YYYY-MM-DD date string plus retention days into a fixed, human-readable date
 * (e.g., "December 25, 2026") without restarting on every page load.
 * @param {string} publishedDateIso - ISO date string (YYYY-MM-DD)
 * @param {number} retentionDays - Number of days until preview removal
 * @returns {string}
 */
function calculateFixedDeadline(publishedDateIso, retentionDays) {
  const [year, month, day] = publishedDateIso.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day + retentionDays));
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(utcDate);
}

/**
 * Authoritative Project Preview, Deadline & WhatsApp Configuration
 * Centralized place for all project preview status, retention policy, and communication settings.
 */
export const projectBookingConfig = {
  // Central authoritative WhatsApp contact: 10-digit number with India country code 91
  // Stored strictly as digits-only without '+', spaces, brackets, or punctuation
  whatsAppNumber: hotelInfo?.contact?.whatsApp || '919670111167',

  // Project branding name
  projectName: hotelInfo?.name || 'The Radiant Hotel & Resort',

  // Central preview publication date & retention policy (fixed 30-day window from publication)
  previewPublishedDate: '2026-11-25',
  retentionDays: 30,
  get previewDeadlineDate() {
    return calculateFixedDeadline(this.previewPublishedDate, this.retentionDays);
  },

  // Copy elements
  copy: {
    eyebrow: 'WEBSITE PREVIEW',
    headline: 'Your Website Preview Is Ready',
    supporting: 'Review your desktop and mobile experience, then activate the next phase of development.',
    deadlinePolicy:
      'If the 50% kickoff payment is not received by this date, this website preview and its associated project files in our hosting storage will be removed by our team. Continuing after removal may require a new project setup and fee.',
  },

  // Order-tracking-style project progress stages (strictly 3 stages, no extra payment/approval/domain rows)
  progressStages: [
    {
      id: 'frontend-preview',
      label: 'Frontend Website Preview',
      status: 'Ready',
      completed: true,
    },
    {
      id: 'enquiry-and-development',
      label: 'Enquiry System & Remaining Development',
      status: 'Not Started',
      completed: false,
    },
    {
      id: 'business-launch',
      label: 'Business Website Launch',
      status: 'Pending',
      completed: false,
    },
  ],

  // Primary action: activate business website via WhatsApp
  primaryAction: {
    label: 'ACTIVATE MY BUSINESS WEBSITE',
    getMessage: (projectName) =>
      `Hi, I’ve reviewed the ${projectName} website preview and would like to discuss activating the business website. I understand that the kickoff payment is 50% of our agreed project fee. Please share the next steps for the remaining development work and launch. Thank you.`,
  },

  // Secondary action: request changes via WhatsApp
  secondaryAction: {
    label: 'I’d Like to Request Changes',
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
