import { NextRequest } from "next/server";
import { contactInfoService } from "@/content-manager/services/contact-info.service";
import { ok, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET() {
  try {
    return ok(await contactInfoService.get());
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const result = await contactInfoService.upsert(await req.json());
    revalidateResource("contact-info");
    return ok(result);
  } catch (error) {
    return handleError(error);
  }
}
