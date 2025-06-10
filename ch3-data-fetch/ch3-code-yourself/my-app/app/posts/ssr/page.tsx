// SSR Server Side Rendering
// 서버에서 렌더링 (요청 시)
// 종류가 나뉘는게 fetch를 어떻게 하냐에 따라 달라짐.

//요청 시마다 서버에서 HTML을 즉시 생성하여 항상 최신의 데이터를 제공하는 방식
// 요청 시마다 서버에서 최신의 데이터를
// 포함한 HTML을 생성하여 응답
type Post = { id: string; title: string; body: string };

export default async function PostsSSRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // 매 요청마다 서버에 fetch 해라.
  });
  if (!res.ok) throw new Error("에러 발생");
  const posts: Post[] = await res.json();

  return (
    <>
      <h2>SSR 패칭</h2>
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
