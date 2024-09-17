import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import supabase from "./supabaseClient";

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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        if (credentials === null) return null

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('username', credentials?.username)
          .eq('password', credentials?.password)
          .single()
  
        if (error) {
          return null
        } else {
          return data
        }
      }
    })
    // ...add more providers here
  ],
  // pages: {
  //   signIn: '/auth/signin',  // Custom sign-in page
  //   signOut: '/auth/signout', // Custom sign-out page
  //   error: '/auth/error', // Custom error page
  //   verifyRequest: '/auth/verify-request', // Used for email verification messages
  // },
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     if (!profile?.email) {
  //       // Return false to deny sign-in if the email is missing
  //       throw new Error('No profile')
  //     }
  //     // Return true to allow sign-in
  //     if (profile.email) {
        
  //     }
  //     return true;
  //   },
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default NextAuth(authOption);
