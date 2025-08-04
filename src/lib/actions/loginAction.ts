'use server'

import { signIn } from "next-auth/react"
import z, { string } from "zod"
import { passwordSchema } from "../validation/passwordShcema"

export const loginWithCredentials = async ({
    email,
    password,
}:{
    email: string;
    password: string;
}) => {
    const loginSchema = z.object({
        email: z.string().email(),
        password: passwordSchema
    })

    const loginValidation = loginSchema.safeParse({
        email,
        password
    });

    if(!loginValidation.success){
        return {
            error: true,
            message: loginValidation.error?.issues[0]?.message ?? "エラーが発生しました"
        };
    }

    try{
        await signIn("credentials", {
            email,
            password,
            redirect: false
        });
    }catch(e){

    }
}