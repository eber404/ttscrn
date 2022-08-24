import { breakpoints } from "./breakpoints";

export const getRootFontSize = (width: number): number => {
  if (width < breakpoints.xs) return 16;
  if (width < breakpoints.sm) return 20;
  if (width < breakpoints.md) return 24;
  if (width < breakpoints.lg) return 28;

  return 32;
};
