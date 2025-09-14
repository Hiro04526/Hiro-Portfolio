export async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store",
  });
  const { data } = await res.json();
  return data as any[];
}