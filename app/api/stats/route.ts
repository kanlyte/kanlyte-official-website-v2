import { NextRequest } from "next/server";
import { statService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

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
    return created(await statService.create(body));
  } catch (error) {
    return handleError(error);
  }
}
