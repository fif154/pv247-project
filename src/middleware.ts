import { auth } from '@/auth';

const getIsProtectedPath = (path: string) => {
  const paths = ['/auth'];

  return paths.some((p) => path.startsWith(p));
};

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;

  const isProtected = getIsProtectedPath(req.nextUrl.pathname);

  if (!isLoggedIn && isProtected) {
    const redirectUrl = new URL('/login', req.nextUrl.origin);

    return Response.redirect(redirectUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
