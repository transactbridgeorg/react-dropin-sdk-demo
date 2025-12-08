/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

type ToastMessage = {
  id: number;
  text: string;
  variant?: "primary" | "success" | "danger" | "warning" | "info";
  visible: boolean; // required for safe removal
};

export default function ToastContainer({
  messages,
  onRemove,
  onSoftHide,  // we add this callback — explained below
}: {
  messages: ToastMessage[];
  onRemove: (id: number) => void;
  onSoftHide: (id: number) => void; // tells provider "start fade-out but don't remove yet"
}) {
  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      {messages.map((msg) => (
        <ToastItem
          key={msg.id}
          message={msg}
          onSoftHide={onSoftHide}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function ToastItem({
  message,
  onSoftHide,
  onRemove,
}: {
  message: ToastMessage;
  onSoftHide: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const toastRef = useRef<HTMLDivElement | null>(null);

  // -------------------------------------------
  // Bootstrap show/hide handling
  // -------------------------------------------
  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;

    const toast = new (window as any).bootstrap.Toast(el, {
      autohide: true,
      delay: 3000,
    });

    const handleHide = () => {
      // to fade it out visually
      onSoftHide(message.id);
    };

    const handleHidden = () => {
      // Remove DOM only AFTER fade-out is finished
      onRemove(message.id);
    };

    el.addEventListener("hide.bs.toast", handleHide);
    el.addEventListener("hidden.bs.toast", handleHidden);

    toast.show();

    return () => {
      el.removeEventListener("hide.bs.toast", handleHide);
      el.removeEventListener("hidden.bs.toast", handleHidden);

      try {
        toast.dispose();
      } catch (err) {
        console.warn("Toast dispose issue:", err);
      }
    };
  }, [message.id, onSoftHide, onRemove]);

  return (
    <div
      ref={toastRef}
      className={`toast align-items-center text-bg-${
        message.variant ?? "danger"
      } border-0 ${message.visible ? "show" : "hide"}`}  // visible controls fade-out
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message.text}</div>

        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}
