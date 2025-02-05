import { twMerge } from "tailwind-merge";

type TButtonVariants = "default" | "secondary" | "ghost";

type TProps = React.ComponentProps<"button"> & {
  variant?: TButtonVariants;
};

export default function Button({
  className,
  variant = "default",
  ...props
}: TProps) {
  const variantClasses = {
    default: "bg-marine-blue text-white",
    secondary: "bg-purplish-blue",
    ghost: "text-grey-cool",
  };

  return (
    <button
      className={twMerge(
        "rounded-sm px-4 py-3 text-sm",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
