type Params = { params: { id: string } };
export default function PostDetail({ params }: Params) {
  return (
    <div>
      <h2>게시글 상세 페이지</h2>
      <p>이 게시글의 id : {params.id}</p>
    </div>
  );
}
