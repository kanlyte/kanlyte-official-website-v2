import { NextRequest } from "next/server";
import { testimonialService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await testimonialService.getActive()
      : await testimonialService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await testimonialService.create(body);
    revalidateResource("testimonials");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
