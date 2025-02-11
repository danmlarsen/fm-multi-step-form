import { twMerge } from "tailwind-merge";
import { useMultiStepForm } from "../context/FormContext";

export default function FormSteps({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { currentStep } = useMultiStepForm();

  return (
    <div
      className={twMerge("flex gap-4 text-white md:flex-col", className)}
      {...props}
    >
      <FormStep stepNum={1} isActive={currentStep === 0}>
        Your info
      </FormStep>
      <FormStep stepNum={2} isActive={currentStep === 1}>
        Select plan
      </FormStep>
      <FormStep stepNum={3} isActive={currentStep === 2}>
        Add-ons
      </FormStep>
      <FormStep stepNum={4} isActive={currentStep === 3}>
        Summary
      </FormStep>
    </div>
  );
}

export function FormStep({
  children,
  stepNum,
  isActive,
}: React.ComponentProps<"button"> & {
  stepNum: number;
  isActive?: boolean;
}) {
  return (
    <div className="md:flex md:items-center md:gap-4">
      <div
        className={twMerge(
          "bg-blue grid size-[33px] place-items-center rounded-full border border-white font-bold transition duration-300",
          isActive && "bg-pastel-blue text-marine-blue border-pastel-blue",
        )}
      >
        {stepNum}
      </div>
      <div className="hidden text-left uppercase md:block">
        <div className="text-light-blue text-xs">Step {stepNum}</div>
        <div className="text-sm font-bold">{children}</div>
      </div>
    </div>
  );
}
