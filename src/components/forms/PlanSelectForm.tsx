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

const planSelectVariant = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function PlanSelect() {
  return (
    <motion.div
      variants={planSelectVariant}
      initial="hide"
      animate="show"
      className="grid min-h-[10rem] gap-3 md:grid-cols-3 md:gap-[1.125rem]"
      layout
    >
      {plans.map((plan) => (
        <PlanOption key={plan.planTitle} plan={plan} />
      ))}
    </motion.div>
  );
}

const planOptionVariant = {
  show: { opacity: 1, x: 0 },
  hide: { opacity: 0, x: -20 },
};

function PlanOption({
  plan,
  className,
}: {
  plan: (typeof plans)[0];
  className?: string;
}) {
  const {
    formData: { isYearly, selectedPlan },
    handleUpdatePlan,
  } = useMultiStepForm();

  return (
    <motion.button
      variants={planOptionVariant}
      className={twMerge(
        "border-grey-light hover:border-purplish-blue flex cursor-pointer items-start gap-3.5 rounded-md border px-4 py-3 transition-colors duration-300 md:flex-col md:justify-between",
        selectedPlan === plan.planTitle && "bg-alabaster border-purplish-blue",
        className,
      )}
      onClick={() => handleUpdatePlan(plan.planTitle)}
    >
      <img className="mt-[3px]" src={plan.planIcon} alt={plan.planTitle} />
      <motion.span className="flex flex-col items-start" layout>
        <motion.span className="font-medium" layout>
          {plan.planTitle}
        </motion.span>
        <motion.span className="text-grey-cool text-sm" layout>
          {formatPrice(plan, isYearly)}
        </motion.span>
        <AnimatePresence mode="popLayout">
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
    </motion.button>
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
