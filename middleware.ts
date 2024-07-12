import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// create routematcher will allow to match the particular routes that we want to amke private or public

const protectedRoutes= createRouteMatcher([
 '/',
 '/upcoming',
 '/previous',
 'recordings',
 'personal-room',
 '/meeting(.*)'   
])

export default clerkMiddleware((auth, req)=>{
    if(protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};