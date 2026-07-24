import { NextRequest } from "next/server";
import { galleryImageService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await galleryImageService.getActive()
      : await galleryImageService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return created(await galleryImageService.create(body));
  } catch (error) {
    return handleError(error);
  }
}
