import { NextRequest } from "next/server";
import { pageContentService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const pageType = req.nextUrl.searchParams.get("pageType");
    if (slug) return ok(await pageContentService.getBySlug(slug));
    if (pageType) return ok(await pageContentService.getByPageType(pageType));
    return ok(await pageContentService.getAll());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return created(await pageContentService.create(body));
  } catch (error) {
    return handleError(error);
  }
}
