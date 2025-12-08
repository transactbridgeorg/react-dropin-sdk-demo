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

declare global {
  interface Window {
    TBDropin?: TBDropinInstance; // constructor from sdk.js
  }
}
export type DropinContextValue = {
  isSdkScriptLoaded: boolean;
  isSdkReady: boolean;
  sdkError?: string;

  isUpiMounted: boolean;
  isUpiReady: boolean;
  upiValue: string | null;

  mountUpi: (selector?: string) => void;
  unmountUpi: () => void;
};

export type InputConfigItem = {
  element?: string;
  selector?: string;
  config: object;
};

export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];