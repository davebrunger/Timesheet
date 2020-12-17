import { parseISO } from "date-fns";

export function parseDate(dateStr : string | undefined) : Date | undefined
{
  if (!dateStr) {
    return undefined;
  }
  return parseISO(`${dateStr}T00:00:00Z`);
}

export type DatesAsStrings<T> = {
  [K in keyof T]: T[K] extends Date 
      ? string 
      : (T[K] extends Date | undefined 
          ? string | undefined 
          : (T[K] extends object 
            ? DatesAsStrings<T[K]> 
            : (T[K] extends object | undefined
              ? DatesAsStrings<T[K]> | undefined
              : T[K])))
};