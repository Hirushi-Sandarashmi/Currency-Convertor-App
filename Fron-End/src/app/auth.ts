import NextAuth, {
  CredentialsSignin,
  User as NextAuthUser,
  Session as NextAuthSession,
} from "next-auth";
import credentials from "next-auth/providers/credentials";

interface User extends NextAuthUser {
  id: string;
  token: string;
}

export interface Session extends NextAuthSession {
  id: string;
  token: string;
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        let user: User | null = null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const raw = JSON.stringify({ email, password });
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
        };
        const apiurl = process.env.API_URL || "http://127.0.0.1:3001/api/";
        const response = await fetch(apiurl + "auth/login", requestOptions);
        if (response.ok) {
          const res = await response.json();
          user = {
            id: res.userId,
            name: email || "",
            email: email || "",
            token: res.access_token,
          };
          return user;
        } else {
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as User).id;
        token.token = (user as User).token;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        id: token.id as string,
        token: token.token as string,
      };
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },
});
