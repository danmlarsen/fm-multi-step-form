import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import { AnimatePresence, motion } from "motion/react";

import { useMultiStepForm } from "../context/FormContext";
import AddonForm from "./forms/AddonForm";
import MultiStepFormConfirmed from "./MultiStepFormConfirmed";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import FormSteps from "./MultiStepFormSteps";
import MultiStepFormSummary from "./MultiStepFormSummary";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import PlanSelectForm from "./forms/PlanSelectForm";
import Card from "./ui/Card";

const animationContainerVariant = {
  active: {
    opacity: 1,
    x: 0,
  },
  inactive: {
    opacity: 0,
    x: -20,
  },
  exit: {
    opacity: 0,
  },
};

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "This field is required")
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Invalid full name"),
  email: z.string().min(1, "This field is required").email("Invalid email"),
  phone: z
    .string()
    .min(1, "This field is required")
    .refine(validator.isMobilePhone, "Invalid phone number"),
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
      {/* Mobile / tablet view */}
      <div className="relative grid min-h-screen grid-rows-[1fr_auto] pt-8 md:hidden">
        <div
          className={`absolute top-0 right-0 left-0 h-[10.75rem] bg-[url(/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-no-repeat`}
        />
        <div className="relative space-y-[2.125rem]">
          <div className="flex justify-center">
            <FormSteps />
          </div>
          <div className="flex justify-center px-4">
            <Card className="w-full max-w-[28.125rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  variants={animationContainerVariant}
                  initial="inactive"
                  animate="active"
                  exit="exit"
                  key={`${currentStep}_${formConfirmed}`}
                >
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
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
        {!formConfirmed && (
          <div className="bg-white p-4">
            <MultiStepFormNavigation lastStep={3} onClickNext={onClickNext} />
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden min-h-screen place-items-center px-6 md:grid">
        <Card className="grid min-h-[37.5rem] max-w-[58.75rem] grid-cols-[auto_1fr] p-4 pr-0">
          <div className="w-[17.125rem] rounded-[0.625rem] bg-[url(/assets/images/bg-sidebar-desktop.svg)] bg-cover bg-no-repeat px-8 py-10">
            <FormSteps />
          </div>
          <div className="grid grid-rows-[1fr_auto] justify-items-center p-6 pt-10 pb-4">
            <div className="w-full max-w-[28.125rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  variants={animationContainerVariant}
                  initial="inactive"
                  animate="active"
                  exit="exit"
                  key={`${currentStep}_${formConfirmed}`}
                >
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
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full max-w-[28.125rem]">
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
