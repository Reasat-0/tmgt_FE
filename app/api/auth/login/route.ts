import { BackendError, backendFetch } from "@/server/utils/backend-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

export async function GET(req: NextRequest) {
  try {
    const res = await backendFetch("/posts", {
      method: "GET",
      cache: "no-store",
      token: "",
    });

    return NextResponse.json(res);
  } catch (error) {
    if (error instanceof BackendError) {
      const errorObj = {
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message || "An unexpected error occurred.",
        errors: error.errors,
        code: error.code,
      };
      return NextResponse.json(errorObj);
    }

    // 6. Anything truly unexpected — don't leak internals to the client.
    return NextResponse.json(
      { success: false, statusCode: 500, message: "Unexpected server error" },
      { status: 500 },
    );
  }
}
