import { useMultiStepForm } from "../context/FormContext";
import Button from "./ui/Button";

type TProps = {
  lastStep: number;
};

export default function MultiStepFormNavigation({
  lastStep,
  onClickNext,
}: TProps & { onClickNext: () => void }) {
  const { currentStep, handlePrevStep, handleConfirmForm } = useMultiStepForm();

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
          <Button onClick={onClickNext}>Next Step</Button>
        )}
        {currentStep === lastStep && (
          <Button variant="secondary" onClick={handleConfirmForm}>
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
}
