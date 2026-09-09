import { NextRequest } from "next/server";
import { serviceService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug) return ok(await serviceService.getBySlug(slug));

    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await serviceService.getActive()
      : await serviceService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await serviceService.create(body);
    revalidateResource("services");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
