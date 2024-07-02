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

    const schema = z.object({
      id: z.string(),
      workplace_id: z.string(),
      name: z
        .string()
        .min(4, tMessage("Error.MinSize", { min: 4 }))
        .max(32, tMessage("Error.MaxSize", { max: 32 })),
    });

    const validation = schema.safeParse({
      id: body.id,
      name: body.name,
      workplace_id: body.workplace_id,
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

    const { data: dataDuplicated, error: errorDuplicated } = await supabase
      .from("screens")
      .select("id")
      .eq("name", validation.data.name)
      .eq("workplace_id", validation.data.workplace_id)
      .neq("id", validation.data.id)
      .single();

    if (dataDuplicated) {
      return NextResponse.json(
        { message: tMessage("Error.Duplicated") },
        { status: 400 }
      );
    }

    var updateValues: any = new Object();

    if (validation.data.name) {
      updateValues["name"] = validation.data.name;
    }

    if (body.playlist_id) {
      updateValues["playlist_id"] = body.playlist_id;
    }

    updateValues["updated_at"] = new Date().toISOString();

    const { data, error } = await supabase
      .from("screens")
      .update([updateValues])
      .eq("id", validation.data.id)
      .eq("user_id", dataSession.user.id)
      .select("playlists(list)")
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
