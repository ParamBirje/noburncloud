import { log } from "@repo/logger";
import { CounterButton, Link } from "@repo/ui";

export const metadata = {
  title: "TheLaunchpad - Startup Simulator",
};

export default function Store(): JSX.Element {
  log("Hey! This is the home page.");

  return (
    <main>
      <h2 className="uppercase">powered by Gemini</h2>
      <h1>The startup simulator.</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque maxime
        voluptate recusandae doloribus quis laudantium consectetur velit
        quisquam corporis culpa.
      </p>

      <CounterButton />
    </main>
  );
}
