import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";
import { Switch } from "../ui/switch";

import { formatPrice } from "@/lib/utils";
import { useMultiStepForm } from "@/context/FormContext";
import { plans } from "../../data/plans.json";

export default function PlanSelectForm() {
  return (
    <>
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
    </>
  );
}

function PlanSelect() {
  const {
    formData: { selectedPlan },
    handleUpdatePlan,
  } = useMultiStepForm();

  return (
    <div className="grid min-h-[10rem] gap-3 md:grid-cols-3 md:gap-[1.125rem]">
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
      <motion.span className="flex flex-col items-start" layout>
        <motion.span className="font-medium" layout>
          {plan.planTitle}
        </motion.span>
        <motion.span className="text-grey-cool text-sm" layout>
          {formatPrice(plan, isYearly)}
        </motion.span>
        <AnimatePresence>
          {isYearly && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs leading-5"
              layout
            >
              2 months free
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
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
