import Link from "next/link";

export default function PostsRootPage() {
  return (
    <div className="max-w-xl p-8">
      <ul className="space-y-4">
        <li>
          <Link href="/posts/client" className="font-semibold">
            클라이언트 패칭 방식 (Client Fetch)
          </Link>
        </li>
        <li>
          <Link href="/posts/ssg" className="font-semibold">
            SSG 방식 (Static Site Generation)
          </Link>
        </li>
        <li>
          <Link href="/posts/ssr" className="font-semibold">
            SSR 방식 (Server Side Rendering)
          </Link>
        </li>
        <li>
          <Link href="/posts/ssg/isr" className="font-semibold">
            SSG(ISR) 방식
          </Link>
        </li>
        <li>
          <Link href={`/posts/1`} className="font-semibold">
            동적 라우팅 & 클라이언트/서버 컴포넌트 혼합 패턴
          </Link>
        </li>
        <li>
          <Link href="/posts/swr" className="font-semibold">
            데이터 패칭 라이브러리 (SWR)
          </Link>
        </li>
      </ul>
    </div>
  );
}
