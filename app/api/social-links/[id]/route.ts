import { NextRequest } from "next/server";
import { socialLinkService } from "@/content-manager/services/social-link.service";
import { ok, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    return ok(await socialLinkService.getById((await params).id));
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const result = await socialLinkService.update((await params).id, await req.json());
    revalidateResource("social-links");
    return ok(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await socialLinkService.delete((await params).id);
    revalidateResource("social-links");
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
