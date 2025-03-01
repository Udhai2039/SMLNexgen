import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.email === "user@example.com" && credentials.password === "pass") {
          return { id: "1", name: "User", email: "user@example.com", image: "/dp.jpg" };
        }
        console.log('Invalid credentials:', credentials);
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Careers/Register',
  },
});

export { handler as GET, handler as POST };