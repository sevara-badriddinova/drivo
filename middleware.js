import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
// clerkMiddleware runs logic before any request handled
// routeMatcher defines which routes should be protected 

// only logged in users can access these pages 
// (.*) anything after that is protected
const isProtectedRoute = createRouteMatcher([
    "/admin(.*)", 
    "/saved-card(.*)",
    "/reservations(.*)",
])
export default clerkMiddleware(async (auth,req)=>{
    // gets each userId using auth 
    const {userId} = await auth();

    // if user is not signed in and tries to access protected route, redirected to sign-in page
    if(!userId && isProtectedRoute(req)){
        const {redirectToSignIn} = await auth();
        return redirectToSignIn();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};