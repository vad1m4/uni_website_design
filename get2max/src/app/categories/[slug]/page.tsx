import { CategoryDetail } from "@/components/library";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      categories.find((c) => c.slug === slug)?.name || "Category not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!categories.some((c) => c.slug === slug)) notFound();
  return <CategoryDetail slug={slug} />;
}
