import { twMerge } from "tailwind-merge";

type TButtonVariants = "default" | "secondary" | "ghost" | "link";

type TProps = React.ComponentProps<"button"> & {
  variant?: TButtonVariants;
};

export default function Button({
  className,
  variant = "default",
  ...props
}: TProps) {
  const variantClasses = {
    default: "bg-marine-blue  hover:bg-marine-blue/75",
    secondary: "bg-purplish-blue  hover:bg-purplish-blue/75",
    ghost: "text-grey-cool hover:text-marine-blue",
    link: "px-0 py-0 underline text-grey-cool hover:text-purplish-blue",
  };

  return (
    <button
      className={twMerge(
        "flex h-10 cursor-pointer items-center justify-center rounded-sm px-4 text-sm font-medium text-white transition duration-300 md:h-12 md:rounded-md md:px-6 md:text-base",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
