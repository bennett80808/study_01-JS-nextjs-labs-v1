"use client";

import { useState, useEffect } from "react";

type Post = { id: number; title: string; body: string };

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  // 1. posts 데이터 패칭
  const fetchPosts = () => {
    fetch("/api/posts") // 자체 내 서버 가리키고 있다.
      .then((res) => res.json())
      .then(setPosts);
  };

  useEffect(fetchPosts, []);

  // 2. 새 게시글 추가 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    if (res.ok) {
      setTitle("");
      setBody("");
      fetchPosts(); // 새로고침
    } else {
      const data = await res.json();
      setError(data.error || "Unknown error");
    }
  };

  return (
    <main>
      <h1>게시글 목록</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="본문"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.body}
          </li>
        ))}
      </ul>
    </main>
  );
}
