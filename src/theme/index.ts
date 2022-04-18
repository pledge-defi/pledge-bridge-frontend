import type { BreakpointChecks } from '@/hooks/useMatchBreakpoints';
import type { Breakpoints, Colors, DevicesQueries, MediaQueries } from './types';

export type PledgeTheme = {
  breakpoints?: Breakpoints;
  mediaQueries?: MediaQueries;
  devicesQueries?: DevicesQueries;
  breakpointChecks: BreakpointChecks;
} & Colors;

export * from './types';
