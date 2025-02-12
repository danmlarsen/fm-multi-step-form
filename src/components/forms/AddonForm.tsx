import { Checkbox } from "../ui/checkbox";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import { addons } from "@/data/addons.json";

import { formatPrice } from "@/lib/utils";
import { useMultiStepForm } from "@/context/FormContext";
import { twMerge } from "tailwind-merge";

export default function AddonForm() {
  return (
    <>
      <CardHeader>
        <CardTitle>Pick add-ons</CardTitle>
        <CardDescription>
          Add-ons help enhance your gaming experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddonList />
      </CardContent>
    </>
  );
}

function AddonList() {
  return (
    <ul className="space-y-3">
      {addons.map((addon) => (
        <AddonItem key={addon.id} addon={addon} />
      ))}
    </ul>
  );
}

function AddonItem({ addon }: { addon: (typeof addons)[0] }) {
  const {
    formData: { selectedAddons, isYearly },
    handleToggleAddon,
  } = useMultiStepForm();

  return (
    <li
      className={twMerge(
        "border-grey-light hover:border-purplish-blue grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border px-4 py-3 transition duration-300",
        selectedAddons.includes(addon.id) &&
          "bg-alabaster border-purplish-blue",
      )}
      onClick={() => handleToggleAddon(addon.id)}
    >
      <Checkbox
        className="size-5 cursor-pointer"
        checked={selectedAddons.includes(addon.id)}
      />
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold">{addon.addonTitle}</h3>
        <p className="text-grey-cool text-xs">{addon.desc}</p>
      </div>
      <div className="text-purplish-blue text-xs">
        +{formatPrice(addon, isYearly)}
      </div>
    </li>
  );
}
