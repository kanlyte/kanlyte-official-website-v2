import { NextRequest } from "next/server";
import { productService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug) return ok(await productService.getBySlug(slug));

    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await productService.getActive()
      : await productService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await productService.create(body);
    revalidateResource("products");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
