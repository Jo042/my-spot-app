'use client'
import { signOut } from "next-auth/react";
//singOut()はサーバーコンポーネントで使えない！からこっちで使う(さらにimport先も@authじゃなくて↑)import { logout } from "@/src/lib/actions/logoutAction";
export default function LogoutButton(){
    return (
        <button className ="text-sm px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200" 
                onClick = {async () =>{
                    await signOut();
                }}>
            ログアウト
        </button>
    )
}