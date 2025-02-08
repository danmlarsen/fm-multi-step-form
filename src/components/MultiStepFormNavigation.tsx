import { useMultiStepForm } from "../context/FormContext";
import Button from "./Button";

type TProps = {
  lastStep: number;
};

export default function MultiStepFormNavigation({ lastStep }: TProps) {
  const { currentStep, handleNextStep, handlePrevStep, handleConfirmForm } =
    useMultiStepForm();

  return (
    <div className="flex justify-between">
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
        {currentStep === lastStep && (
          <Button className="bg-purplish-blue" onClick={handleConfirmForm}>
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
}
