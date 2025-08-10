// src/auth.ts
// NextAuthのサーバーサイド設定と認証オプション

import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./src/lib/db/drizzle"; // dbのパスがプロジェクト構造に合っているか確認してください
import { users } from "./src/lib/db/usersSchema"; // usersSchemaのパスがプロジェクト構造に合っているか確認してください

// authOptionsオブジェクトを定義し、エクスポートします。
// これをroute.tsでインポートして使用します。
export const authOptions = {
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
    // 必要に応じてcallbacksなどをここに追加できます
    // callbacks: { ... },
    // pages: { ... },
};

// NextAuthを一度だけ呼び出し、handlers, auth, signIn, signOutを全て取得します。
// handlersはAPIルートの処理に必要です。
const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

// 取得したhandlers, auth, signIn, signOutを個別にエクスポートします。
// これにより、他のファイルからこれらをインポートして利用できるようになります。
export { handlers, auth, signIn, signOut };
// import { compare } from "bcryptjs";
// import { eq } from "drizzle-orm";
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials";
// import db from "./src/db/drizzle";
// import {users} from "./src/db/usersSchema";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Credentials({
//             credentials: {
//                 email: {},
//                 password: {},
//             },
//             async authorize(credentials){
//                 if (!credentials) {
//                     throw new Error("認証情報が送信されていません");
//                   }
//                 const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string));
                
//                 if(!user){
//                     throw new Error("メールアドレスまたはパスワードが間違っています")
//                 }else{
//                     const passWordCorrect = await compare(credentials.password as string, user.password as string);
//                     if(!passWordCorrect){
//                         throw new Error("メールアドレスまたはパスワードが間違っています");
//                     }
//                 }

//                 return {
//                     id: user.id.toString(),
//                     email: user.email,
//                 }
//             }
//     }),
//     ],
// });

