import { Card, CardContent } from "@/components/ui/card";
import Chat from "./chat";
import Fidgets from "./fidgets";

export default function ChatSupport() {
  return (
    <section id="deployment" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Deployment</h3>

      <div className="flex justify-between gap-5">
        <Card className="w-full">
          <CardContent className="py-4 flex flex-col gap-5">
            <Fidgets />
          </CardContent>
        </Card>

        <Chat />
      </div>
    </section>
  );
}
