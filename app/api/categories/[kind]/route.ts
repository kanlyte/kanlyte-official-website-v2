import { NextRequest } from "next/server";
import { resourceCategoryService } from "@/content-manager/services";
import { created, handleError, ok } from "@/lib/api-response";

type Context = { params: Promise<{ kind: string }> };

export async function GET(_: NextRequest, { params }: Context) {
  try {
    const { kind } = await params;
    return ok(await resourceCategoryService.getAll(kind));
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest, { params }: Context) {
  try {
    const { kind } = await params;
    return created(await resourceCategoryService.create(kind, await req.json()));
  } catch (error) {
    return handleError(error);
  }
}
