'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { passwordSchema } from "@/src/lib/validation/passwordShcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithCredentials } from "@/src/lib/actions/loginAction";


const formSchema = z.object({
    email: z.string().email(),
    password: passwordSchema
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        await loginWithCredentials({
            email: data.email,
            password: data.password,
        });
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
                            <Button type="submit">ログイン</Button>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}