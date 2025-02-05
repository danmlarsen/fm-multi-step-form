import { useMultiStepForm } from "../context/FormContext";

export default function FormSteps() {
  const { currentStep, handleSetStep } = useMultiStepForm();

  return (
    <div className="flex gap-4 text-white">
      <FormStep
        stepNum={1}
        isActive={currentStep === 0}
        onClick={() => handleSetStep(0)}
      >
        Your info
      </FormStep>
      <FormStep
        stepNum={2}
        isActive={currentStep === 1}
        onClick={() => handleSetStep(1)}
      >
        Select plan
      </FormStep>
      <FormStep
        stepNum={3}
        isActive={currentStep === 2}
        onClick={() => handleSetStep(2)}
      >
        Add-ons
      </FormStep>
      <FormStep
        stepNum={4}
        isActive={currentStep === 3}
        onClick={() => handleSetStep(3)}
      >
        Summary
      </FormStep>
    </div>
  );
}

export function FormStep({
  children,
  stepNum,
  isActive,
  onClick,
}: React.ComponentProps<"button"> & {
  stepNum: number;
  isActive?: boolean;
}) {
  return (
    <button onClick={onClick}>
      <div
        className={`grid size-[33px] place-items-center rounded-full font-bold ${isActive ? "bg-light-blue text-marine-blue" : "bg-blue border border-white"}`}
      >
        {stepNum}
      </div>
      <div className="hidden md:block">
        <div></div>
        <div>{children}</div>
      </div>
    </button>
  );
}
