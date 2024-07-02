"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

interface UiAlertDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  response: (response: boolean) => void;
}

const UiAlertDialog: React.FC<UiAlertDialogProps> = ({
  title,
  description,
  children,
  response,
}) => {
  const tForm = useTranslations("Form");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tForm("No")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => response(true)}>
            {tForm("Yes")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UiAlertDialog;
