import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";


const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:3001',
	'https://games-frontend1.vercel.app',
];

export function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const res = NextResponse.next();

	const origin = req.headers.get("origin") as string

	if (allowedOrigins.includes(origin)) {
		res.headers.append('Access-Control-Allow-Origin', origin);
	}

	res.headers.append('Access-Control-Allow-Credentials', "true")
	res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
	res.headers.append(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)

	if (pathname !== "/" && !pathname.startsWith("/api/games")) {

		return NextResponse.redirect(new URL("/", req.url));

	}
	return res
}

export const config = {
	matcher: '/((?!_next/static|_next/image|.next/images|images|favicon.svg).*)',
}