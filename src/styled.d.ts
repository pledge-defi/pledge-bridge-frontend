import 'styled-components';
import type { PledgeTheme } from './theme';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PledgeTheme {}
}
