import { twMerge } from "tailwind-merge";
import { useMultiStepForm } from "../context/FormContext";

export default function FormSteps({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { currentStep, handleSetStep } = useMultiStepForm();

  return (
    <div
      className={twMerge("flex gap-4 text-white md:flex-col", className)}
      {...props}
    >
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
    <button
      className="cursor-pointer md:flex md:items-center md:gap-4"
      onClick={onClick}
    >
      <div
        className={`grid size-[33px] place-items-center rounded-full font-bold ${isActive ? "bg-light-blue text-marine-blue" : "bg-blue border border-white"}`}
      >
        {stepNum}
      </div>
      <div className="hidden text-left uppercase md:block">
        <div className="text-light-blue text-xs">Step {stepNum}</div>
        <div className="text-sm">{children}</div>
      </div>
    </button>
  );
}
