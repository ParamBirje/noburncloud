import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DialogForm from "./form";

export default function Architecture() {
  return (
    <section id="architecture" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">
        Architecture
      </h3>

      <Card>
        <CardContent className="py-4">
          <p className=" text-muted-foreground text-sm">
            Add cloud services as components here!
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <DialogForm />
        </CardFooter>
      </Card>
    </section>
  );
}
