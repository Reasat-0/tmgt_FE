import { loginSchema } from '@/app/modules/auth/auth-schema';
import { setAuthCookies } from '@/server/utils/auth';
import { BffError, bffFetch } from '@/server/utils/bff-fetch';
import { NextRequest, NextResponse } from 'next/server';

// export async function POST() {
//   return NextResponse.json({ message: "Not implemented" }, { status: 501 });
// }

export async function POST(req: NextRequest) {
   let body: unknown;
   try {
      body = await req.json();
   } catch {
      return NextResponse.json(
         { success: false, statusCode: 400, message: 'Invalid JSON body' },
         { status: 400 }
      );
   }

   const parsed = loginSchema.safeParse(body);
   if (!parsed.success) {
      return NextResponse.json(
         {
            success: false,
            statusCode: 400,
            message: 'Invalid email or password format',
            errors: parsed.error.flatten().fieldErrors,
         },
         { status: 400 }
      );
   }
   try {
      const body = await req.json();
      const res = await bffFetch<{
         accessToken: string;
         refreshToken?: string;
         user: unknown;
      }>('/api/auth/login', {
         method: 'POST',
         body,
         cache: 'no-store',
         token: '',
      });

      const { accessToken, refreshToken, user } = res?.data ?? {};

      if (!accessToken) {
         return NextResponse.json(
            {
               success: false,
               statusCode: 500,
               message: 'Access token not provided by the Service',
            },
            { status: 500 }
         );
      }
      await setAuthCookies({
         accessToken,
         // Will add refreshToken if provided by the backend
      });
      return NextResponse.json({
         success: true,
         message: res.message,
         data: { user },
      });
   } catch (error) {
      if (error instanceof BffError) {
         const errorObj = {
            success: false,
            statusCode:
               error.statusCode >= 400 && error?.statusCode < 599
                  ? error.statusCode
                  : 500,
            message: error.message || 'An unexpected error occurred.',
            errors: error.errors,
            code: error.code,
         };
         return NextResponse.json(errorObj, {
            status: error.statusCode || 500,
         });
      }
      // 6. Anything truly unexpected — don't leak internals to the client.
      return NextResponse.json(
         {
            success: false,
            statusCode: 500,
            message: 'Unexpected server error',
         },
         { status: 500 }
      );
   }
}
