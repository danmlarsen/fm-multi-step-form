import { twMerge } from "tailwind-merge";
import { useMultiStepForm } from "../context/FormContext";

const formStepsData = [
  {
    stepDescription: "Your info",
  },
  {
    stepDescription: "Select plan",
  },
  {
    stepDescription: "Add-ons",
  },
  {
    stepDescription: "Summary",
  },
];

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
      {formStepsData.map((step, idx) => (
        <FormStep
          stepNum={idx + 1}
          stepDescription={step.stepDescription}
          isActive={currentStep === idx}
        />
      ))}
    </div>
  );
}

export function FormStep({
  stepNum,
  stepDescription,
  isActive,
}: React.ComponentProps<"div"> & {
  stepNum: number;
  stepDescription: string;
  isActive?: boolean;
}) {
  return (
    <div className="md:flex md:items-center md:gap-4">
      <div
        className={twMerge(
          "bg-blue grid size-[2.0625rem] place-items-center rounded-full border border-white font-bold transition duration-300",
          isActive && "bg-pastel-blue text-marine-blue border-pastel-blue",
        )}
      >
        {stepNum}
      </div>
      <div className="hidden text-left uppercase md:block">
        <div className="text-light-blue text-xs">Step {stepNum}</div>
        <div className="text-sm font-bold">{stepDescription}</div>
      </div>
    </div>
  );
}
