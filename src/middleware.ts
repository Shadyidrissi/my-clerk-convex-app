import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// تعريف المسارات المحمية
const isProtectedRoute = createRouteMatcher([
  '/client(.*)',
  '/new(.*)',
  '/addPost(.*)',
  '/allPost(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // استثناء الملفات الثابتة وصفحات معينة
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // حماية المسارات الخاصة بـ API
    '/(api|trpc)(.*)',
    // حماية جميع المسارات باستثناء صفحات تسجيل الدخول والتسجيل
    '/((?!sign-in|sign-up).*)',
  ],
};
