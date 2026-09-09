import { NextRequest } from "next/server";
import { socialLinkService } from "@/content-manager/services/social-link.service";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

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
    const result = await socialLinkService.create(await req.json());
    revalidateResource("social-links");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
