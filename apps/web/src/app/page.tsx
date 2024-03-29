import { log } from "@repo/logger";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "TheLaunchpad - Startup Simulator",
};

export default function Store(): JSX.Element {
  log("Hey! This is the home page.");

  return (
    <main className="min-h-screen w-3/4 mx-auto flex justify-center items-center">
      <div className="text-center flex flex-col items-center gap-8">
        <div>
          <h2 className="uppercase text-accent font-bold tracking-wide">
            powered by Gemini
          </h2>
          <h1 className="scroll-m-20 text-4xl font-light tracking-tight lg:text-5xl">
            Implement cloud architectures <br />
            in the real world
          </h1>
        </div>

        <p className="text-muted-foreground tracking-wide w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque maxime
          voluptate recusandae doloribus quis laudantium consectetur velit
          quisquam corporis culpa.
        </p>

        <Link href="/onboard" className="w-fit">
          <Button>Architect</Button>
        </Link>
      </div>
    </main>
  );
}
