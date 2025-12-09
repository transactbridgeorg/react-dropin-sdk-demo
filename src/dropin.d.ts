/* eslint-disable @typescript-eslint/no-explicit-any */
export type TBDropinFieldComponent = {
  mount: (selectorOrElement: string | HTMLElement) => void;
  unmount: () => void;
  clear?: () => void;
  on: (event: 'ready' | 'change' | string, cb: (data: any) => void) => void;
};

export type TBDropinInstance = {
  init: (config: { mode: string; popupConfig: any }) => Promise<void>;
  create: (type: string, options: Record<string, any>) => TBDropinFieldComponent;
  pay: (payload: any) => Promise<any>;
};

// ADD TO WINDOW OBJECT SO THAT IT LATER DOES NOT GIVE ERRORS WHILE USING window.TBDropin
declare global {
  interface Window {
    TBDropin?: TBDropinInstance; // constructor from sdk.js
  }
}
