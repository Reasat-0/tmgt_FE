<<<<<<< Updated upstream
import { BackendError, backendFetch } from "@/server/utils/backend-client";
=======
import { setAuthCookies } from "@/server/utils/auth";
import { bffError, bffFetch } from "@/server/utils/backend-fetch";
>>>>>>> Stashed changes
import { NextRequest, NextResponse } from "next/server";

// export async function POST() {
//   return NextResponse.json({ message: "Not implemented" }, { status: 501 });
// }

export async function POST(req: NextRequest) {
  try {
<<<<<<< Updated upstream
    const res = await backendFetch("/api/auth/login", {
      method: "GET",
=======
    const body = await req.json();
    const res = await bffFetch<{
      accessToken: string;
      refreshToken?: string;
      user: unknown;
    }>("/api/auth/login", {
      method: "POST",
      body,
>>>>>>> Stashed changes
      cache: "no-store",
      token: "",
    });

<<<<<<< Updated upstream
=======
    if (res?.data?.accessToken) {
      await setAuthCookies({
        accessToken: res.data.accessToken,
        // Will add refreshToken if provided by the backend
      });
    }
>>>>>>> Stashed changes
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
