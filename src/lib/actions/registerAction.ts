"use server"

import z from "zod"
import { passwordMatchSchema } from "../validation/passwordMatchSchema";
import {hash} from "bcryptjs";
import db from "@/src/lib/db/drizzle";
import { users } from "@/src/lib/db/usersSchema";

export const registerUser = async ({
    email,
    password,
    passwordConfirm,
}: {
    email: string;
    password: string;
    passwordConfirm: string;
}) => {

    try{

        const newUserSchema = z.object({
            email: z.string().email()
        }).and(passwordMatchSchema)

        const newUserValidation = newUserSchema.safeParse({
            email,
            password,
            passwordConfirm
        })

        if(!newUserValidation.success){
            return {
                error: true,
                message: newUserValidation.error.issues[0]?.message ?? "エラーが発生しました"
                
            }
        }

        const hashedPassword = await hash(password, 10);

        await db.insert(users).values({
            email,
            password: hashedPassword,
        })
    } catch (e: unknown) {
        // Postgres の一意制約違反（UNIQUE violation）は SQLSTATE 23505
        if (e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "23505") {
            return {
                error: true,
                message: "そのメールアドレスはすでに使われています"
            }
        }

        return {
            error: true,
            message: "エラーが発生しました"
        }
    }
};
