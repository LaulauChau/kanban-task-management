import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function excludeFields<
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, fields: K[]): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fields.includes(key as K)),
  ) as Omit<T, K>;
}
