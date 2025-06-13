import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin', // ログインしてない人をここに飛ばす
  },
})

export const config = {
  matcher: ['/mypage', '/like', '/post'], // 保護したいURLパス
}
