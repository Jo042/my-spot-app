
import Link from "next/link"

export default function HeroSection(){
    return(
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 px-4 text-center rounded-md shadow mb-6">
      <h1 className="text-2xl font-bold text-gray-800">お出かけスポットを探そう</h1>
      <p className="text-gray-600 mt-2">エリア・ジャンル・タイプから今すぐ見つかる</p>
      <Link href="/auth/register" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-sm shadow hover:bg-blue-700">
      会員登録はこちら！
      </Link>
    </div>
    )
}