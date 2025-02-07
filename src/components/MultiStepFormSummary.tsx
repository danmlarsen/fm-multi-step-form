import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { addons } from "../data/addons.json";
import { plans } from "../data/plans.json";
import { useMultiStepForm } from "../context/FormContext";

function formatPrice(
  data: { yearly: number; monthly: number },
  isYearly: boolean,
) {
  return `$${data[isYearly ? "yearly" : "monthly"]}/${isYearly ? "yr" : "mo"}`;
}

export default function MultiStepFormSummary() {
  const {
    formData: { selectedPlan, selectedAddons, isYearly },
  } = useMultiStepForm();

  const selectedPlanData = plans[selectedPlan];

  const planPriceTotal = plans[selectedPlan][isYearly ? "yearly" : "monthly"];
  const addonsPriceTotal = addons
    .filter((_, idx) => selectedAddons.includes(idx))
    .reduce((acc, val) => acc + val[isYearly ? "yearly" : "monthly"], 0);

  const priceTotal = planPriceTotal + addonsPriceTotal;

  return (
    <>
      <CardHeader>
        <CardTitle>Finishing up</CardTitle>
        <CardDescription>
          Double-check everything looks OK before confirming.
        </CardDescription>
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
            <div className="border-grey-cool/20 mt-3 border-t pt-3">
              {selectedAddons.map((addon) => (
                <SummaryAddonItem
                  key={addons[addon].addonTitle}
                  addonIndex={addon}
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
      </CardHeader>
    </>
  );
}

function SummaryAddonItem({
  addonIndex,
  isYearly,
}: {
  addonIndex: number;
  isYearly: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-grey-cool">{addons[addonIndex].addonTitle}</div>
      <div>+{formatPrice(addons[addonIndex], isYearly)}</div>
    </div>
  );
}
