import { NextRequest } from "next/server";
import { teamMemberService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(req: NextRequest) {
  try {
    const filter = req.nextUrl.searchParams.get("filter");
    const data =
      filter === "featured"
        ? await teamMemberService.getFeatured()
        : filter === "active"
        ? await teamMemberService.getActive()
        : await teamMemberService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await teamMemberService.create(body);
    revalidateResource("team-members");
    return created(result);
  } catch (error) {
    return handleError(error);
  }
}
