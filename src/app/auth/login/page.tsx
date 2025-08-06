'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { passwordSchema } from "@/src/lib/validation/passwordShcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithCredentials } from "@/src/lib/actions/loginAction"; // 修正したサーバーアクションをインポート
import { useSession, signIn } from "next-auth/react"; // クライアントサイドのsignInをインポート
import { useRouter } from "next/navigation"; // useRouterをインポート

const formSchema = z.object({
    email: z.string().email(),
    password: passwordSchema
})

export default function Login() {
    const { update } = useSession(); // useSessionからupdate関数を取得
    const router = useRouter(); // useRouterフックを初期化

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        form.clearErrors(); // フォームのエラーをクリア

        // サーバーアクションを呼び出し、認証情報を検証
        const validationResult = await loginWithCredentials({
            email: data.email,
            password: data.password,
        });
        
        if (validationResult.success) {
            // 認証情報が有効な場合、クライアントサイドのsignInを呼び出す
            console.log("認証情報が有効です。NextAuthの認証フローを開始します。");
            const authResult = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false // 自動リダイレクトを無効にする
            });

            if (authResult?.error) {
                // NextAuthのsignIn自体がエラーを返した場合
                console.error("NextAuth signInエラー:", authResult.error);
                form.setError("root", {
                    message: authResult.error === "CredentialsSignin" ? "メールアドレスまたはパスワードが間違っています。" : "ログイン中にエラーが発生しました。",
                });
            } else {
                // NextAuthのsignInが成功した場合
                console.log("NextAuth認証フロー成功！セッションを更新してリダイレクトします。");
                await update(); // useSessionのセッション情報を強制的に更新
                router.push('/'); // トップページにリダイレクト
            }
        } else {
            // 認証情報が無効な場合（サーバーアクションからのエラー）
            console.error("認証情報検証失敗:", validationResult.message);
            form.setError("root", {
                message: validationResult.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                    ログインフォーム
                    </CardTitle>
                    <CardDescription>
                    ログインはこちらから
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} >
                            <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-2">
                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="email"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="password" render={({field}) => (
                                <FormItem>
                                <FormLabel>
                                    パスワード
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="password"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            {/* フォーム全体のエラーメッセージ表示 */}
                            {form.formState.errors.root && (
                                <p className="text-red-500 text-sm text-center mt-2">
                                    {form.formState.errors.root.message}
                                </p>
                            )}
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "ログイン中..." : "ログイン"}
                            </Button>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


// 'use client'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
// import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "../../components/ui/form";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import { passwordSchema } from "@/src/lib/validation/passwordShcema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginWithCredentials } from "@/src/lib/actions/loginAction";
// import { useSession } from "next-auth/react";

// const formSchema = z.object({
//     email: z.string().email(),
//     password: passwordSchema
// })

// export default function Login() {

//     const {update} = useSession();

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//         }
//     });

//     const handleSubmit = async (data: z.infer<typeof formSchema>) => {
//         const result = await loginWithCredentials({
//             email: data.email,
//             password: data.password,
//         });
        
//         if(result.success) {
//             console.log("ログイン成功！セッション情報を更新します");
//             await update();
//         }

//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="w-[350px]">
//                 <CardHeader>
//                     <CardTitle>
//                     ログインフォーム
//                     </CardTitle>
//                     <CardDescription>
//                     ログインはこちらから
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(handleSubmit)} >
//                             <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-2">
//                             <FormField control={form.control} name="email" render={({field}) => (
//                                 <FormItem>
//                                 <FormLabel>
//                                     Email
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} type="email"/>
//                                 </FormControl>
//                                 <FormMessage />
//                                 </FormItem>
//                             )}
//                             />
//                             <FormField control={form.control} name="password" render={({field}) => (
//                                 <FormItem>
//                                 <FormLabel>
//                                     パスワード
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} type="password"/>
//                                 </FormControl>
//                                 <FormMessage />
//                                 </FormItem>
//                             )}
//                             />
//                             <Button type="submit">ログイン</Button>
//                             </fieldset>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }