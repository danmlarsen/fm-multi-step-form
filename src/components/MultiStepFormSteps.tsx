export default function FormSteps() {
  return (
    <ul className="flex gap-4 text-white">
      <FormStep stepNum={1} isActive={true}>
        Your info
      </FormStep>
      <FormStep stepNum={2} isActive={false}>
        Select plan
      </FormStep>
      <FormStep stepNum={3} isActive={false}>
        Add-ons
      </FormStep>
      <FormStep stepNum={4} isActive={false}>
        Summary
      </FormStep>
    </ul>
  );
}

export function FormStep({
  children,
  stepNum,
  isActive,
}: {
  children?: string;
  stepNum: number;
  isActive?: boolean;
}) {
  return (
    <li>
      <div
        className={`grid size-[33px] place-items-center rounded-full font-bold ${isActive ? "bg-light-blue text-marine-blue" : "bg-blue border border-white"}`}
      >
        {stepNum}
      </div>
      <div className="hidden md:block">
        <div></div>
        <div>{children}</div>
      </div>
    </li>
  );
}
