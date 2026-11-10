import { Suspense } from "react";
import { Goals } from "@/components/goals";
import { Loading } from "@/components/ui";
export const metadata = { title: "My goals" };
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Goals />
    </Suspense>
  );
}
