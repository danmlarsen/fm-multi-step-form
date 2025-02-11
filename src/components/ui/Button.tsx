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
        "cursor-pointer rounded-sm px-4 py-3 text-sm text-white transition duration-300",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
