import { cookies } from "next/headers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: "secretkey",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Invalid credentials");
        }
        if (credentials?.role === "admin") {
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
          return {
            id: admin.id,
            name: admin.email,
            email: admin.email,
            role: "admin",
            accessToken:data.token
          };
        } else {
          console.log("hhhhhhh")
          const res = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            mode: "cors",
          });
          const data = await res.json();
          if (data.status !== 200 || !data.user) {
            throw new Error("not authorized");
          }
          console.log(data.user);
          const user = data.user;
          cookies().set("userId",user.id)
          return {
            id: user.id,
            name: user.email,
            email: user.email,
            role: "user",
            accessToken:data.token
          };
        }
      },
     
    }),
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile ,user,token}) {
      if (account.provider === "google") {
       console.log(profile,"profile google")
     const res= await fetch('http://localhost:5000/user/signingoogle',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:profile.email,firstName:profile.given_name,lastName:profile.family_name}),
        mode:"cors"
       })
       const data=await res.json()
       if(data.status===200){
         user=data.user
        cookies().set("userId",data.user.id)
        return true
       }
      }else{
        
      return true
    }
    },
    
    async jwt(params) {
      console.log(params,"params jwt ath")
      if(params.account?.provider==="google") {// provider is google
        const id=cookies().get("userId")
        console.log(params?.user,"user jwt")
        params.token.id=id.value||null
        params.token.accessToken=params.account?.access_token
        params.token.role="user"
      }
      else{
        if (params.user?.id) {
          params.token.id = params.user.id;
          params.token.name = params.user.email;
          params.token.role = params.user.role;
  
        }
    console.log(params?.user,"params user")
      if(params.user?.accessToken){
        params.token.accessToken=params.user.accessToken
      }
    }
      cookies().set("token",params.token.accessToken)
      return params.token;
    },
    async session({session,token}) {
    if (session.user) {
        session.user.id =token.id;
        session.user.name = token.name;
        session.role = token.role;
      }
      if(token?.accessToken){
        session.accessToken=token.accessToken
      } 
      console.log(session,"my session")
      return session;
    },
  },
});
export { handler as GET, handler as POST };
