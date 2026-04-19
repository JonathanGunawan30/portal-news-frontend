declare module '*.css';

declare global {
    interface Window {
        grecaptcha: any;
    }
    var grecaptcha: any;
}

export {};
