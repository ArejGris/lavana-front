import { cookies } from "next/headers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Invalid credentials");
        }
        const res = await fetch("http://localhost:5000/admin/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
          }),
          mode: "cors",
        });
        const data = await res.json();
        if (data.status !== 200 || !data.admin) {
          throw new Error("not authorized");
        }
        console.log(data.admin);
        const admin = data.admin;
        return { id: admin.id, name: admin.email, email: admin.email ,role:admin.role};
      },
    }),
  ],
  callbacks: {
    jwt(params) {
      if (params.user?.id) {
        params.token.id = params.user.id;
        params.token.name = params.user.email;
        params.token.role = params.user.role;
      }
      console.log(params.token,"params.token")
      cookies().set("admin",params.token);
     
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.role = token.role;
      
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
