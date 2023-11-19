import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebase';


const handler = NextAuth({
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      async authorize(credentials) {
        return await signInWithEmailAndPassword(
          auth,
          credentials.email || '',
          credentials.password || ''
        )
          .then((userCredential) => {
            if (userCredential.user) {
              // console.log("userCredential", userCredential);
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error));
      },
    }),
  ],
  // callbacks: {
  //   session: async ({ session, token, user}) => {
  //     if (session?.user) {
  //       // console.log("session account", session.account);
  //       console.log("session user", user);
  //       session.user.id = user.uid; // token.uid or token.sub both work
  //     }
  //     return session;
  //   },
  //   jwt: async ({ user, token }) => {
  //     if (user) {
  //       console.log("jwt user", user);
  //       token.sub = user.uid; // token.uid or token.sub both work
  //     }
  //     return token;
  //   },
  // },
});

export { handler as GET, handler as POST };
