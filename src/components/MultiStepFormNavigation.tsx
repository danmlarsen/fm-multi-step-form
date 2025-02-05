import { useMultiStepForm } from "../context/FormContext";
import Button from "./ui/Button";

type TProps = {
  lastStep: number;
};

export default function MultiStepFormNavigation({ lastStep }: TProps) {
  const { currentStep, handleNextStep, handlePrevStep } = useMultiStepForm();

  return (
    <div className="flex justify-between p-4">
      <div>
        {currentStep > 0 && (
          <Button variant="ghost" onClick={handlePrevStep}>
            Go Back
          </Button>
        )}
      </div>

      <div>
        {currentStep !== lastStep && (
          <Button onClick={handleNextStep}>Next Step</Button>
        )}
      </div>
    </div>
  );
}
