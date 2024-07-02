import createSupabaseServerClient from "@/lib/supabase-server";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export const DELETE = async (req: NextRequest) => {
  const supabase = await createSupabaseServerClient();
  const locale = req.headers.get("accept-language");
  const tMessage = await getTranslations({
    locale: locale ?? "en",
    namespace: "Message",
  });
  const body = await req.json();

  try {
    const { data: dataSession, error: errorSession } =
      await supabase.auth.getUser();

    if (errorSession || !dataSession?.user) {
      return NextResponse.json(
        { message: tMessage("Error.AccessDenied") },
        { status: 403 }
      );
    }

    const validation = schema.safeParse({
      id: body.id,
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

    const { data, error } = await supabase
      .from("screens")
      .delete()
      .eq("id", validation.data.id)
      .eq("user_id", dataSession.user.id);

    if (error) {
      return NextResponse.json(
        { message: tMessage("Error.Unexpected") },
        { status: 400 }
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
