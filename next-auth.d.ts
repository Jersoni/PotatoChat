// Import necessary types from NextAuth
import NextAuth from 'next-auth';

// Extend the default `User` type to include `username`
declare module 'next-auth' {
  interface User {
    username: string;
  }

  interface Session {
    user: {
      username: string;
      // Add other fields if necessary
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
  }
}