import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); // Clone the request url
  const { pathname } = req.nextUrl; // Get pathname of request (e.g. /blog-slug)
  // Get hostname of request (e.g. demo.sleeping.place)
  const hostname = req.headers.get("host");
  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: "No hostname found in request headers",
    });

  // Only for demo purposes – remove this if you want to use your root domain as the landing page
  if (hostname === "sleeping.place" || hostname === "platforms.sleeping.place") {
    return NextResponse.redirect("https://app.sleeping.place");
  }

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.sleeping.place`, "")
          .replace(`.platformize.sleeping.place`, "")
      : hostname.replace(`.localhost:3000`, "");

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    if (currentHost == "app") {
      if (
        pathname === "/login" &&
        (req.cookies["next-auth.session-token"] ||
          req.cookies["__Secure-next-auth.session-token"])
      ) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      url.pathname = `/app${pathname}`;
      return NextResponse.rewrite(url);
    } else if (
      hostname === "localhost:3000" ||
      hostname === "platformize.sleeping.place"
    ) {
      url.pathname = `/home`;
      return NextResponse.rewrite(url);
    } else {
      url.pathname = `/_sites/${currentHost}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }
}
