import createSupabaseServerClient from "@/lib/supabase-server";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const supabase = await createSupabaseServerClient();
  const locale = req.headers.get("accept-language");
  const tMessage = await getTranslations({
    locale: locale ?? "en",
    namespace: "Message",
  });
  const schema = z.object({
    yourName: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 3 }))
      .max(125, tMessage("Error.MaxSize", { max: 125 })),
    email: z.string().email(),
    password: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 4 }))
      .max(32, tMessage("Error.MaxSize", { max: 32 })),
  });
  const body = await req.json();

  try {
    const validation = schema.safeParse({
      yourName: body?.yourName,
      email: body?.email,
      password: body?.password,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          message: tMessage("Error.InvalidFields"),
          errors: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { data, error }: any = await supabase.auth.updateUser({
      email: validation?.data?.email,
      password: validation?.data?.password,
      data: {
        name: validation?.data?.yourName,
      },
    });

    if (error) {
      console.log(error);
      return NextResponse.json(
        { message: tMessage("Error.EmailAlreadyExists") },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: tMessage("Success.Done") },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: tMessage("Error.Unexpected") },
      { status: 500 }
    );
  }
};
