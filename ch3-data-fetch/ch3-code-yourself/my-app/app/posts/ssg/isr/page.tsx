// SSG Static Site Generation (빌드 시점 렌더링) 갱신이 안됨.
// 빌드 시 HTML을 미리 생성해놓고 요청이 오면
// 해당 HTML 파일을 응답하는 방식

// ISR(Incremental Static Regeneration)
// 정적 HTML을 최신화하기 위해 ISR을 적용할 수 있음
// ISR을 통해 예를 들어 60초 주기로
// HTML을 재빌드할 수 있음

// SSG + ISR
type Post = { id: string; title: string; body: string };

export default async function PostsSSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 }, // 10초 주기로 새로운 HTML을 생성하겠다.
  });
  if (!res.ok) throw new Error("에러 발생");
  const posts: Post[] = await res.json();

  const now: string = new Date().toLocaleString();

  return (
    <>
      <h2>SSG 패칭 + ISR</h2>
      <h3>페이지 생성 시각: {now}</h3>
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
