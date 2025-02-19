import { twMerge } from "tailwind-merge";

export default function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col justify-center rounded-[0.625rem] bg-white px-6 py-8 shadow-[0_25px_40px_-20px_rgba(0,0,0,0.095)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge("flex flex-col gap-2 md:gap-3.5", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={twMerge(
        "text-marine-blue text-2xl leading-[1] font-bold md:text-[32px]",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"small">) {
  return (
    <small
      className={twMerge("text-grey-cool text-base", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={twMerge("pt-[1.375rem] md:pt-9", className)} {...props} />
  );
}
