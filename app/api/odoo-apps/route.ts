import { NextRequest } from "next/server";
import { odooAppService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await odooAppService.getActive()
      : await odooAppService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await odooAppService.create(body);
    revalidateResource("odoo-apps");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
