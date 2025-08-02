'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { passwordMatchSchema } from "@/src/lib/validation/passwordMatchSchema";
import { registerUser } from "@/src/lib/actions/registerAction";

const formSchema = z.object({
  email: z.string().email(),
}).and(passwordMatchSchema);


export default function SignIn() {

  
  const handleSubmit = async (data: z.infer<typeof formSchema>) =>{
    const response = await registerUser({
      email: data.email,
      password : data.password,
      passwordConfirm: data.passwordConfirm
    });

    console.log(response);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: ""
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            会員登録フォーム
          </CardTitle>
          <CardDescription>
            会員登録はこちら
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2">
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
              <FormField control={form.control} name="passwordConfirm" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    パスワード確認
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="passwordConfirm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <Button type="submit">登録</Button>
            </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  )
}

// 'use client';
// import { getProviders, signIn } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// export default function SignIn() {
//   const [providers, setProviders] = useState<any>(null);
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     getProviders().then(setProviders);
//   }, []);

//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <h1 className="text-xl font-bold mb-4">ログイン</h1>
//       {providers &&
//         Object.values(providers).map((provider: any) => (
//           <div key={provider.name} className="mb-4">
//             {provider.id === 'email' ? (
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   signIn('email', { email });
//                 }}
//               >
//                 <input
//                   type="email"
//                   placeholder="メールアドレスを入力"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="border px-3 py-2 rounded w-full mb-2"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//                 >
//                   Magic Link を送信
//                 </button>
//               </form>
//             ) : (
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded w-full"
//                 onClick={() => signIn(provider.id)}
//               >
//                 {provider.name}でログイン
//               </button>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// }