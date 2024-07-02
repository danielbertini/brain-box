"use client";
import { DialogTrigger, Modal, ModalOverlay } from "react-aria-components";
import { useTranslations } from "next-intl";

interface UIDialogProps {
  isOpen: boolean;
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

export default function UIDialog({ isOpen, trigger, children }: UIDialogProps) {
  const tForm = useTranslations("Form");

  return (
    <DialogTrigger isOpen={isOpen}>
      {trigger}
      <ModalOverlay
        isDismissable
        className={({ isEntering, isExiting }) => `
          fixed inset-0 z-50 overflow-y-auto bg-secondary-100/60 dark:bg-secondary-950/80 flex min-h-full items-center justify-center p-6
          ${isEntering ? "animate-in fade-in duration-200 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-100 ease-in" : ""}
        `}>
        <Modal
          className={({ isEntering, isExiting }) => `
            w-full max-w-sm overflow-hidden rounded-xl shadow-2xl 
            ${isEntering ? "animate-in zoom-in-95 ease-out duration-200" : ""}
            ${isExiting ? "animate-out zoom-out-95 ease-in duration-100" : ""}
          `}>
          {children}
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
