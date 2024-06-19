import { query as q } from "faunadb";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],

  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;
      //CRIAMOS UM USUARIO NO BANCO DE DADOS A PARTIR DO EMAIL
      try {
        //CRIAMOS UMA CONDIÇÃO PARA VERIFICAR SE O USUARIO EXISTE COM FAUNASQL
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );
        console.log("User processed in FaunaDB");
        return true;
      } catch (error) {
        console.error("Error inserting user into FaunaDB: ", error);
        return false;
      }
    },
  },
});
