// app/error.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-lg font-medium">문제가 발생했습니다</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={() => unstable_retry()}>다시 시도</Button>
    </div>
  );
}
