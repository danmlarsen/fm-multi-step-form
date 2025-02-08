import { useMultiStepForm } from "../context/FormContext";
import AddonForm from "./AddonForm";
import MultiStepFormConfirmed from "./MultiStepFormConfirmed";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import FormSteps from "./MultiStepFormSteps";
import MultiStepFormSummary from "./MultiStepFormSummary";
import PersonalInfoForm from "./PersonalInfoForm";
import PlanSelectForm from "./PlanSelectForm";
import Card from "./ui/Card";

export default function MultiStepForm() {
  const formSteps = [
    <PersonalInfoForm />,
    <PlanSelectForm />,
    <AddonForm />,
    <MultiStepFormSummary />,
  ];

  const { currentStep, formConfirmed } = useMultiStepForm();

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
            <Card>
              {!formConfirmed && formSteps[currentStep]}
              {formConfirmed && <MultiStepFormConfirmed />}
            </Card>
          </div>
        </div>
        {!formConfirmed && (
          <div className="bg-white p-4">
            <MultiStepFormNavigation lastStep={3} />
          </div>
        )}
      </div>

      <div className="hidden min-h-screen place-items-center px-6 md:grid">
        <Card className="grid min-h-[600px] max-w-[940px] grid-cols-[auto_1fr] p-4">
          <div className="w-[274px] rounded-[10px] bg-[url(/assets/images/bg-sidebar-desktop.svg)] bg-cover bg-no-repeat px-8 py-10">
            <FormSteps />
          </div>
          <div className="grid grid-rows-[1fr_auto] justify-items-center p-6 pt-10 pb-8">
            {!formConfirmed && formSteps[currentStep]}
            {formConfirmed && <MultiStepFormConfirmed />}
            <div className="w-full max-w-[450px]">
              {!formConfirmed && <MultiStepFormNavigation lastStep={3} />}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
