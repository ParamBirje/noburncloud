import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "TheLaunchpad - Startup Simulator",
};

export default function Store(): JSX.Element {
  return (
    <main className="min-h-screen w-3/4 mx-auto flex justify-center items-center">
      <div className="text-center flex flex-col items-center gap-8">
        <div>
          <h2 className="uppercase text-accent font-bold tracking-wide mb-1">
            powered by Gemini
          </h2>
          <h1 className="scroll-m-20 text-4xl font-light tracking-tight lg:text-5xl">
            Don&apos;t mindlessly burn <br />
            your money in the cloud.
          </h1>
        </div>

        <p className="text-muted-foreground tracking-wide w-3/4">
          Simulate and test your cloud architectures before you spend a dime.
          Build better products with controlled costs and cloud deployments that
          withstand the test of time.
        </p>

        <Link href="/onboard" className="w-fit">
          <Button>Simulate</Button>
        </Link>
      </div>
    </main>
  );
}
