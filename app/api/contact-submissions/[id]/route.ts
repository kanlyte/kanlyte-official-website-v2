import { NextRequest } from "next/server";
import { contactSubmissionService } from "@/content-manager/services";
import { ok, handleError } from "@/lib/api-response";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return ok(await contactSubmissionService.getById(id));
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    return ok(await contactSubmissionService.updateStatus(id, body));
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await contactSubmissionService.delete(id);
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
