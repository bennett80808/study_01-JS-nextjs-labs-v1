// SWR은 React에서 **데이터 fetching(가져오기)**을
// 더 똑똑하고 효율적으로 해주는 React 훅 기반 라이브러리
// Stale-While-Revalidate
// 빠르게 보여주고, 뒤에서 최신 데이터로 갱신하는 방식

// SWR = Stale-While-Revalidate
// Stale: 오래된 데이터를 먼저 보여주고
// While Revalidate: 그동안 백그라운드에서 최신 데이터를 다시 가져옴
// 👉 그래서 UX가 빠름 + 항상 최신 상태를 유지할 수 있어.

// 상황 예시.
// 1.사용자가 페이지에 처음 들어감

// 2.SWR은 API에서 데이터를 가져옴 (fetch)

// 3.그 데이터를 브라우저 메모리 캐시에 저장

// 4.그다음엔:
// 캐시된 오래된(stale) 데이터를 즉시 보여줌
// 백그라운드에서 다시 API 호출해서 최신 데이터로 갱신
// 새로운 데이터가 도착하면 자동으로 컴포넌트 다시 렌더링

"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostList() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
    {
      refreshInterval: 5000, // 5초마다 자동갱신신
    }
  );
  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>에러발생생...</p>;

  return (
    <ul>
      {data.slice(0, 5).map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
