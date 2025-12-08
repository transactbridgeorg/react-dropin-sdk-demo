interface ScriptWithState extends HTMLScriptElement {
  _loaded?: boolean;
}

export function ensureScript({
  id,
  src,
  async = true,
  waitForLoad = false,
}: {
  id: string;
  src: string;
  async?: boolean;
  waitForLoad?: boolean;
}): boolean | Promise<boolean> {
  if (typeof window === 'undefined') {
    return waitForLoad ? Promise.reject(false) : false;
  }

  const existing = document.getElementById(id) as ScriptWithState | null;

  if (existing && existing.src === src) {
    if (waitForLoad) {
      if (existing._loaded) return Promise.resolve(true);

      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => reject(false));
      });
    }

    return true;
  }

  const script = document.createElement('script') as ScriptWithState;
  script.id = id;
  script.src = src;
  script.async = async;

  if (!waitForLoad) {
    document.head.appendChild(script);
    return true;
  }

  return new Promise((resolve, reject) => {
    script.onload = () => {
      script._loaded = true;
      resolve(true);
    };
    script.onerror = () => reject(false);

    document.head.appendChild(script);
  });
}

// Just to check if the SDK is added to the window object.
export function waitForSDK(maxWait = 3000) {
  return new Promise((resolve) => {
    const start = Date.now();

    const timer = setInterval(() => {
      if (window.TBDropin) {
        clearInterval(timer);
        resolve(true); // <-- SDK FOUND WITHIN 3 SECONDS
      } else if (Date.now() - start > maxWait) {
        clearInterval(timer);
        resolve(false); // <-- SDK NOT FOUND WITHIN 3 SECONDS
      }
    }, 50);
  });
}