
// 'use server'

// import { signIn } from "next-auth/react"
// import z, { string } from "zod"
// import { passwordSchema } from "../validation/passwordShcema"

// export const loginWithCredentials = async ({
//     email,
//     password,
// }:{
//     email: string;
//     password: string;
// }) => {
//     const loginSchema = z.object({
//         email: z.string().email(),
//         password: passwordSchema
//     })

//     const loginValidation = loginSchema.safeParse({
//         email,
//         password
//     });

//     if(!loginValidation.success){
//         return {
//             error: true,
//             message: loginValidation.error?.issues[0]?.message ?? "エラーが発生しました"
//         };
//     }

//     try{
//         await signIn("credentials", {
//             email,
//             password,
//             redirect: false
//         });

//         //以下追記
//         return { success: true };
//     }catch(e){
//         //以下追記
//         console.log("ログイン中にエラーが発生しました:", e);
//         if( e.type === "CredentialsSignin") {
//             return { success: false, message: "メールアドレスまたはパスワードが間違っています"};
//         }

//         return { success: false, message: "ログイン中に予期せぬエラーが発生しました"};
//     }
// }




// src/lib/actions/loginAction.ts
'use server' // このファイルはサーバーアクションとして動作します

// NextAuthのsignInはここでは使用しません。クライアントサイドのLogin.tsxで使用します。
// import { signIn } from "next-auth/react"; // この行は削除またはコメントアウトしてください

import z from "zod";
import { passwordSchema } from "../validation/passwordShcema"; // パスが正しいか確認してください
import { compare } from "bcryptjs"; // パスワード比較のためにインポート
import { eq } from "drizzle-orm"; // Drizzle ORMのためにインポート
import db from "@/src/db/drizzle"; // データベースインスタンスのパスが正しいか確認してください
import { users } from "@/src/db/usersSchema"; // ユーザーDrizzleスキーマのパスが正しいか確認してください


export const loginWithCredentials = async ({
    email,
    password,
}:{
    email: string;
    password: string;
}) => {
    // 入力値のスキーマ定義
    const loginSchema = z.object({
        email: z.string().email("有効なメールアドレスを入力してください。"),
        password: passwordSchema
    });

    // 入力値のバリデーション
    const loginValidation = loginSchema.safeParse({
        email,
        password
    });

    if(!loginValidation.success){
        // Zodバリデーションエラーの場合、エラーメッセージを返す
        return {
            success: false,
            message: loginValidation.error?.issues[0]?.message ?? "入力値が不正です"
        };
    }

    try{
        // データベースからユーザーを検索
        const [user] = await db.select().from(users).where(eq(users.email, email));
        
        if (!user) {
            return { success: false, message: "メールアドレスまたはパスワードが間違っています。" };
        }

        // パスワードの比較
        const passWordCorrect = await compare(password, user.password as string);
        if (!passWordCorrect) {
            return { success: false, message: "メールアドレスまたはパスワードが間違っています。" };
        }

        // 認証情報が有効であることをクライアントに伝える
        // ここではまだログイン処理は完了していません（セッションは確立されていない）
        return { success: true, message: "認証情報が有効です。" };

    }catch(e){
        console.error("認証情報検証中にエラーが発生しました:", e);
        return { success: false, message: "認証情報検証中に予期せぬエラーが発生しました。もう一度お試しください。" };
    }
};


