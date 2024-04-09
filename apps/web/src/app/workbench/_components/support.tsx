import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatSupport() {
  return (
    <section id="deployment" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Deployment</h3>

      <div className="flex justify-between gap-5">
        <Card className="w-full">
          <CardContent className="py-4">
            <p className=" text-muted-foreground text-xl font-light">
              Status <span className="text-accent">Healthy</span>
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <p className="text-sm text-muted-foreground">
              Chat with the cloud support team here
            </p>
          </CardHeader>
          <CardContent className="py-4">
            <p className=" text-muted-foreground">some chats here</p>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between items-center space-x-2">
              <Input type="email" placeholder="Type your message here" />
              <Button type="submit">Send</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
