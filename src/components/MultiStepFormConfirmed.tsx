import IconThankyou from "../assets/images/icon-thank-you.svg";

export default function MultiStepFormConfirmed() {
  return (
    <div className="flex min-h-[25rem] flex-col items-center justify-center gap-6 px-4 text-center">
      <img
        className="size-14 md:size-20"
        src={IconThankyou}
        alt="Checkmark icon"
      />
      <div className="space-y-2.5">
        <h2 className="text-marine-blue text-2xl font-bold md:text-3xl">
          Thank you!
        </h2>
        <p className="text-grey-cool">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>
    </div>
  );
}
