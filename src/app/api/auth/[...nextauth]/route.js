import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebase'

const handler = NextAuth({
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        return await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch(error => console.log(error))
      }
    })
  ]
});

export { handler as GET, handler as POST };
