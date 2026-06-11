import { NextRequest } from "next/server";
import { testimonialService } from "@/content-manager/services";
import { ok, handleError } from "@/lib/api-response";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return ok(await testimonialService.getById(id));
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    return ok(await testimonialService.update(id, body));
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await testimonialService.delete(id);
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
