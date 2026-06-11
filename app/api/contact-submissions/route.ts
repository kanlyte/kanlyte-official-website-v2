import { NextRequest } from "next/server";
import { contactSubmissionService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status");
    const data = status
      ? await contactSubmissionService.getByStatus(status)
      : await contactSubmissionService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await contactSubmissionService.create(body);
    return created(data);
  } catch (error) {
    return handleError(error);
  }
}
