import { NextRequest } from "next/server";
import { pricingPlanService } from "@/content-manager/services";
import { ok, created, handleError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const data = category
      ? await pricingPlanService.getByCategory(category)
      : await pricingPlanService.getAll();
    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return created(await pricingPlanService.create(body));
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { category, pricingEnabled } = await req.json();
    return ok(await pricingPlanService.updateCategory(category, pricingEnabled));
  } catch (error) {
    return handleError(error);
  }
}
