import styled from 'styled-components';

export type SvgProps = { fill?: string };

const Svg = styled.svg<SvgProps>`
  fill: ${({ fill }) => (fill ? fill : 'none')};
`;

export default Svg;
