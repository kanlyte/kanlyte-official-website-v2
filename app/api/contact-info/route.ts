import { NextRequest } from "next/server";
import { contactInfoService } from "@/content-manager/services/contact-info.service";
import { ok, handleError } from "@/lib/api-response";

export async function GET() {
  try {
    return ok(await contactInfoService.get());
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    return ok(await contactInfoService.upsert(await req.json()));
  } catch (error) {
    return handleError(error);
  }
}
