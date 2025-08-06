
import Link from "next/link"

export default function HeroSection(){
    return(
      <>
      {/* <div className="bg-gradient-to-r from-pink-50 to-blue-50 py-10 px-6 text-center rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[color:var(--color-primary)]">今日はどこ行く？</h1>
        <p className="text-gray-600 mt-2">ぷらスポであなたにぴったりのスポットを見つけよう</p>
        <Link href="/auth/register" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-full text-sm shadow hover:bg-primary_hovered">
        会員登録はこちら！
        </Link>
      </div> */}
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-10 px-6 text-center rounded-xl shadow-md">
  <h1 className="text-2xl font-bold text-[color:var(--color-primary)]">週末はぷらっとおでかけ</h1>
  <p className="text-gray-600 mt-2">カフェも、自然も、あなたに合う場所が見つかる</p>
  <Link href="/auth/register" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-full text-sm shadow hover:bg-primary_hovered">
        会員登録はこちら！
        </Link>
    </div>
    {/* <div className="bg-gradient-to-r from-sky-100 to-blue-100 py-10 px-6 text-center rounded-xl shadow-md">
  <h1 className="text-2xl font-bold text-[color:var(--color-primary)]">
    気軽におでかけ、ぷらっとスポット探し
  </h1>
  <p className="text-[color:var(--color-muted)] mt-2">
    デートも、友達との予定も、ぴったりの場所が見つかる
  </p>
  <Link href="/auth/register" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-full text-sm shadow hover:bg-primary_hovered">
        会員登録はこちら！
        </Link>
    </div> */}
    </>
    )
}