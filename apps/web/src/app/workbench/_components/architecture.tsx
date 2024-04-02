import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              {/* Button component doesn't work inside */}
              Add Components
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Describe your architecture in detail.</DialogTitle>
                <DialogDescription className="tracking-wide">
                  This prompt will be used and processed to identify individual
                  services used. The sorting and identification process is done
                  automatically so give as much details as possible.
                </DialogDescription>

                <div className="flex flex-col gap-5 py-3">
                  <div className="grid w-full gap-3">
                    <Textarea
                      id="message"
                      placeholder="Enter your architecture details here."
                    />
                    <p className="text-sm text-muted-foreground">
                      eg. This is an example
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
