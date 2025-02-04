import MultiStepFormNavigation from "./MultiStepFormNavigation";
import FormSteps from "./MultiStepFormSteps";
import Card from "./ui/Card";

export default function MultiStepForm() {
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
            <Card className="h-[400px]">Current form</Card>
          </div>
        </div>
        <div className="bg-white">
          <MultiStepFormNavigation />
        </div>
      </div>

      <div className="hidden min-h-screen place-items-center md:grid">
        Desktop
      </div>
    </>
  );
}
