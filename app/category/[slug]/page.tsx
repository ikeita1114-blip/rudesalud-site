export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Slug is:</h1>
      <h2>{params.slug}</h2>
    </div>
  );
}