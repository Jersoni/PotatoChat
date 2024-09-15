import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
    error: '/auth/error', // Custom error page
    verifyRequest: '/auth/verify-request', // Used for email verification messages
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile?.email) {
        // Return false to deny sign-in if the email is missing
        throw new Error('No profile')
      }
      // Return true to allow sign-in
      if (profile.email) {
        
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default NextAuth(authOption);
