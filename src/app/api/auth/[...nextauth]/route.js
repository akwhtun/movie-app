import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/app/models/User';
import connectDB from '@/app/lib/mongodb';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email, image } = user;
                await connectDB();
                let existingUser = await User.findOne({ email });

                if (!existingUser) {
                    existingUser = await User.create({ name, email, image });
                }

                user.id = existingUser._id;
                user.isAdmin = existingUser.isAdmin;
                return true;
            }
            return false;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: null,
    },
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
