import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMultiStepForm } from "../context/FormContext";
import AddonForm from "./AddonForm";
import MultiStepFormConfirmed from "./MultiStepFormConfirmed";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import FormSteps from "./MultiStepFormSteps";
import MultiStepFormSummary from "./MultiStepFormSummary";
import PersonalInfoForm from "./PersonalInfoForm";
import PlanSelectForm from "./PlanSelectForm";
import Card from "./ui/Card";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "This field is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "This field is required"),
});

export default function MultiStepForm() {
  const {
    currentStep,
    formConfirmed,
    formData,
    handleNextStep,
    handleUpdatePersonalInfo,
  } = useMultiStepForm();

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    },
  });

  async function onClickNext() {
    if (currentStep === 0) {
      const isValid = await personalInfoForm.trigger();

      if (isValid) {
        const data = personalInfoForm.getValues();
        handleUpdatePersonalInfo(data);
        handleNextStep();
      }
    } else {
      handleNextStep();
    }
  }

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
              {!formConfirmed && (
                <>
                  {currentStep === 0 && (
                    <PersonalInfoForm form={personalInfoForm} />
                  )}
                  {currentStep === 1 && <PlanSelectForm />}
                  {currentStep === 2 && <AddonForm />}
                  {currentStep === 3 && <MultiStepFormSummary />}
                </>
              )}
              {formConfirmed && <MultiStepFormConfirmed />}
            </Card>
          </div>
        </div>
        {!formConfirmed && (
          <div className="bg-white p-4">
            <MultiStepFormNavigation lastStep={3} onClickNext={onClickNext} />
          </div>
        )}
      </div>

      <div className="hidden min-h-screen place-items-center px-6 md:grid">
        <Card className="grid min-h-[600px] max-w-[940px] grid-cols-[auto_1fr] p-4">
          <div className="w-[274px] rounded-[10px] bg-[url(/assets/images/bg-sidebar-desktop.svg)] bg-cover bg-no-repeat px-8 py-10">
            <FormSteps />
          </div>
          <div className="grid grid-rows-[1fr_auto] justify-items-center p-6 pt-10 pb-8">
            {!formConfirmed && (
              <>
                {currentStep === 0 && (
                  <PersonalInfoForm form={personalInfoForm} />
                )}
                {currentStep === 1 && <PlanSelectForm />}
                {currentStep === 2 && <AddonForm />}
                {currentStep === 3 && <MultiStepFormSummary />}
              </>
            )}
            {formConfirmed && <MultiStepFormConfirmed />}
            <div className="w-full max-w-[450px]">
              {!formConfirmed && (
                <MultiStepFormNavigation
                  lastStep={3}
                  onClickNext={onClickNext}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
