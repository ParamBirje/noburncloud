import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
  return (
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
  );
}
