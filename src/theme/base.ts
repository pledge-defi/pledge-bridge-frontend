import type { Breakpoints, MediaQueries } from './types';

export const breakpointMap: Record<string, number> = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`,
);

const mediaQueries: MediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
  nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
};

export const devicesQueries = {
  mobile: `@media screen and (max-width: ${breakpointMap.sm}px)`,
  tablet: `@media screen and (min-width: ${breakpointMap.sm}px) and (max-width: ${breakpointMap.xl}px)`,
  desktop: `@media screen and (min-width: ${breakpointMap.xl}px)`,
};

export default {
  breakpoints,
  mediaQueries,
  devicesQueries,
};
