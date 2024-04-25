import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Info } from "lucide-react";
import { SectionHeading, SectionParagraph } from "./text-styles";

export default function HelpSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2" variant="secondary">
          <Info size={20} />
          <p>Help</p>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-3xl">The Guide</SheetTitle>
          <SheetDescription className="border-b pb-5">
            Find all the help you need to get started and how to use the tools
            to your advantage.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[90%] w-full">
          <div className="flex flex-col gap-8 my-5">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold uppercase tracking-wider text-sm">
                Getting Started
              </h2>
              <SectionParagraph>
                Now that you have your app description ready in{" "}
                <Badge variant="secondary">Requirements</Badge>, you can start
                building your app's architecture in{" "}
                <Badge variant="secondary">Architecture</Badge>. By progressing
                through, you will be able to implement best practices by making
                your app{" "}
                <span className=" italic font-bold">
                  scalable, resilient, highly available and secure.
                </span>
              </SectionParagraph>
            </div>

            <div className="flex flex-col gap-2">
              <SectionHeading>Stats</SectionHeading>
              <SectionParagraph>
                The <Badge variant="outline">Cost</Badge> tracker signifies the
                monthly billing costs of the services you are using. This is
                still in beta and may not be accurate but would give you a rough
                estimate.
              </SectionParagraph>
              <SectionParagraph>
                <b className="text-yellow-300">Tip:</b> Keep your costs minimal
                by choosing services carefully and specifying the right usage
                levels when adding them to your architecture.
              </SectionParagraph>
              <SectionParagraph>
                The <Badge variant="outline">Users</Badge> tracker signifies the
                total monthly users of your app.
              </SectionParagraph>
              <SectionParagraph>
                The <Badge variant="outline">Satisfaction</Badge> tracker is
                basically your simulation&apos;s heartbeat. It signifies the
                satisfaction level of your app's user base. This tells you how
                happy your users are with your app. Keep them happy with updates
                and a well-rounded architecture.
              </SectionParagraph>
            </div>

            <div className="flex flex-col gap-2">
              <SectionHeading>Architecture</SectionHeading>
              <SectionParagraph>
                If you have some ideas about what services you want to use for
                which part of the app, you can start adding them using the{" "}
                <Badge>Add Components</Badge> button.
              </SectionParagraph>
              <SectionParagraph>
                If you don't know and haven't planned yet, in the{" "}
                <Badge variant="secondary">Deployment</Badge> section, you can
                use the <Badge variant="outline">Support</Badge> chat to get
                help from the cloud hosting support team about what services to
                use.
              </SectionParagraph>
              <SectionParagraph>
                Upon a thorough check, you may receive suggestions to make some
                improvements in your architecture. It is entirely up to you to
                act on them or not.{" "}
                <b>
                  This won&apos;t affect your{" "}
                  <Badge variant="secondary">Stats</Badge>
                </b>
              </SectionParagraph>
            </div>

            <div className="flex flex-col gap-2">
              <SectionHeading>Deployment</SectionHeading>
              <SectionParagraph>
                In the <Badge variant="outline">Status</Badge> sub-section, you
                get to see the deployment status, current active users (from the
                total monthly users) and various usage levels of the services
                you are using.
              </SectionParagraph>
              <SectionParagraph>
                The <Badge variant="outline">Support</Badge> chat will help you
                in any query you have about any cloud services. A note to
                remember, the cloud hosting support team does not have access to
                your architecture. They can only help you with general queries
                about cloud services and how they can be used for different use
                cases.
              </SectionParagraph>
            </div>

            <div className="flex flex-col gap-2">
              <SectionHeading>Iterations</SectionHeading>
              <SectionParagraph>
                Here you will basically get enhancements for your app that are
                mostly requested by its user base. You can either{" "}
                <Badge>Integrate</Badge> them or dismiss them. Do note that
                dismissing them may have a negative impact on your app's
                satisfaction level.
              </SectionParagraph>
              <SectionParagraph>
                When integrating an enhancement, you will update your current
                architecture config and define how you would like to implement
                the enhancement. You can add a new cloud service or use an
                existing one. The changes will be then checked for eligibility
                and if everything is fine, the enhancement will be integrated.
                If not, you can try again. You can also take the help from{" "}
                <Badge variant="outline">Support</Badge> chat on how to
                integrate the enhancement.
              </SectionParagraph>
              <SectionParagraph>
                Integrating an enhancement will have a{" "}
                <b>
                  positive impact on your app's user base and their satisfaction
                  level.
                </b>
              </SectionParagraph>
            </div>

            <div className="flex flex-col gap-2">
              <SectionHeading>Notifications Area</SectionHeading>
              <SectionParagraph>
                Like the real world, the simulation will emulate cloud failures
                from the vulnerabilities in your architecture. You will receive
                notifications about these failures in detail when you click on{" "}
                <Badge variant="secondary">
                  <Bell size={13} />
                </Badge>{" "}
                in the right sidebar of the Workbench. They are quite rare but
                may cause deadly consequences when happen.
              </SectionParagraph>
              <SectionParagraph>
                This failures will have a negative impact on your app's
                satisfaction level. You can setup preventive measures toward
                these by updating your architecture config in the{" "}
                <Badge variant="secondary">Architecture</Badge> section.
              </SectionParagraph>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
