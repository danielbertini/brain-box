export const revalidate = 0;
export const fetchCache = "force-no-store";

import createSupabaseServerClient from "@/lib/supabase-server";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: "Acesso negado." }, { status: 403 });
  }

  const imagekit = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  });

  imagekit.deleteFolder(data.folder, (error, response) => {
    if (error) {
    }
  });

  return NextResponse.json({ success: true });
};
