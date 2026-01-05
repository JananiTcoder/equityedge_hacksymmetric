"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "default" | "large";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "default",
  className,
}: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--color-charcoal)]/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
          className={cn(
            "relative bg-[var(--color-surface)] rounded-[var(--radius-3xl)] shadow-lg w-full animate-in fade-in-0 zoom-in-95 duration-200",
            size === "default" && "max-w-[520px]",
            size === "large" && "max-w-[720px]",
            className
          )}
        >
          {/* Header */}
          {(title || description) && (
            <div className="p-6 pb-4 border-b border-[var(--color-border)]">
              {title && (
                <h2
                  id="modal-title"
                  className="text-[var(--text-h2)] font-bold text-[var(--color-text-primary)]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-[var(--text-body-sm)] text-[var(--color-text-muted)]"
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Content */}
          <div
            className={cn(
              "p-6 overflow-y-auto",
              size === "large" && "max-h-[70vh]"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 p-6 pt-4 border-t border-[var(--color-border)]",
        className
      )}
    >
      {children}
    </div>
  );
}
