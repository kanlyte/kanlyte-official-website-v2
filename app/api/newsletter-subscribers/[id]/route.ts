import { NextRequest } from "next/server";
import { newsletterSubscriberService } from "@/content-manager/services";
import { ok, handleError } from "@/lib/api-response";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await newsletterSubscriberService.delete(id);
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
