import { ResourceDetail } from "@/components/learning";
import { resources } from "@/lib/data";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return resources.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      resources.find((r) => r.slug === slug)?.title || "Resource not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!resources.some((r) => r.slug === slug)) notFound();
  return <ResourceDetail slug={slug} />;
}
