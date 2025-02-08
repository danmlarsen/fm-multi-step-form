import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  data: { yearly: number; monthly: number },
  isYearly: boolean,
) {
  return `$${data[isYearly ? "yearly" : "monthly"]}/${isYearly ? "yr" : "mo"}`;
}
