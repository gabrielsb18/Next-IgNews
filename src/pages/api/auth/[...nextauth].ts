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

      try {
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        console.log("User created in FaunaDB");
        return true;

        // const userActiveSubscription = await fauna.query(
        //   q.Get(
        //     q.Intersection([
        //       q.Match(
        //         q.Index('subscription_by_user_ref'),
        //         q.Select(
        //           'ref',
        //           q.Get(
        //             q.Match(
        //               q.Index('user_by_email'),
        //               q.Casefold(user.email)
        //             )
        //           )
        //         )
        //       ),
        //       q.Match(q.Index('subscription_by_status'), 'active')
        //     ])
        //   )
        // )
      } catch (error) {
        console.error("Error inserting user into FaunaDB: ", error);
        return false;
      }
    },
  },
});
