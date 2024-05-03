import { NextResponse } from 'next/server';
import type {NextRequest} from "next/server";
 
export function middleware(request: NextRequest) {

    if(request.nextUrl.pathname !== "/"){

       return NextResponse.redirect(new URL("/", request.url));

    }
    return NextResponse.next()
}
 
export const config = {
  matcher: '/((?!api|_next/static|_next/image|.next/images|images|favicon.svg).*)',
}