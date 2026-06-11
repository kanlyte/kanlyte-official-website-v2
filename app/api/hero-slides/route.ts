import { NextRequest } from "next/server";
import { heroSlideService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await heroSlideService.getActive()
      : await heroSlideService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return created(await heroSlideService.create(body));
  } catch (error) {
    return handleError(error);
  }
}
