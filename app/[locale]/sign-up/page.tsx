"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderUnauthenticated } from "@/components/header-unauthenticated";
import UITextField from "@/ui/textField";
import UIButton from "@/ui/button";
import UICard from "@/ui/card";

type Props = {
  params: { locale: string };
};

export default function SignUpPage({ params: { locale } }: Props) {
  const t = useTranslations("Page.SignUp");
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Message");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    yourName: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 3 }))
      .max(125, tMessage("Error.MaxSize", { max: 125 })),
    companyName: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 3 }))
      .max(125, tMessage("Error.MaxSize", { max: 125 })),
    email: z.string().email(tMessage("Error.InvalidEmail")),
    password: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 4 }))
      .max(32, tMessage("Error.MaxSize", { max: 32 })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
      companyName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        yourName: values.yourName,
        companyName: values.companyName,
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
      toast.error(data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderUnauthenticated />
      <div className="container mx-auto px-4 flex justify-center items-center">
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <UICard className="mt-24 w-[350px] min-w-max p-8" shadow="sm">
            <h1 className="text-2xl mb-6 text-secondary-900 dark:text-secondary-100">
              {t("Title")}
            </h1>
            <div className="space-y-4">
              <UITextField
                register={form.register("yourName")}
                type="text"
                label={tForm("YourName")}
                errorMessage={form.formState.errors.yourName?.message}
              />
              <UITextField
                register={form.register("companyName")}
                type="text"
                label={tForm("CompanyName")}
                errorMessage={form.formState.errors.companyName?.message}
              />
              <UITextField
                register={form.register("email")}
                type="email"
                label={tForm("Email")}
                errorMessage={form.formState.errors.email?.message}
              />
              <UITextField
                register={form.register("password")}
                type="password"
                label={tForm("Password")}
                errorMessage={form.formState.errors.password?.message}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <UIButton
                type="submit"
                variant="solid"
                color="primary"
                isDisabled={loading}
                isLoading={loading}>
                {tForm("Submit")}
              </UIButton>
            </div>
          </UICard>
        </form>
      </div>
    </>
  );
}
