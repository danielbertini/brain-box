"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import UiPageTitle from "@/components/page-title";
import UITextField from "@/ui/textField";
import UICard from "@/ui/card";
import UIPageLoading from "@/ui/pageLoading";
import UIButton from "@/ui/button";
import createSupabaseClient from "@/lib/supabase-client";

type Props = {
  params: { locale: string };
};

export default function SettingsProfilePage({ params: { locale } }: Props) {
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Message");
  const tPageDashboard = useTranslations("Page.Dashboard");

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const formSchema = z.object({
    yourName: z
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
      email: "",
      password: "",
    },
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setLoading(false);
      setData(data);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSaving(true);

    const response = await fetch("/api/auth/update", {
      method: "POST",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        yourName: values.yourName,
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setSaving(false);
  };

  const renderContent = () => {
    return (
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <UICard
          variant="outlined"
          className="
            p-4
            w-full
            sm:w-full
            md:w-full
            lg:w-1/2
            xl:w-1/2
          ">
          <div className="space-y-4">
            <UITextField
              register={form.register("yourName")}
              defaultValue={data?.user?.user_metadata?.name || ""}
              type="text"
              label={tForm("YourName")}
              errorMessage={form.formState.errors.yourName?.message}
            />
            <UITextField
              register={form.register("email")}
              defaultValue={data?.user?.email || ""}
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
            <div className="flex justify-end">
              <UIButton
                type="submit"
                isLoading={saving}
                isDisabled={saving}
                color="primary">
                {tForm("Save")}
              </UIButton>
            </div>
          </div>
        </UICard>
      </form>
    );
  };

  return (
    <>
      <UiPageTitle
        title={`${tPageDashboard("Menu.Settings.Title")} / ${tPageDashboard(
          "Menu.Settings.Profile"
        )}`}
        className="mt-8 mb-2"
      />
      {loading ? <UIPageLoading /> : renderContent()}
    </>
  );
}
