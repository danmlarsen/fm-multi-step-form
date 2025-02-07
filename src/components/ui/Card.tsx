import { twMerge } from "tailwind-merge";

export default function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "flex w-full justify-center rounded-[10px] bg-white px-6 py-8",
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
    <div className={twMerge("flex flex-col gap-2", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={twMerge("text-marine-blue text-2xl font-bold", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"small">) {
  return <small className={twMerge("text-grey-cool", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={twMerge("pt-[22px]", className)} {...props} />;
}
