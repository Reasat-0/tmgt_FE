import { setAuthCookies } from "@/server/utils/auth";
import { bffError, bffFetch } from "@/server/utils/bff-fetch";
import { NextRequest, NextResponse } from "next/server";

// export async function POST() {
//   return NextResponse.json({ message: "Not implemented" }, { status: 501 });
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await bffFetch<{
      accessToken: string;
      refreshToken?: string;
      user: unknown;
    }>("/api/auth/login", {
      method: "POST",
      body,
      cache: "no-store",
      token: "",
    });

    if (res?.data?.accessToken) {
      await setAuthCookies({
        accessToken: res.data.accessToken,
        // Will add refreshToken if provided by the backend
      });
    }
    return NextResponse.json(res);
  } catch (error) {
    if (error instanceof bffError) {

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