import z from "zod";
export const passwordSchema = z.string().min(5, "5文字以上のパスワードを設定してください");