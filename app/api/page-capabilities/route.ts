import { NextRequest } from "next/server";
import { pageCapabilityService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug) return ok(await pageCapabilityService.getBySlug(slug));
    return ok(await pageCapabilityService.getAll());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return created(await pageCapabilityService.create(body));
  } catch (error) {
    return handleError(error);
  }
}
