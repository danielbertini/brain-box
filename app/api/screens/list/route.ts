import createSupabaseServerClient from "@/lib/supabase-server";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  page: z
    .string()
    .nullish()
    .transform((s) => s ?? "0"),
  limit: z
    .string()
    .nullish()
    .transform((s) => s ?? "30"),
  search: z
    .string()
    .nullish()
    .transform((s) => s ?? null),
  workplace_id: z
    .string()
    .nullish()
    .transform((s) => s ?? null),
});

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

    const validation = schema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search"),
      workplace_id: searchParams.get("workplace_id"),
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

    let query = supabase
      .from("screens")
      .select("id, name, code, playlist_id, playlists(list)");

    query.eq("user_id", dataSession?.user?.id);
    query.eq("workplace_id", validation?.data?.workplace_id);
    query.range(
      Number(validation?.data?.page) * Number(validation?.data?.limit),
      Number(validation?.data?.page) * Number(validation?.data?.limit) +
        Number(validation?.data?.limit) -
        1
    );
    query.order("name", { ascending: true });
    if (validation?.data?.search) {
      query.or(`name.ilike.%${validation?.data?.search}%`);
    }

    const { data, error }: any = await query;

    if (error) {
      return NextResponse.json(
        { message: tMessage("Error.Unexpected") },
        { status: 400 }
      );
    }

    let queryPlaylists = supabase.from("playlists").select("id, name, list");

    queryPlaylists.eq("workplace_id", validation?.data?.workplace_id);
    queryPlaylists.order("name", { ascending: true });

    const { data: dataPlaylist, error: errorPlaylist }: any =
      await queryPlaylists;

    if (errorPlaylist) {
      return NextResponse.json(
        { message: tMessage("Error.Unexpected") },
        { status: 400 }
      );
    }

    return NextResponse.json({ data, playlists: dataPlaylist });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: tMessage("Error.Unexpected") },
      { status: 500 }
    );
  }
};
