import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import db from "./src/db/drizzle";
import {users} from "./src/db/usersSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials){
                if (!credentials) {
                    throw new Error("認証情報が送信されていません");
                  }
                const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string));
                
                if(!user){
                    throw new Error("メールアドレスまたはパスワードが間違っています")
                }else{
                    const passWordCorrect = await compare(credentials.password as string, user.password as string);
                    if(!passWordCorrect){
                        throw new Error("メールアドレスまたはパスワードが間違っています");
                    }
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                }
            }
    }),
    ],
});

