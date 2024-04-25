import RestartButton from "./_components/restart-button";
import GameStats from "./_components/stats";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-start gap-5 mx-auto min-h-screen w-1/3">
      <h1 className="text-4xl font-light">
        Game Over<span className="text-accent">!</span>
      </h1>

      <p className="w-full text-muted-foreground">
        Due to no updates, constant app crashes, service interruptions and data
        corruptions; users stopped using and abandoned the app.
      </p>

      <RestartButton />

      <GameStats />
    </main>
  );
}
