import { Button } from "@/components/ui/button";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

export default function Store(): JSX.Element {
  return (
    <main className="min-h-screen w-5/6 md:w-2/4 mx-auto my-10 mt-20 md:mt-40">
      <div className="text-left flex flex-col gap-8">
        <div>
          <h2 className="uppercase text-accent font-bold tracking-wide mb-1">powered by Gemini</h2>
          <h1 className="scroll-m-20 text-4xl font-light tracking-tight lg:text-6xl">
            Don&apos;t mindlessly burn <br />
            your money in the cloud.
          </h1>
        </div>

        <p className="text-muted-foreground tracking-wide md:w-2/3">
          Simulate and test your cloud architectures before you spend a dime. Build better products
          with controlled costs and cloud deployments that withstand the test of time.
        </p>

        {/* For wider screen */}
        <Link
          href="/onboard"
          className="hidden group border border-white rounded-md p-4 bg-transparent text-white duration-150 md:flex items-center gap-3 hover:text-background hover:gap-10 hover:bg-white"
        >
          <p className="font-bold tracking-wide text-2xl uppercase">
            <span className="text-accent group-hover:text-background">//</span> Simulate
          </p>
          <ArrowRightIcon size={24} />
        </Link>

        {/* disable simulate button for mobile screens and show message */}
        <div className="md:hidden border border-white rounded-md p-4 bg-transparent text-white flex flex-col gap-3">
          <div className="flex items-center gap-3 text-accent">
            <InfoIcon size={16} />
            <p className="text-sm">Designed for PC</p>
          </div>
          <p className="font-semibold tracking-wide text-sm">
            Switch to a bigger screen to experience the full simulation environment.
          </p>
        </div>

        <iframe
          className=" aspect-video w-full mx-auto my-1"
          // width="560"
          // height="315"
          src="https://www.youtube.com/embed/R25E_0DlQmY"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <footer className="text-center opacity-80 mt-20 mb-10">
          Built with ♥️ by{" "}
          <a href="https://parameater.co" target="_blank" className="hover:underline">
            Param Birje
          </a>
        </footer>
      </div>
    </main>
  );
}
