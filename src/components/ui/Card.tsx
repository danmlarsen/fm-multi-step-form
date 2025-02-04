import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge("rounded-[10px] bg-white px-6 py-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
