import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to delete ProfitArea Calculation{" "}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Ok</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
