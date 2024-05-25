import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import {compare, compareSync, genSaltSync, hashSync} from "bcryptjs";
const handler= 
  NextAuth({
 session:{
  jwt:true
 },
 credentials:{

  username: { label: "Username", type: "text", placeholder: "jsmith" },
  password: { label: "Password", type: "password" }
 },
  providers: [
    CredentialsProvider({
      
      async authorize(credentials) {
       const res=await fetch('http://localhost:5000/admin/sign-in',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:credentials.email,
                password:hashSync(credentials.password)
            }),
            mode:"cors"
        })
      const data=await res.json()
        if (data.status!==200||!data.admin) {
          throw new Error("not authorized");
        }
        console.log(data.admin)
      const isPasswordMatch=compare(data.admin.password,credentials.password)
      if(!isPasswordMatch){
        throw new Error("not authorized");
      }
        return {
          email:data.admin.email,
          password:data.admin.password,
          id:data.admin.id
        }; 
      
      },
    }),
  ],
  callbacks: {
    jwt(params) {
        if (params.user.id) {
            params.token.id = params.user.id;
            params.token.name = params.user.email;
        }

        return params.token;
    },
    session({ session, token }) {
        if (session.user) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.role="admin"
        }

        return session;
    }
}
});
export  {handler as GET,handler as POST}