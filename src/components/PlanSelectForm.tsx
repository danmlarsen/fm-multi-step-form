import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";

import { plans } from "../data/plans.json";
import { useMultiStepForm } from "@/context/FormContext";
import { Switch } from "./ui/switch";
import { twMerge } from "tailwind-merge";
import { formatPrice } from "@/lib/utils";

export default function PlanSelectForm() {
  return (
    <div className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle>Select your plan</CardTitle>
        <CardDescription>
          You have the option of monthly or yearly billing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PlanSelect />
        <IsYearlyToggle />
      </CardContent>
    </div>
  );
}

function PlanSelect() {
  const {
    formData: { selectedPlan },
    handleUpdatePlan,
  } = useMultiStepForm();

  return (
    <div className="grid min-h-[160px] gap-3 md:grid-cols-3 md:gap-[18px]">
      {plans.map((plan) => (
        <PlanOption
          key={plan.planTitle}
          className={`${selectedPlan === plan.planTitle ? "bg-alabaster border-purplish-blue" : ""}`}
          onClick={() => handleUpdatePlan(plan.planTitle)}
          plan={plan}
        />
      ))}
    </div>
  );
}

function PlanOption({
  plan,
  className,
  ...props
}: React.ComponentProps<"button"> & { plan: (typeof plans)[0] }) {
  const {
    formData: { isYearly },
  } = useMultiStepForm();

  return (
    <button
      className={twMerge(
        "border-grey-light hover:border-purplish-blue flex cursor-pointer items-start gap-3.5 rounded-md border px-4 py-3 transition duration-300 md:flex-col md:justify-between",
        className,
      )}
      {...props}
    >
      <img className="mt-[3px]" src={plan.planIcon} alt={plan.planTitle} />
      <span className="flex flex-col items-start">
        <span>{plan.planTitle}</span>
        <span>{formatPrice(plan, isYearly)}</span>
        {isYearly && <span>2 months free</span>}
      </span>
    </button>
  );
}

function IsYearlyToggle() {
  const {
    formData: { isYearly },
    handleToggleIsYearly,
  } = useMultiStepForm();

  return (
    <div className="bg-alabaster flex justify-center gap-6 rounded-lg py-3 text-sm font-bold">
      <span
        className={twMerge(
          "text-marine-blue transition duration-300",
          isYearly && "text-grey-cool",
        )}
      >
        Monthly
      </span>
      <Switch checked={isYearly} onCheckedChange={handleToggleIsYearly} />
      <span
        className={twMerge(
          "text-grey-cool transition duration-300",
          isYearly && "text-marine-blue",
        )}
      >
        Yearly
      </span>
    </div>
  );
}
