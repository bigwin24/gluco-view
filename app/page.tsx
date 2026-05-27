import { Button } from "@/components/ui/button";
import { CommonError } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const patientId = crypto.randomUUID();

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/patients/${patientId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!result.ok) {
    const error = (await result.json()) as CommonError;
    throw new Error(`[${error.error}] ${error.message}`);
  }

  const json = await result.json();
  // console.log("result: ", json);

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
