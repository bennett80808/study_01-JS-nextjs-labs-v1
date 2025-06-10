export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>게시판 레이아웃 연습</h1>
      {children}
    </div>
  );
}
