// 클라이언트 컴포넌트 아님
// 서버 컴포넌트.

// 동적 라우팅에도 SSG를 적용할 수 있다.
import LikeButton from "./LikeButton";

type Post = { id: string; title: string; body: string };

type Props = {
  params: { id: string };
};
// Props는 하나의 객체이고,
// 그 객체는 params라는 키를 가지고 있으며,
// params는 { id: string } 형태의 객체다.

// posts/1~10
// fetching
export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 },
  });
  const posts: Post[] = await res.json();
  return posts.slice(0, 10).map((post) => ({
    id: post.id.toString(),
  }));
  //  반환값
  //   [
  //   { id: "1" },
  //   { id: "2" },
  //   { id: "3" },
  // ... ,
  //   { id: "10" }
  // ]
}

// 10개 SSG 방식의 HTML을 만들겠다
export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();

  return (
    <>
      <div>
        <h2>게시글 상세 (ID : {params.id})</h2>
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
        <LikeButton initialLikes={0} />
      </div>
    </>
  );
}
// generateStaticParams라는 정확한 함수명을 써야만 Next.js App Router에서 자동으로 params를 생성해준다.
// 🚫 다른 이름 쓰면 작동하지 않는다.

// 아주 좋은 질문이야!
// Next.js의 App Router에서 `generateStaticParams()`와 `DetailPage()`(= page 컴포넌트)는 **자동으로 연결**돼. 이 연결은 **파일/폴더 구조와 네이밍 규칙**에 따라 이루어져. 직접적으로 코드를 연결하는 게 아니라 **Next.js가 내부적으로 자동 매핑**하는 구조야.

// ---

// ## 🔗 전체 흐름 요약 (App Router 기준)

// ```
// app/
//  └── posts/
//      └── [id]/
//          ├── page.tsx           ← ★ 이 파일이 DetailPage
//          └── generateStaticParams() ← 이 함수도 page.tsx 안에 있거나 모듈화해서 불림
// ```

// ---

// ## ✅ 어떻게 연결되는지 순서대로 설명

// ### 1. `posts/[id]/page.tsx`

// 이 위치는 Next.js에게 **동적 라우팅**임을 알려줌.
// 예: `/posts/1`, `/posts/2` 같은 URL에 대응하는 페이지.

// ### 2. `generateStaticParams()` 함수

// * 이 함수는 Next.js 빌드 타임에 자동 호출됨.
// * 반환값: `"params"` 객체의 목록

//   ```ts
//   return [{ id: "1" }, { id: "2" }, ..., { id: "10" }];
//   ```
// * 이 값들을 바탕으로, **`[id]`에 대응되는 HTML 파일들**을 미리 생성함 (SSG).

// ### 3. `DetailPage({ params })`

// * Next.js는 `generateStaticParams()`로 받은 각 `id` 값을 기반으로 정적 HTML을 만들고,
// * 각 `id`에 대해 이 `DetailPage()`를 호출함.

// 즉, `params`는 다음처럼 자동 주입됨:

// ```tsx
// DetailPage({ params: { id: "1" } });
// DetailPage({ params: { id: "2" } });
// ...
// ```

// ### 4. 결과

// Next.js는 `/posts/1`, `/posts/2`, ... `/posts/10`에 대한 **정적인 HTML 파일**을 생성해서 서버 없이도 빠르게 응답 가능.

// ---

// ## 📌 그림으로 보면

// ```txt
// app/posts/[id]/page.tsx
// │
// ├── generateStaticParams() → [{id: "1"}, ..., {id: "10"}]
// │
// ├── 각 id로 DetailPage({ params: { id: "1" } }) 렌더링
// │
// └── => 결과적으로 10개의 정적 HTML 페이지 생성
// ```

// ---

// ## ✅ 정리

// | 항목                        | 설명                                                         |
// | ------------------------- | ---------------------------------------------------------- |
// | `app/posts/[id]/page.tsx` | 동적 라우팅 페이지 컴포넌트                                            |
// | `generateStaticParams()`  | 어떤 `id`에 대해 미리 HTML을 생성할지 지정                               |
// | `params`                  | Next.js가 자동으로 `DetailPage`에 주입해줌                           |
// | 연결 방식                     | **Next.js의 폴더 및 파일명 규칙**으로 자동 연결됨 (프로그래머가 명시적으로 연결할 필요 없음) |

// ---

// 궁금하면 이걸 CSR, SSR, ISR과 비교해서 어떤 타이밍에 어떤 방식으로 데이터가 들어가는지도 설명해줄게!
// 필요하면 실제 `app/posts/[id]/page.tsx`에 클라이언트 컴포넌트 섞는 것도 보여줄 수 있어.
