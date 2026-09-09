import { NextRequest } from "next/server";
import { projectService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get("active") === "true";
    const data = activeOnly
      ? await projectService.getActive()
      : await projectService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await projectService.create(body);
    revalidateResource("projects");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
