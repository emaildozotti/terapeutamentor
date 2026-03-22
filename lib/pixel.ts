declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const PIXEL_ID = '1382214186778804';

export const initPixel = (userData?: { em?: string; ph?: string; fn?: string; ln?: string }) => {
  if (typeof window !== 'undefined') {
    const fbq = window.fbq || (window as any).fbq;
    if (fbq) {
      if (userData) {
        console.log('[Pixel] Re-initializing with user data for Advanced Matching:', userData);
        fbq('init', PIXEL_ID, userData);
      } else {
        fbq('init', PIXEL_ID);
      }
    }
  }
};

export const trackPixelEvent = (eventName: string, params?: object) => {
  console.log(`[Pixel] Attempting to track standard event: ${eventName}`, params);
  if (typeof window !== 'undefined') {
    const fbq = window.fbq || (window as any).fbq;
    if (fbq) {
      fbq('track', eventName, params);
      console.log(`[Pixel] Standard event ${eventName} sent.`);
    } else {
      console.warn(`[Pixel] fbq not found. Event ${eventName} was not tracked.`);
    }
  }
};

export const trackPixelCustomEvent = (eventName: string, params?: object) => {
  console.log(`[Pixel] Attempting to track custom event: ${eventName}`, params);
  if (typeof window !== 'undefined') {
    const fbq = window.fbq || (window as any).fbq;
    if (fbq) {
      fbq('trackCustom', eventName, params);
      console.log(`[Pixel] Custom event ${eventName} sent.`);
    } else {
      console.warn(`[Pixel] fbq not found. Custom event ${eventName} was not tracked.`);
    }
  }
};
