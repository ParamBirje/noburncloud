import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ArchitectureComponent({
  component,
}: ArchitectureComponentProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-xl">{component.name}</CardTitle>
        <CardDescription>{component.cloud}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[10px] tracking-wide text-muted-foreground font-bold uppercase">
          Description
        </p>
        <p className="text-sm text-muted-foreground">{component.description}</p>
      </CardContent>
    </Card>
  );
}

type ArchitectureComponentProps = {
  component: {
    name: string;
    cloud: string;
    description: string;
  };
};
