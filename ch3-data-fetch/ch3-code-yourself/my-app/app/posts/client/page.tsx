// CSR 방식 Client Side Rendering
// 리액트 씀

// 브라우저에서 렌더링하는 방식으로 서버에서는
// 최소한의 HTML 전달하고 JS로 UI를 동적으로 구성
// 클라이언트(브라우저)에서 렌더링

//CSR 컴포넌트 접근 시
// (1)요청 :데이터만 별도로 요청함
// (2)응답 : JSON파일을 응답 받음

// data fetching -> rendering
"use client"; // 이걸 써야 CSR 방식으로 렌더링함.

import { useState, useEffect } from "react";

type Post = { id: string; title: string; body: string };

export default function PostClientPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 에러");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>로딩 중...</h1>;
  if (error) return <h1>오류 : {error}</h1>;

  return (
    <>
      <h2>클라이언트 패칭</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
