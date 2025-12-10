type ScriptWithState = HTMLScriptElement & { _loaded?: boolean };

export function loadScriptWithRetry({
  id,
  src,
  async = true,
  maxRetries = 3,
  attempt = 1,
}: {
  id: string;
  src: string;
  async?: boolean;
  maxRetries?: number;
  attempt?: number;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script") as ScriptWithState;
    script.id = id;
    script.src = src;
    script.async = async;

    script.onload = () => {
      script._loaded = true;
      resolve(true);
    };

    script.onerror = () => {
      script.remove();

      if (attempt < maxRetries) { 
        console.log({attempt})
        resolve(
            loadScriptWithRetry({
              id,
              src,
              async,
              maxRetries,
              attempt: attempt + 1,
            })
          )
      } else {
        reject(false);
      }
    };

    document.head.appendChild(script);
  });
}

export function ensureScript({
  id,
  src,
  async = true,
  waitForLoad = false,
  maxRetries = 3,
}: {
  id: string;
  src: string;
  async?: boolean;
  waitForLoad?: boolean;
  maxRetries?: number;
}): boolean | Promise<boolean> {
  if (typeof window === "undefined") {
    return waitForLoad ? Promise.reject(false) : false;
  }

  const existing = document.getElementById(id) as ScriptWithState | null;

  if (existing && existing.src === src) {
    if (!waitForLoad) return true;

    if (existing._loaded) return Promise.resolve(true);

    // Attach load/error listeners to existing script
    return new Promise((resolve, reject) => {

      existing.addEventListener("load", () => resolve(true));

      existing.addEventListener("error", () => {
        existing.remove();
        loadScriptWithRetry({ id, src, async, maxRetries })
          .then(resolve)
          .catch(reject);
      });
    });
  }

  // New script case
  if (!waitForLoad) {
    loadScriptWithRetry({ id, src, async, maxRetries }).catch(() => {});
    return true;
  }

  return loadScriptWithRetry({ id, src, async, maxRetries });
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