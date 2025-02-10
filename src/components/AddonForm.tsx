import { formatPrice } from "@/lib/utils";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { addons } from "@/data/addons.json";
import { useMultiStepForm } from "@/context/FormContext";
import { Checkbox } from "./ui/checkbox";

export default function AddonForm() {
  return (
    <div className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle>Pick add-ons</CardTitle>
        <CardDescription>
          Add-ons help enhance your gaming experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddonList />
      </CardContent>
    </div>
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
      className={`grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border px-4 py-3 ${selectedAddons.includes(addon.id) ? "bg-alabaster border-purplish-blue" : "border-grey-light"}`}
      onClick={() => handleToggleAddon(addon.id)}
    >
      <Checkbox
        className="size-5"
        checked={selectedAddons.includes(addon.id)}
      />
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold">{addon.addonTitle}</h3>
        <p className="text-xs">{addon.desc}</p>
      </div>
      <div className="text-purplish-blue text-xs">
        +{formatPrice(addon, isYearly)}
      </div>
    </li>
  );
}
