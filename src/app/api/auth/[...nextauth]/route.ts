import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const { name, email } = user;
                try {
                    await connectDB();
                    const existingUser = await User.findOne({ email: email as string });

                    if (!existingUser) {
                        await User.create({
                            name: name as string,
                            email: email as string,
                            authProvider: "google",
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error saving user to DB", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            return session;
        },
    },
    pages: {
        // signIn: '/auth/signin', // We can create a custom page later if needed
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
