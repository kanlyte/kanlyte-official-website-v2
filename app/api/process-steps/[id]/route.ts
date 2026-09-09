import { NextRequest } from "next/server";
import { processStepService } from "@/content-manager/services";
import { ok, handleError } from "@/lib/api-response";
import { revalidateResource } from "@/lib/revalidate";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return ok(await processStepService.getById(id));
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = await processStepService.update(id, body);
    revalidateResource("process-steps");
    return ok(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await processStepService.delete(id);
    revalidateResource("process-steps");
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
