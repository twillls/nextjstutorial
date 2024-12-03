import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // authorized callback used to verify if request is authorized to access page
    // via next.js middleware. Called before request completed, recieves object
    // with auth and request properties. Auth is user session, request is incoming req.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect unauth users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  // Providers option is an array where you can list different login options.
  providers: [],
} satisfies NextAuthConfig;