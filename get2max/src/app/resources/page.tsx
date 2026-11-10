import { Suspense } from "react";
import { Library } from "@/components/library";
import { Loading } from "@/components/ui";
export const metadata = { title: "Learning library" };
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Library />
    </Suspense>
  );
}
