import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model';
import dbConnect from '@/lib/dbConnect';
import { z } from 'zod';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await dbConnect();

        const credentialsSchema = z.object({
          email: z.string().email({ message: "Invalid email address" }),
          password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
        });

        try {
          credentialsSchema.parse(credentials);
        } catch (error) {
          return null;
        }

        const existingUser = await User.findOne({ email: credentials.email });
        if (!existingUser) return null;

        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
        if (!passwordValidation) return null;

        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ token, session }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

