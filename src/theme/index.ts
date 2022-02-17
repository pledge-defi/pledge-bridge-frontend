import type { BreakpointChecks } from '@/hooks/useMatchBreakpoints';
import type { Breakpoints, DevicesQueries, MediaQueries } from './types';

export interface PledgeTheme {
  breakpoints?: Breakpoints;
  mediaQueries?: MediaQueries;
  devicesQueries?: DevicesQueries;
  breakpointChecks: BreakpointChecks;
}

export * from './types';
