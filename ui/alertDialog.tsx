"use client";
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { AlertCircleIcon } from "lucide-react";
import UICard from "./card";
import UIButton from "./button";
import { useTranslations } from "next-intl";

interface UIAlertDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  response: (response: boolean) => void;
}

export default function UIAlertDialog({
  trigger,
  title,
  description,
  response,
}: UIAlertDialogProps) {
  const tForm = useTranslations("Form");

  return (
    <DialogTrigger>
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
          <Dialog
            role="alertdialog"
            className="outline-none ring-none border-none relative">
            {({ close }) => (
              <UICard className="p-6">
                <div className="flex flex-col gap-4 items-center justify-center">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {title}
                    </p>
                    <AlertCircleIcon className="w-6 h-6 text-rose-500" />
                  </div>
                  <p className="text-neutral-500 text-left">{description}</p>
                </div>
                <div className="flex gap-2 items-center justify-end mt-6">
                  <UIButton
                    variant="link"
                    onPress={() => {
                      response(false);
                      close();
                    }}>
                    {tForm("No")}
                  </UIButton>
                  <UIButton
                    variant="solid"
                    color="danger"
                    onPress={() => {
                      response(true);
                      close();
                    }}>
                    {tForm("Yes")}
                  </UIButton>
                </div>
              </UICard>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
