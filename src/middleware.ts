import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const noAuthApi = [
  "/newsletter",
  "/comments",
  "/og"
]

export function middleware(request: NextRequest) {
  for (const api of noAuthApi) {
    if (request.url.includes(api)) {
      return NextResponse.next();
    }
  }

  const authHeader = request.headers.get('Authorization');

  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
