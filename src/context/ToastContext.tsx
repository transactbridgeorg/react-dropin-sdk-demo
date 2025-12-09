import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

type ToastVariant = "primary" | "success" | "danger" | "warning" | "info";

export type ToastMessage = {
  id: number;
  text: string;
  variant: ToastVariant;
  visible: boolean; // REQUIRED for safe fade-out
};

type ToastContextValue = {
  showToast: (msg: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // ------------------------------------------------
  // SHOW toast (always visible=true initially)
  // ------------------------------------------------
  const showToast = useCallback(
    (text: string, variant: ToastVariant = "danger") => {
      setToasts((prev) => [
        ...prev,
        { id: Date.now(), text, variant, visible: true },
      ]);
    },
    []
  );

  // ------------------------------------------------
  // SOFT HIDE toast (Bootstrap hide.bs.toast)
  // This triggers fade-out but does NOT remove from DOM
  // ------------------------------------------------
  const softHideToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, visible: false } : t
      )
    );
  }, []);

  // ------------------------------------------------
  // REMOVE toast (Bootstrap hidden.bs.toast)
  // Now it is safe to remove from DOM
  // ------------------------------------------------
  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Render Toast UI */}
      <ToastContainer
        messages={toasts}
        onSoftHide={softHideToast}
        onRemove={removeToast}
      />
    </ToastContext.Provider>
  );
};

// To Prevent Fast Refresh Type Error (No Effect on the app).
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
};
