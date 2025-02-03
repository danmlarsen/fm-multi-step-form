import FormSteps from "./MultiStepFormSteps";

export default function MultiStepFormSidebarMobile() {
  return (
    <div
      className={`flex h-[172px] justify-center bg-[url(/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-no-repeat pt-8`}
    >
      <FormSteps />
    </div>
  );
}
