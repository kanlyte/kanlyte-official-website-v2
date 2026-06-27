import { NextRequest } from "next/server";
import { socialLinkService } from "@/content-manager/services/social-link.service";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    return ok(activeOnly ? await socialLinkService.getActive() : await socialLinkService.getAll());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    return created(await socialLinkService.create(await req.json()));
  } catch (error) {
    return handleError(error);
  }
}
