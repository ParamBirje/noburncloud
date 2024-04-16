import { useAtom } from "jotai";
import { iterationAtom } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSocketRef from "@/components/useSocket";

export default function IterationDeleteDialog({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const [_iterations, setIterations] = useAtom(iterationAtom);
  const socketRef = useSocketRef();

  function deleteIteration(): void {
    setIterations((prev) => prev.filter((_, i) => i !== index));
    socketRef.current?.emit("dismiss-iteration");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Do you want to delete this product enhancement?
          </DialogTitle>
          <DialogDescription className="tracking-wide">
            Note that deleting this product enhancement will affect your
            potential user growth and satisfaction.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                deleteIteration();
              }}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
