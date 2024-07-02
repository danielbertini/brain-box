"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Separator } from "./ui/separator";

interface UiAlertDialogProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const UiDialog: React.FC<UiAlertDialogProps> = ({
  title,
  description,
  trigger,
  children,
  footer,
  open,
  setOpen,
}) => {
  const tForm = useTranslations("Form");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <Separator />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {tForm("Cancel")}
            </Button>
          </DialogClose>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UiDialog;
