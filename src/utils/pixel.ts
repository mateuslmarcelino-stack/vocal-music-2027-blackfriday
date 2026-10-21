/**
 * Meta Pixel Tracking Utility
 * ID: 2962022827484519
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackMetaPixel = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    } catch (e) {
      console.warn('Meta Pixel event failed:', e);
    }
  }
};

export const trackMetaCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (params) {
        window.fbq('trackCustom', eventName, params);
      } else {
        window.fbq('trackCustom', eventName);
      }
    } catch (e) {
      console.warn('Meta Pixel custom event failed:', e);
    }
  }
};
