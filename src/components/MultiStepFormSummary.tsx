import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { addons } from "../data/addons.json";
import { plans } from "../data/plans.json";
import { useMultiStepForm } from "../context/FormContext";
import { formatPrice } from "@/lib/utils";

export default function MultiStepFormSummary() {
  const {
    formData: { selectedPlan, selectedAddons, isYearly },
  } = useMultiStepForm();

  const selectedPlanData = plans.find(
    (plan) => plan.planTitle === selectedPlan,
  )!;

  const selectedAddonsData = addons.filter((addon) =>
    selectedAddons.includes(addon.id),
  );

  const planPriceTotal = selectedPlanData[isYearly ? "yearly" : "monthly"];
  const addonsPriceTotal = addons
    .filter((_, idx) => selectedAddons.includes(idx))
    .reduce((acc, val) => acc + val[isYearly ? "yearly" : "monthly"], 0);

  const priceTotal = planPriceTotal + addonsPriceTotal;

  return (
    <div className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle>Finishing up</CardTitle>
        <CardDescription>
          Double-check everything looks OK before confirming.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-magnolia rounded-lg px-6 py-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {selectedPlanData.planTitle} ({isYearly ? "Yearly" : "Monthly"})
            </div>
            <div className="font-bold">
              {formatPrice(selectedPlanData, isYearly)}
            </div>
          </div>
          <div className="border-grey-cool/20 mt-3 space-y-3 border-t pt-3 md:space-y-4">
            {selectedAddonsData.map((addon) => (
              <SummaryAddonItem
                key={addon.id}
                addon={addon}
                isYearly={isYearly}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="text-grey-cool text-sm">
            Total (per {isYearly ? "year" : "month"})
          </div>
          <div className="text-purplish-blue font-bold">
            ${priceTotal}/{isYearly ? "yr" : "mo"}
          </div>
        </div>
      </CardContent>
    </div>
  );
}

function SummaryAddonItem({
  addon,
  isYearly,
}: {
  addon: (typeof addons)[0];
  isYearly: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-grey-cool">{addon.addonTitle}</div>
      <div>+{formatPrice(addon, isYearly)}</div>
    </div>
  );
}
