import { NextRequest } from "next/server";
import { statService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET() {
  try {
    return ok(await statService.getAll());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await statService.create(body);
    revalidateResource("stats");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
