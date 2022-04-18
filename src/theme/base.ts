import type { Breakpoints, MediaQueries, Colors } from './types';
import { css } from 'styled-components';
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

const white = '#FFFFFF';
const black = '#000000';

export const colors: Colors = {
  // base
  white,
  black,

  // text
  text1: '#000000',
  text2: '#565A69',
  text3: '#6E727D',
  text4: '#C3C5CB',
  text5: '#EDEEF2',

  // backgrounds / greys
  bg0: '#FFF',
  bg1: '#F7F8FA',
  bg2: '#EDEEF2',
  bg3: '#CED0D9',
  bg4: '#888D9B',
  bg5: '#888D9B',
  bg6: '#6C7284',

  //specialty colors
  modalBG: 'rgba(0,0,0,0.3)',
  advancedBG: 'rgba(255,255,255,0.6)',

  //primary colors
  primary1: '#E8006F',
  primary2: '#FF8CC3',
  primary3: '#FF99C9',
  primary4: '#F6DDE8',
  primary5: '#FDEAF1',

  // color text
  primaryText1: '#D50066',

  // secondary colors
  secondary1: '#E8006F',
  secondary2: '#F6DDE8',
  secondary3: '#FDEAF1',

  // other
  red1: '#DA2D2B',
  red2: '#DF1F38',
  red3: '#D60000',
  green1: '#007D35',
  yellow1: '#E3A507',
  yellow2: '#FF8F00',
  yellow3: '#F3B71E',
  blue1: '#0068FC',
  blue2: '#0068FC',
  error: '#DF1F38',
  success: '#007D35',
  warning: '#FF8F00',

  // dont wanna forget these blue yet
  blue4: '#C4D9F8',
  // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

  // css snippets
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `,
};

export default {
  breakpoints,
  mediaQueries,
  devicesQueries,
  colors,
};
