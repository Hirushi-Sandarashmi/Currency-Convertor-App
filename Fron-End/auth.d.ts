import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    token: string;
  }

  interface Account {
    id: string;
    token: string;
  }

  interface Session {
    user: User & DefaultSession;
    id: string;
    token: string;
  }

  interface Profile {
    id: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token: string;
  }
}
