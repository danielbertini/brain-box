import createSupabaseServerClient from "@/lib/supabase-server";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const supabase = await createSupabaseServerClient();
  const locale = req.headers.get("accept-language");
  const tMessage = await getTranslations({
    locale: locale ?? "en",
    namespace: "Message",
  });
  const { searchParams } = new URL(req.url);

  try {
    const { data: dataSession, error: errorSession } =
      await supabase.auth.getUser();

    if (errorSession || !dataSession?.user) {
      return NextResponse.json(
        { message: tMessage("Error.AccessDenied") },
        { status: 403 }
      );
    }

    const schema = z.object({
      id: z.string(),
    });

    const validation = schema.safeParse({
      id: searchParams.get("id"),
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
      .from("workplaces")
      .select("id, name, main")
      .eq("id", validation.data.id)
      .eq("user_id", dataSession?.user?.id)
      .single();

    if (error) {
      return NextResponse.json(
        { message: tMessage("Error.Unexpected") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: tMessage("Success.Done"), data: data },
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
