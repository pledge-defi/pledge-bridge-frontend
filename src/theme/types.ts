import type { FlattenSimpleInterpolation } from 'styled-components';

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  nav: string;
};

export type DevicesQueries = {
  mobile: string;
  tablet: string;
  desktop: string;
};

export type Color = string;

export type Colors = {
  // darkMode: boolean;

  // base
  white: Color;
  black: Color;

  // text
  text1: Color;
  text2: Color;
  text3: Color;
  text4: Color;
  text5: Color;

  // backgrounds / greys
  bg0: Color;
  bg1: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bg5: Color;
  bg6: Color;

  modalBG: Color;
  advancedBG: Color;

  //blues
  primary1: Color;
  primary2: Color;
  primary3: Color;
  primary4: Color;
  primary5: Color;

  primaryText1: Color;

  // pinks
  secondary1: Color;
  secondary2: Color;
  secondary3: Color;

  // other
  red1: Color;
  red2: Color;
  red3: Color;
  green1: Color;
  yellow1: Color;
  yellow2: Color;
  yellow3: Color;
  blue1: Color;
  blue2: Color;

  blue4: Color;

  error: Color;
  success: Color;
  warning: Color;
  flexColumnNoWrap: FlattenSimpleInterpolation;
  flexRowNoWrap: FlattenSimpleInterpolation;
};
