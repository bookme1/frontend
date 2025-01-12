import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'not found',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || 'not found',
    }),
    // Другие провайдеры, если нужно
  ],
});
