import { Suspense } from "react";
import { CourseDetail } from "@/components/learning";
import { Loading } from "@/components/ui";
import { courses } from "@/lib/data";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: courses.find((c) => c.slug === slug)?.title || "Course not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!courses.some((c) => c.slug === slug)) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <CourseDetail slug={slug} />
    </Suspense>
  );
}
