import { NextRequest } from "next/server";
import { sectorWeServeService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET() {
  try {
    return ok(await sectorWeServeService.getAll());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await sectorWeServeService.create(body);
    revalidateResource("sectors-we-serve");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
