import Button from "./ui/Button";

export default function MultiStepFormNavigation() {
  return (
    <div className="flex justify-between p-4">
      <Button variant="ghost">Go Back</Button>
      <Button>Next Step</Button>
    </div>
  );
}
