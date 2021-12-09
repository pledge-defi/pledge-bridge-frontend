import Header from '@/components/Header';
import React from 'react';
import styled from 'styled-components';

const BasicLayoutDiv = styled.div``;

type Props = {
  children: React.ReactNode;
};

const BasicLayout = ({ children }: Props) => {
  return (
    <BasicLayoutDiv>
      <Header />
      {children}
    </BasicLayoutDiv>
  );
};

export default BasicLayout;
