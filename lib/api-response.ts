import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function created(data: unknown) {
  return NextResponse.json(data, { status: 201 });
}

export function notFound(message: string) {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: "Validation failed", issues: error.errors }, { status: 422 });
  }
  if (error instanceof Error) {
    const isNotFound = error.message.toLowerCase().includes("not found");
    const isConflict = error.message.toLowerCase().includes("already exists");
    if (isNotFound) return notFound(error.message);
    if (isConflict) return NextResponse.json({ error: error.message }, { status: 409 });
    return badRequest(error.message);
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
