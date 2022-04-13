import React from 'react';
import styled from 'styled-components/macro';

// import { ExternalLink } from '../../theme'

const InfoCard = styled.button<{ active?: boolean }>`
  padding: 1rem;
  outline: none;
  border: 1px solid;
  border-radius: 12px;
  width: 100% !important;
  &:focus {
  }
`;

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;

const OptionCardLeft = styled.div`
  justify-content: center;
  height: 100%;
`;

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
  margin-top: 0;
  border: 1px solid #ced0d9};
  &:hover {
    cursor: pointer;
    border: 1px solid red;
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

// const GreenCircle = styled.div`
//   justify-content: center;
//   align-items: center;

//   &:first-child {
//     height: 8px;
//     width: 8px;
//     margin-right: 8px;
//     border-radius: 50%;
//   }
// `

// const CircleWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

const HeaderText = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const SubHeader = styled.div`
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
`;
const IconWrapper = styled.div<{ size?: number | null }>`
  align-items: center;
  justify-content: center;
  & > img,
  span {
    width: ${({ size }) => (size ? size + 'px' : '24px')};
    height: ${({ size }) => (size ? size + 'px' : '24px')};
  }
`;

export default function Option({
  link = null,
  // clickable = true,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  size,
  id,
}: {
  link?: string | null;
  clickable?: boolean;
  onClick?: null | (() => void);
  color: string;
  header: React.ReactNode;
  subheader: React.ReactNode | null;
  icon: string;
  id: string;
  size?: number | null;
}) {
  const content = (
    <OptionCardClickable id={id} onClick={onClick}>
      <OptionCardLeft>
        <HeaderText color={color}>{header}</HeaderText>
        {subheader && <SubHeader>{subheader}</SubHeader>}
      </OptionCardLeft>
      <IconWrapper size={size}>
        <img src={icon} alt={'Icon'} />
      </IconWrapper>
    </OptionCardClickable>
  );
  if (link) {
    return <a href={link}>{content}</a>;
  }

  return content;
}
