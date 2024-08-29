import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Middleware function
  (req) => {
    return NextResponse.next();
  },
  {
    // Options
    callbacks: {
      authorized: ({ token }) => {
        // This callback is called on every request to check if the user is authorized
        // Return true to allow access, false to deny
        return !!token;
      },
    },
  }
);

// Specify the routes to protect
export const config = {
  matcher: ["/logs/:path*", "/profile/:path*"],
};
