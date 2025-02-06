import { useMultiStepForm } from "../context/FormContext";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import FormSteps from "./MultiStepFormSteps";
import MultiStepFormSummary from "./MultiStepFormSummary";
import Card from "./ui/Card";

export default function MultiStepForm() {
  const formSteps = [
    <PersonalInfo />,
    <PlanSelect />,
    <MultiStepFormSummary />,
  ];

  const { currentStep } = useMultiStepForm();

  return (
    <>
      <div className="relative grid min-h-screen grid-rows-[1fr_auto] pt-8 md:hidden">
        <div
          className={`absolute top-0 right-0 left-0 h-[172px] bg-[url(/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-no-repeat`}
        />
        <div className="relative space-y-[34px]">
          <div className="flex justify-center">
            <FormSteps />
          </div>
          <div className="px-4">
            <Card>{formSteps[currentStep]}</Card>
          </div>
        </div>
        <div className="bg-white">
          <MultiStepFormNavigation lastStep={3} />
        </div>
      </div>

      <div className="hidden min-h-screen place-items-center md:grid">
        Desktop
      </div>
    </>
  );
}

function PersonalInfo() {
  return <div>Personal info</div>;
}
function PlanSelect() {
  return <div>Plan select</div>;
}
