import { NextRequest } from "next/server";
import { milestoneService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET() {
  try {
    return ok(await milestoneService.getAll());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return created(await milestoneService.create(body));
  } catch (error) {
    return handleError(error);
  }
}
